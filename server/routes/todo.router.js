const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


const taskSchema = new Schema({
    task: {type: String}, 
    completeStatus: {type: Boolean, default: false}
}); 

const todo = mongoose.model ( 'todo', taskSchema );

let taskList = [{
    task: 'task1',
    completeStatus: false
}];

router.post('/', (req, res) => {
    console.log('/todo POST');
    console.log(req.body);
    let taskFromClient = req.body;
    // Add to the database
    // validating we match the schema
    const taskToAdd = new todo(taskFromClient); 
    // Puts the data into the database
    taskToAdd.save().then(() => {
        console.log('task added', taskToAdd);
        res.sendStatus(201); // All OK
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500); // Send back an error to client
    });
    //carRepairs.push(repairFromClient);
    // delivary confirmation
});

module.exports = router;