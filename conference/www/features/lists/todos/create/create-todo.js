(function() {
    'use strict';
    
    angular
        .module('createTodo',[
            'models.todos',
            'models.lists'
        ])
        .config(config)
        .controller('CreateTodoCtrl', CreateTodoCtrl)
    ;
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider){
        $stateProvider
            .state('todolist.todos.create',{
                url:"/todos/create",
                views:{
                    'main@':{
                        controller: 'CreateTodoCtrl as createTodoCtrl',
                        templateUrl: "features/lists/todos/create/create-todo.html"
                    }
                }
            })
        ;
    }
    
    CreateTodoCtrl.$inject = ['$state', '$stateParams', 'TodosModel', 'ListsModel'];
    
    function CreateTodoCtrl($state, $stateParams, TodosModel, ListsModel){
        var createTodoCtrl = this;
        createTodoCtrl.getListId = getListId;
        createTodoCtrl.cancelCreating = cancelCreating;
        createTodoCtrl.createTodo = createTodo;
        
        resetForm();
        
        function getListId(){
            return $stateParams.listId;
        }
        function returnToTodos(){
            $state.go('todolist.todos',{
                listId: $stateParams.listId
            })
        }
        function cancelCreating(){
            returnToTodos();
        }
        function createTodo(todo){
            TodosModel.createTodo(todo);
            ListsModel.addNumberTodos();
            returnToTodos();
        }
        function resetForm(){
            createTodoCtrl.newTodo = {
                content:'',
                listId:$stateParams.listId
            }
        }
    }
    
})();