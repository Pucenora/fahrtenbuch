'use strict';
/* global google */

angular.module('fahrtenbuchApp')
  .factory('Directions', function Directions($q) {

    return {

      /**
       * get route
       *
       * @param   {Function}  callback    - optional  
       * @param   {Array}    coordinatesList
       * @param   {Object}    map
       * @return  {Array}    routes
      */
      getRoute: function(callback, coordinatesList, map) {

        var cb = callback || angular.noop;
        var deferred = $q.defer();

        if (google === undefined) {
          var err = new Error('No Connection to Google!');
          deferred.reject(err);
          return cb(err);
        }

        var marker;
        var base;
        var waypts = [];

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        base = coordinatesList[0];

        google.maps.event.addDomListener(window, 'load', directionsDisplay.setMap(map));

        for (var i = 1; i < coordinatesList.length; i++) {
          waypts.push({
            location: coordinatesList[i],
            stopover: true
          });
        }

        var request = {
          origin: base,
          destination: base,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING
        };

        // directionsDisplay = new google.maps.DirectionsRenderer({
        //   suppressMarkers: true
        // });

        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            deferred.resolve(response.routes[0]);
          } else {
            var err = new Error('Route couldn\'t be calculated');
            deferred.reject(err);
            return cb(err);
          }
        });

        return deferred.promise;
      }
    };
  });