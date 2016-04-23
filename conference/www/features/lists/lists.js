(function() {
        'use strict';

    angular
        .module('ctrl.lists',[
            'models.lists',
            'ctrl.createList',
            'ctrl.editList'
        ])
        .config(config)
        .controller('ListsCtrl', ListsCtrl)
    ;

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('todoX.lists',{
                url:'/lists',
                views:{
                    'main@':{
                        controller: 'ListsCtrl as listsCtrl',
                        templateUrl: 'features/lists/lists.html'
                    }
                }
            })
        ;
    }

    ListsCtrl.$inject = ['ListsModel'];

    function ListsCtrl(ListsModel){

        var listsCtrl = this;

        activate();

        function activate(){
            ListsModel
                .httpCall()
                .then(function(result){
                    listsCtrl.lists = result;
                })
            ;
        }
    }

})();
