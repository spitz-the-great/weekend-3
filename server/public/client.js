const myApp = angular.module('myApp', []);

myApp.controller('listController', function ($http) {

    const vm = this;
    vm.listArray = [];

    vm.taskToAdd = {
        task: 'test',
        completeStatus: false
    };

    vm.sendTaskToServer = function (taskIn) {
        console.log('in task to server');
        $http({
            method: 'POST',
            url: '/todo',
            data: taskIn
        }).then(function (response) {
        }).catch(function (error) {
            alert('unable to post new task');
        })
        getTaskList();
    }

    function getTaskList() {
        console.log('got task from db');
        $http({
            method: 'GET',
            url: '/todo'
        }).then(function (response) {
            vm.listArray = response.data;
        }).catch(function (error) {
            alert('unable to get task');
        })
    }

    vm.completeTask = function (taskId) {
        $http({
            method: 'PUT',
            url: '/todo/taskComplete/' + taskId
        }).then(function (response) {
            getTaskList();
        })
    }

    vm.deleteTask = function( taskId ){
        $http({
            method: 'DELETE',
            url: '/todo/deleteTask/' + taskId
        }).then( function( response ){
            getTaskList();
        })
    };

});
