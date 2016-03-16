(function() {
        'use strict';
        
    angular
        .module('lists',[ 
            'models.lists',
            'createList',
            'editList'
        ])
        .config(config)
        .controller('ListsCtrl', ListsCtrl)
    ;
    
    config.$inject = ['$stateProvider'];
    
    function config($stateProvider){
        $stateProvider
            .state('todolist.lists',{
                url:"/lists",
                views:{
                    'main@':{
                        controller: 'ListsCtrl as listsCtrl',
                        templateUrl: "features/lists/lists.html"
                    }
                }
            })
        ;
    }
    
    ListsCtrl.$inject = ['ListsModel'];
    
    function ListsCtrl(ListsModel){
        var listsCtrl = this;
        listsCtrl.setCurrentList = ListsModel.setCurrentList;
        
        activate();
        
        function activate(){
            ListsModel
                .getLists()
                .then(function(result){
                    listsCtrl.lists = result;
                })
            ;
        }
    }
    
})();