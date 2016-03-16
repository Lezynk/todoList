(function() {
    'use strict';
    
    angular
        .module('editTodo',[ 
            'models.todos',
            'models.lists'
        ])
        .config(config)
        .controller('EditTodoCtrl', EditTodoCtrl)
    ;
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider){
        $stateProvider
            .state('todolist.todos.edit',{
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
    
    EditTodoCtrl.$inject = ['$state', '$stateParams', 'TodosModel', 'ListsModel'];
      
    function EditTodoCtrl($state, $stateParams, TodosModel, ListsModel){
        var editTodoCtrl = this;
        editTodoCtrl.cancelEditing = cancelEditing;
        editTodoCtrl.updateTodo = updateTodo;
        editTodoCtrl.deleteTodo = deleteTodo;
        
        activate();
        
        function activate(){
            TodosModel
                .getTodoById($stateParams.todoId)
                .then(function(todo){
                    if(todo){
                        editTodoCtrl.todo = todo;
                        editTodoCtrl.editedTodo = angular.copy(todo);
                    } else {
                        returnToTodos();
                    }
                })
            ; 
        }
        function returnToTodos(){
            $state.go('todolist.todos',{
                listId:$stateParams.listId
            });
        }
        function cancelEditing(){
            returnToTodos();
        }
        function updateTodo(todo){
            TodosModel.updateTodo(editTodoCtrl.editedTodo);
            returnToTodos();
        }
        function deleteTodo(todo){
            TodosModel.deleteTodo(todo);
            ListsModel.addNumberTodos();
            returnToTodos();
        }
    }
    
})();