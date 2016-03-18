(function() {
    'use strict';
    
    angular
        .module('services.geolocation', [
            'ngCordova'
        ])
        .service('GeolocationService', GeolocationService)
    ;
        
    GeolocationService.$inject = ['$cordovaGeolocation'];
    
    function GeolocationService($cordovaGeolocation) {
        var service = this;
        service.setLocation = setLocation;
        service.activateShowLocation = activateShowLocation;
        
        
        function setLocation(){
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            return $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(successLocation, errorLocation);
        
            function successLocation(position) {
                return {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            }
            function errorLocation(err) {
                console.log(err);
            }
        }
        function activateShowLocation(lat, lng, zoOm){
            var myLatlng = new google.maps.LatLng(lat, lng);
            service.mapOptions = {
                center: myLatlng,
                zoom: zoOm,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        }
    }
    
})();