(function() {
    'use strict';

    angular
        .module('ctrl.editTodo',[
            'models.todos',
            'models.lists',
            'services.geolocation'
        ])
        .config(config)
        .controller('EditTodoCtrl', EditTodoCtrl)
    ;

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('todoX.todos.edit',{
                url:"/todos/:todoId/edit",
                views:{
                    'main@':{
                        controller: 'EditTodoCtrl as editTodoCtrl',
                        templateUrl: "features/lists/todos/edit/edit-todo.html"
                    }
                }
            })
        ;
    }

    EditTodoCtrl.$inject = ['$state', '$stateParams', 'TodosModel', 'ListsModel', 'GeolocationService'];

    function EditTodoCtrl($state, $stateParams, TodosModel, ListsModel, GeolocationService){
        var editTodoCtrl = this,
            locationAvailable;
        editTodoCtrl.cancelEditing = cancelEditing;
        editTodoCtrl.updateTodo = updateTodo;
        editTodoCtrl.deleteTodo = deleteTodo;
        editTodoCtrl.setLocation = setLocation;

        activate();

        function activate(){
            TodosModel
                .getTodoById($stateParams.listId, $stateParams.todoId)
                .then(function(todo){
                    if(todo){
                        editTodoCtrl.todo = todo;
                        editTodoCtrl.editedTodo = angular.copy(todo);
                        if(editTodoCtrl.todo.location && editTodoCtrl.todo.location.lat && editTodoCtrl.todo.location.lng){
                            editTodoCtrl.textLocation = "Edit Location";
                            GeolocationService.activateShowLocation(editTodoCtrl.todo.location.lat,editTodoCtrl.todo.location.lng, 14);
                        } else {
                            editTodoCtrl.textLocation = "Add Location";
                            GeolocationService.activateShowLocation(48.8534100,2.3488000, 8);
                        }
                        editTodoCtrl.map = new google.maps.Map(document.getElementById("map"), GeolocationService.mapOptions);
                    } else {
                        returnToTodos();
                    }
                })
            ;
        }
        function returnToTodos(){
            $state.go('todoX.todos',{
                listId:$stateParams.listId
            });
        }
        function cancelEditing(){
            returnToTodos();
        }
        function updateTodo(){
            var todoPlainNameTest = /^\s*$/g.test(editTodoCtrl.editedTodo.content);
            if(!todoPlainNameTest){
              TodosModel.updateTodo($stateParams.listId, editTodoCtrl.editedTodo)
                .then(function(){
                  returnToTodos();
                });
            }
        }
        function deleteTodo(){
          TodosModel.deleteTodo($stateParams.listId, $stateParams.todoId)
            .then(function(){
              returnToTodos();
            });
        }
        function setLocation(){

            GeolocationService.setLocation()
                .then(successLocation);

            function successLocation(locdata){
                editTodoCtrl.editedTodo.location = locdata;
                editTodoCtrl.textLocation = "Edit Location";
                editTodoCtrl.map.setCenter(new google.maps.LatLng(editTodoCtrl.editedTodo.location.lat,editTodoCtrl.editedTodo.location.lng));
                editTodoCtrl.map.setZoom(14);
            }
        }
    }

})();
