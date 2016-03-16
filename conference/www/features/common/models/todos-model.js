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
                FETCH : 'data/todos.json'
            },
            todos;
        
        model.getTodos = getTodos;
        model.createTodo = createTodo;
        model.getTodoById = getTodoById;
        model.updateTodo = updateTodo;
        model.deleteTodo = deleteTodo;
        model.deleteTodos = deleteTodos;
        
        function httpCall(){
            return $http
                        .get(URLS.FETCH)
                        .then(cacheTodos)
                        .catch(errorCall);
        }
        function getTodos(){
            return todos ? $q.when(todos) : httpCall();
        }
        function extract(result){
            return result.data;
        }
        function errorCall(result){
            var newMessage = 'XHR Failed';
            if (result.data && result.data.description) {
              newMessage = newMessage + '\n' + result.data.description;
            }
            result.data.description = newMessage;
            //logger.error(newMessage);
            return $q.reject(result);
        }
        function cacheTodos(result){
            todos = extract(result);
            return todos;
        }
        function createTodo(todo){
            todo.id = todos.length;
            todos.push(todo);
        }
        function findTodo(todoId){
            return _.find(todos,function(todo){
                return todo.id === parseInt(todoId,10);
            });
        }
        function getTodoById(todoId){
            var deferred = $q.defer();
            if(todos){
                deferred.resolve(findTodo(todoId));
            } else {
                model.getTodos().then(function(){
                    deferred.resolve(findTodo(todoId));
                });
            }
            return deferred.promise;
        }
        function updateTodo(todo){
            var index = _.findIndex(todos,function(t){
                return t.id == todo.id;
            });
            
            todos[index] = todo;
        }
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
    }
    
})();