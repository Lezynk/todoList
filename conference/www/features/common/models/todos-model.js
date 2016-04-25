(function() {
    'use strict';

    angular
        .module('models.todos', [
            'ngResource'
        ])
        .service('TodosModel', TodosModel)
    ;

    TodosModel.$inject = ['$http', '$q'];

    function TodosModel($http, $q) {
      var model = this,
          URLS = {
              FETCH_HEAD : 'http://localhost:5000/lists/',
              FETCH_END : '/todos'
          },
          todos;

      model.createTodo = createTodo;
      model.getTodoById = getTodoById;
      model.updateTodo = updateTodo;
      model.deleteTodo = deleteTodo;
      model.deleteTodos = deleteTodos;
      model.readTodo = readTodo;

      // ------
      //  CRUD
      // ------

      // CREATE
      function createTodo(todo){
          todo.id = todos.length;
          todos.push(todo);
      }

      // READ
      function readTodo(listId){
        const url = URLS.FETCH_HEAD+listId+URLS.FETCH_END;
        return $http.get(url)
          .then(treatTodos)
          .catch(errorCall);
      }
      function treatTodos(result){
          todos = result.data;
          return todos;
      }
      function errorCall(result){
          var errorMessage = 'XHR Failed';
          if (result.data && result.data.description) {
            errorMessage = errorMessage + '\n' + result.data.description;
          }
          return $q.reject(result);
      }

      // UPDATE
      function updateTodo(todo){
        var index = _.findIndex(todos,function(t){
          return t.id == todo.id;
        });
        todos[index] = todo;
      }

      // DELETE
      function deleteTodo(todo){
        _.remove(todos,function(t){
          return t.id == todo.id;
        });
      }
      function deleteTodos(list){
        _.remove(todos,function(t){
          return t.listId == list.id;
        });
      }

      // Sends back one todo based on its ID
      function getTodoById(todoId, listId){
        var deferred = $q.defer();
        // Find todo
        function findTodo(todoId){
          return _.find(todos,function(todo){
            return todo.id === parseInt(todoId,10);
          });
        }
        if(todos){
          deferred.resolve(findTodo(todoId));
        } else {
          readTodo(listId).then(function(){
            deferred.resolve(findTodo(todoId));
          });
        }
        return deferred.promise;
      }

    }
})();
