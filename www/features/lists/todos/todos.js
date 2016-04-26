(function() {
    'use strict';

    angular
        .module('ctrl.todos',[
            'models.todos',
            'models.lists',
            'ctrl.createTodo',
            'ctrl.editTodo'
        ])
        .config(config)
        .controller('TodosCtrl', TodosCtrl)
    ;

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('todoX.todos',{
                url:'/lists/:listId',
                views:{
                    'main@':{
                        controller: 'TodosCtrl as todosCtrl',
                        templateUrl: 'features/lists/todos/todos.html'
                    }
                }
            })
        ;
    }

    TodosCtrl.$inject = ['$stateParams', 'TodosModel', 'ListsModel'];

    function TodosCtrl($stateParams, TodosModel, ListsModel){

      var todosCtrl = this;

      activate();

      function activate(){
        ListsModel
          .getListById($stateParams.listId)
          .then(function(result){
            todosCtrl.currentList = result;
          })
          .catch(errorCall);
        ;
        TodosModel
          .readTodos($stateParams.listId)
          .then(function(result){
            todosCtrl.todos = result;
          })
        ;

        function errorCall(result){
          console.log('Failure', result);
        }
      }

    }

})();
