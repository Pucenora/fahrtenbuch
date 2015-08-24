'use strict';
/* global google */

angular.module('fahrtenbuchApp')
  .factory('Directions', function Directions($q, Geocode) {

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

        var marker;
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
      },

      /**
       * connect all recorded points and display route as it was driven
       *
       * @param   {Function}  callback    - optional 
       * @param   {Array}     coordinatesList
       * @param   {Array}     stays
       * @param   {Object}    map
      */
      polygons: function(callback, coordinatesList, stays, map) {

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

        // initialize polylines and set map
        var poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);

        var path = poly.getPath();

        // convert coordinates to LatLng-Object and add it to the route
        for (var coord of coordinatesList) {
          var lat = coord.coords.latitude;
          var lng = coord.coords.longitude;
          var element = new google.maps.LatLng(lat, lng);

          path.push(element);
        }

        // mark stays at the route
        for (var stay of stays) {
          var position = {};
          // calculate coordinates of a stay, in case it didn't happen before
          if (stay.destinationLat == false || stay.destinationLong == false) {
            Geocode.geocode(null, stay.destination)
              .then(function(pos) {
                position = pos;
              })
              .catch(function(err) {
                $scope.errors.other = err.message;
              });
          } else {
            position = new google.maps.LatLng(stay.destinationLat, stay.destinationLong);
          }

          // add marker
          var marker = new google.maps.Marker({
            position: position,
            map: map
          });
        }
      }
    };
  });