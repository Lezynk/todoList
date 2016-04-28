(function() {
    'use strict';

    angular
        .module('models.todos', [
            'ngResource',
            'constant.config'
        ])
        .service('TodosModel', TodosModel)
    ;

    TodosModel.$inject = ['$http', '$q', '$httpParamSerializer', 'configConstant'];

    function TodosModel($http, $q, $httpParamSerializer, configConstant) {
      var model = this,
          todos;

      model.createTodo = createTodo;
      model.getTodoById = getTodoById;
      model.updateTodo = updateTodo;
      model.deleteTodo = deleteTodo;
      model.deleteTodos = deleteTodos;
      model.readTodo = readTodo;
      model.readTodos = readTodos;

      // ------
      //  CRUD
      // ------

      // CREATE
      function createTodo(listId, todo){
        todo.listId = listId;
        return $http({
          url: configConstant.dburl+'/lists/'+listId+'/todos',
          method: 'POST',
          data: $httpParamSerializer(todo), // x-www-form compatible
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
          }}).catch(errorCall);
      }

      // READ
      function readTodo(listId){
        var url = configConstant.dburl+'/lists/'+listId+'/todos';
        return $http.get(url)
          .catch(errorCall);
      }
      function readTodos(listId){
        return readTodo(listId)
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
      function updateTodo(listId, todo){
        return $http({
          url: configConstant.dburl+'/lists/'+listId+'/todos/'+todo.id,
          method: 'PUT',
          data: $httpParamSerializer(todo), // x-www-form compatible
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
          }
        });
      }

      // DELETE
      function deleteTodo(listId, todoId){
        return $http.delete(configConstant.dburl+'/lists/'+listId+'/todos/'+todoId);
      }
      function deleteTodos(list){
        _.remove(todos,function(t){
          return t.listId == list.id;
        });
      }

      // Sends back one todo based on its ID
      function getTodoById(listId, todoId){
        return readTodo(listId).then(function(res){
          return findTodo(res.data);
        });

        function findTodo(res){
          return _.find(res, function(t){
              return t.id == todoId;
          });
        }
      }
    }
})();
