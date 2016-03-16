(function() {
    'use strict';
    
    angular
        .module('editList',[ 
            'models.todos',
            'models.lists'
        ])
        .config(config)
        .controller('EditListCtrl', EditListCtrl)
    ;
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider){
        $stateProvider
            .state('todolist.lists.edit',{
                url:"/:listId/edit",
                views:{
                    'main@':{
                        controller: 'EditListCtrl as editListCtrl',
                        templateUrl: "features/lists/edit/edit-list.html"
                    }
                }
            })
        ;
    }
    
    EditListCtrl.$inject = ['$state', '$stateParams', '$ionicHistory', 'TodosModel', 'ListsModel'];
      
    function EditListCtrl($state, $stateParams, $ionicHistory, TodosModel, ListsModel){
        var editListCtrl = this;
        editListCtrl.cancelEditing = cancelEditing;
        editListCtrl.updateList = updateList;
        editListCtrl.deleteList = deleteList;
        
        activate();
        
        function activate(){
            ListsModel
                .getListById($stateParams.listId)
                .then(function(list){
                    if(list){
                        editListCtrl.list = list;
                        editListCtrl.editedList = angular.copy(list);
                    } else {
                        returnToList();
                    }
                })
            ; 
        }
        function returnToList(){
            $ionicHistory.goBack(-1);
            //$state.go('todolist.todos', {listId:$stateParams.listId});
        }
        function returnToLists(){
            $ionicHistory.goBack(-2);
            //$state.go('todolist.lists');
        }
        function cancelEditing(){
            returnToList();
        }
        function updateList(list){
            ListsModel.updateList(editListCtrl.editedList);
            returnToList();
        }
        function deleteList(list){
            TodosModel.deleteTodos(list);
            ListsModel.deleteList(list);
            returnToLists();
        }
    }
    
})();