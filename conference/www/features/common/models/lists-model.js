(function() {
    'use strict';

    angular
        .module('models.lists', [
            'ngResource',
            'models.todos'
        ])
        .service('ListsModel', ListsModel)
    ;

    ListsModel.$inject = ['$http', '$q', 'TodosModel'];

    function ListsModel($http, $q, TodosModel) {
        var model = this,
            URLS = {
                FETCH : 'http://localhost:5000/lists'
            },
            lists,
            todos,
            currentList;

        model.httpCall = httpCall;
        model.createList = createList;
        model.getListById = getListById;
        model.setCurrentList = setCurrentList;
        model.addNumberTodos = addNumberTodos;
        model.updateList = updateList;
        model.deleteList = deleteList;

        function httpCall(){
            return $http
                        .get(URLS.FETCH)
                        .then(treatLists)
                        .catch(errorCall);
        }
        function treatLists(result){
            lists = extract(result);
            return lists;
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

        // Calculate the number of todos per lists......
        function addNumberTodos(){
          lists.map( x => {
            TodosModel.httpCall(x.id)
              .then(function(result){
                x.numberTodo = result.length
              })
          });
        }

        function getListById(listId){
            var deferred = $q.defer();

            function findList(){
                return _.find(lists, function(l){
                    return l.id == listId;
                });
            }

            if(lists){
                deferred.resolve(findList());
            } else {
                httpCall()
                    .then(function(result){
                        deferred.resolve(findList());
                    });
            }
            return deferred.promise;
        }
        function setCurrentList(listId){
            return getListById(listId)
                .then(function(list){
                    currentList = list;
                    return currentList;
                });
        }

        function updateList(list){
            var index = _.findIndex(lists,function(l){
                return l.id == list.id;
            });
            lists[index] = list;
        }
        function deleteList(list){
            _.remove(lists,function(l){
                return l.id == list.id;
            });
        }
        function createList(list){
            list.id = lists.length;
            lists.push(list);
        }
    }

})();
