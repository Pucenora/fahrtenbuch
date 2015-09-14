'use strict';
/* global google */

angular.module('fahrtenbuchApp')
  .factory('Directions', function Directions($q, Geocode, $rootScope) {

    return {

      /**
       * calculates a optimized route for a car
       * waypoints are limited to 8
       *
       * @param   {Function}  callback    - optional  
       * @param   {Array}     coordinatesList
       * @param   {Array}     stays
       * @param   {Object}    map
       * @return  {Promise}   with routes
      */
      getRoute: function(callback, coordinatesList, stays, map) {

        var cb = callback || angular.noop;
        var deferred = $q.defer();

        // cancel when application can't connect to google
        if (google === undefined) {
          var err = new Error('No Connection to Google!');
          deferred.reject(err);
          return cb(err);
        }

        var origin;
        var destination;
        var waypts = [];

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        google.maps.event.addDomListener(window, 'load', directionsDisplay.setMap(map));

        for (var i = 0; i < coordinatesList.length; i++) {
          // first coordinates are the coordinates of the origin
          if (i === 0) {
            origin = coordinatesList[i];
          }
          // last coordinates are the coordinates of the destination
          if (i === coordinatesList.length - 1) {
            destination = coordinatesList[i];
          } else {
            waypts.push({
              location: coordinatesList[i],
              stopover: true
            });
          }
        }

        // options of the direction service
        var request = {
          origin: origin,
          destination: destination,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING
        };

        // calculate and display route
        directionsService.route(request, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            deferred.resolve(response.routes[0]);
          } else {
            var err = new Error('Route couldn\'t be calculated');
            deferred.reject(err);
            return cb(err);
          }
        });

        return deferred.promise;
      },

      /**
       * connect all recorded points and display route as it was driven
       *
       * @param   {Function}  callback    - optional 
       * @param   {Array}     coordinatesList
       * @param   {Object}    map
      */
      polygons: function(callback, map) {
        // cancel when application can't connect to google
        if (google === undefined) {
          throw new Error('No Connection to Google!');
        }

        // options of the polygons service
        var polyOptions = {
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 3
        };

        var center = map.data.map.center;
        $rootScope.marker = new google.maps.Marker({
          position: new google.maps.LatLng(center.G, center.K),
          map: map
        });

        // initialize polylines and set map
        var poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);
        $rootScope.path = poly.getPath();
        $rootScope.pathLength = 0;        
      },

      addPointToPolyline: function(position) {    
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var currentPosition = new google.maps.LatLng(lat, lng);

        $rootScope.path.push(currentPosition);
        $rootScope.marker.position = currentPosition;
        $rootScope.pathLength = google.maps.geometry.spherical.computeLength($rootScope.path.getArray());
      }
    };
  });