(function() {
    'use strict';

    angular
        .module('models.lists', [
            'ngResource',
            'models.todos',
            'constant.config'
        ])
        .service('ListsModel', ListsModel)
    ;

    ListsModel.$inject = ['$http', '$q', 'TodosModel', '$httpParamSerializer', 'configConstant'];

    function ListsModel($http, $q, TodosModel, $httpParamSerializer, configConstant) {
      var model = this,
        lists,
        todos,
        currentList;

      model.readList = readList;
      model.readLists = readLists;
      model.createList = createList;
      model.getListById = getListById;
      model.updateList = updateList;
      model.deleteList = deleteList;

      // ------
      //  CRUD
      // ------

      // CREATE
      function createList(list){
        $http({
          url: configConstant.dburl+'/lists',
          method: 'POST',
          data: $httpParamSerializer(list), // x-www-form compatible
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
          }}).catch(errorCall);
      }

      // READ
      function readList(){
        return $http.get(configConstant.dburl+'/lists')
          .catch(errorCall);
      }
      function readLists(){
        return readList()
          .then(treatLists)
          .catch(errorCall);
      }
      function treatLists(result){
        // Promises array for filling the number of todos per lists
        var promises = [];

        lists = result.data;
        // Maps over each list, counts the number of todos per each of them
        // and add the info in the object as 'numberTodo'
        lists.map(function(x){
          promises.push(
            new Promise(function(resolve, reject) {
              TodosModel.readTodos(x.id)
                .then(function(result){
                  x.numberTodo = result.length
                  resolve(x);
                })
            })
          );
        });

        // Returns a big promise that only resolves when all small
        // are resolved
        return Promise.all(promises)
          .then(resp => resp)
          .catch(errorCall);
      }

      // UPDATE
      function updateList(list){
        return $http({
          url: configConstant.dburl+'/lists/'+list.id,
          method: 'PUT',
          data: $httpParamSerializer(list), // x-www-form compatible
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
          }
        });
      }

      // DELETE
      function deleteList(list){
        return $http.delete(configConstant.dburl+'/lists/'+list.id);
      }

      // Error handling
      function errorCall(result){
        var errorMessage = 'XHR Failed';
        if (result.data && result.data.description) {
          errorMessage = errorMessage + '\n' + result.data.description;
        }
        console.log(errorMessage);
        return $q.reject(result);
      }

      // Sends back one list based on its ID
      function getListById(listId){
        return readList().then(function(res){
          return findList(res.data);
        });

        function findList(res){
          return _.find(res, function(l){
              return l.id == listId;
          });
        }
      }

    }
})();
