(function() {
    'use strict';
    
    angular
        .module('createList',[
            'models.lists'
        ])
        .config(config)
        .controller('CreateListCtrl', CreateListCtrl)
    ;
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider){
        $stateProvider
            .state('todolist.lists.create',{
                url:"/create",
                views:{
                    'main@':{
                        controller: 'CreateListCtrl as createListCtrl',
                        templateUrl: "features/lists/create/create-list.html"
                    }
                }
            })
        ;
    }
    
    CreateListCtrl.$inject = ['$state', '$stateParams', 'ListsModel'];
    
    function CreateListCtrl($state, $stateParams, ListsModel){
        var createListCtrl = this;
        createListCtrl.cancelCreating = cancelCreating;
        createListCtrl.createList = createList;
        
        resetForm();
        
        function returnToLists(){
            $state.go('todolist.lists')
        }
        function cancelCreating(){
            returnToLists();
        }
        function createList(list){
            ListsModel.createList(list);
            ListsModel.addNumberTodos()
            returnToLists();
        }
        function resetForm(){
            createListCtrl.newList = {
                title:''
            }
        }
    }
    
})();