(function() {
    'use strict';

    angular
        .module('ctrl.createTodo',[
            'models.todos',
            'models.lists',
            'services.geolocation'
        ])
        .config(config)
        .controller('CreateTodoCtrl', CreateTodoCtrl)
    ;

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('todoX.todos.create',{
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

    CreateTodoCtrl.$inject = ['$state', '$stateParams', 'TodosModel', 'ListsModel', 'GeolocationService', '$q'];

    function CreateTodoCtrl($state, $stateParams, TodosModel, ListsModel, GeolocationService, $q){
        var createTodoCtrl = this;
        createTodoCtrl.getListId = getListId;
        createTodoCtrl.cancelCreating = cancelCreating;
        createTodoCtrl.createTodo = createTodo;
        createTodoCtrl.setLocation = setLocation;
        createTodoCtrl.textLocation = "Add Location";

        resetForm();
        activate();

        function activate(){
            GeolocationService.activateShowLocation(48.8534100, 2.3488000, 8);
            createTodoCtrl.map = new google.maps.Map(document.getElementById("map"), GeolocationService.mapOptions);
        }
        function getListId(){
            return $stateParams.listId;
        }
        function returnToTodos(){
            $state.go('todoX.todos',{
                listId: $stateParams.listId
            });
        }
        function cancelCreating(){
            returnToTodos();
        }
        function createTodo(){
            var todoPlainNameTest = /^\s*$/g.test(createTodoCtrl.newTodo.content);
            if(!todoPlainNameTest){
                TodosModel.createTodo($stateParams.listId, createTodoCtrl.newTodo)
                  .then(function(){
                    returnToTodos();
                  });
            }
        }
        function resetForm(){
            createTodoCtrl.newTodo = {
                content:'',
                location:false,
                listId:$stateParams.listId
            };
        }
        function setLocation(){

            GeolocationService.setLocation()
                .then(successLocation);

            function successLocation(locdata){
                createTodoCtrl.newTodo.location = locdata;
                createTodoCtrl.textLocation = "Edit Location";
                createTodoCtrl.map.setCenter(new google.maps.LatLng(createTodoCtrl.newTodo.location.lat, createTodoCtrl.newTodo.location.lng));
                createTodoCtrl.map.setZoom(16);
            }
        }
    }

})();
