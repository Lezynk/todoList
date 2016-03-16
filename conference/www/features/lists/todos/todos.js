(function() {
    'use strict';
    
    angular
        .module('todos',[ 
            'models.todos',
            'models.lists',
            'createTodo',
            'editTodo'
        ])
        .config(config)
        .controller('TodosCtrl', TodosCtrl)
    ;
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider){
        $stateProvider
            .state('todolist.todos',{
                url:"/lists/:listId",
                views:{
                    'main@':{
                        controller: 'TodosCtrl as todosCtrl',
                        templateUrl: "features/lists/todos/todos.html"
                    }
                }
            })
        ;
    }
    
    TodosCtrl.$inject = ['$stateParams','TodosModel', 'ListsModel'];
    
    function TodosCtrl($stateParams, TodosModel, ListsModel){
        var todosCtrl = this;
        todosCtrl.getListId = getListId;
        todosCtrl.currentList = ListsModel.getCurrentList();
        
        activate();
        
        function activate(){
            TodosModel
                .getTodos()
                .then(function(result){
                    todosCtrl.todos = result;
                })
            ;
            ListsModel
                .getLists()
                .then(function(result){
                    todosCtrl.lists = result;
                })
            ;
        }
        function getListId(){
            return $stateParams.listId;
        }
    }
    
})();