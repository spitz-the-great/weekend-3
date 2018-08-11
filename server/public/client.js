const myApp = angular.module('myApp', []);

myApp.controller('listController', function ($http) {
    console.log('angular js');

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
            // getCarRepairs();
        }).catch(function (error) {
            alert('unable to post new task');
        })
    }


});
