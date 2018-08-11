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
    const taskToAdd = new todo(taskFromClient); 
    taskToAdd.save().then(() => {
        console.log('task added', taskToAdd);
        res.sendStatus(201); 
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500); 
    });
    
});

router.get('/', (req, res) => {
    console.log('/todo GET hit');
    todo.find({}).then( (tasksFromDB) => {
        res.send(tasksFromDB);
    }).catch( (error) => {
        res.sendStatus(500);  
    });
}) 


router.put('/taskComplete/:id', (req, res) => {
    console.log('marking complete', req.params.id);

    todo.findOne({_id: req.params.id}).then((tasksFromDB) => {
        console.log(tasksFromDB);
        tasksFromDB.completeStatus = true;
        tasksFromDB.save().then((response) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
    }).catch((error) => {
        res.sendStatus(500);
        console.log('error', error);
    })
});

module.exports = router;