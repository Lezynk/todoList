(function() {
    'use strict';

    angular
        .module('ctrl.createList',[
            'models.lists'
        ])
        .config(config)
        .controller('CreateListCtrl', CreateListCtrl)
    ;

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('todoX.lists.create',{
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
            $state.go('todoX.lists');
        }
        function cancelCreating(){
            returnToLists();
        }
        function createList(list){
            var listPlainNameTest = /^\s*$/g.test(createListCtrl.newList.title);
            if(!listPlainNameTest){
                ListsModel.createList(list)
                returnToLists();
            }
        }
        function resetForm(){
            createListCtrl.newList = {
                title:''
            }
        }
    }

})();
