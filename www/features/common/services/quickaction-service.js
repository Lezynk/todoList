(function() {
    'use strict';

    angular
        .module('services.quickaction', [])
        .factory('QuickActionService', QuickActionService)
    ;

    QuickActionService.$inject = ['$rootScope', '$q', '$state']; 

    function QuickActionService($rootScope, $q, $state) {

        function check3DTouchAvailability() {
            return $q(testAvailability);

            function testAvailability(resolve, reject) {              
                if (window.ThreeDeeTouch) {
                    window.ThreeDeeTouch.isAvailable(function (available) {
                        resolve(available);
                    });
                } else {
                    reject();
                }
            }
        }

        function configure() {
            // Check if 3D Touch is supported on the device
            check3DTouchAvailability().then(function(available) {

                    if (available) {    // Comment out this check if testing in simulator

                        // Configure Quick Actions
                        window.ThreeDeeTouch.configureQuickActions([
                            {
                                type: 'newList',
                                title: 'New List',
                                subtitle: '',
                                iconType: 'compose'
                            }
                        ]);

                        // Set event handler to check which Quick Action was pressed
                        window.ThreeDeeTouch.onHomeIconPressed = function(payload) {
                            if (payload.type == 'newList') {
                                $state.go('todolist.lists.create');
                            }
                        };
                    }
            })
        }

        return {
            configure: configure
        };
    }

})();