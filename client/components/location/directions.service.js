'use strict';
/* global google */

angular.module('fahrtenbuchApp')
  .factory('Directions', function Directions($q, Geocode) {

    return {

      /**
       * get route
       *
       * @param   {Function}  callback    - optional  
       * @param   {Array}     coordinatesList
       * @param   {Array}     stays
       * @param   {Object}    map
       * @return  {Array}     routes
      */
      getRoute: function(callback, coordinatesList, stays, map) {

        var cb = callback || angular.noop;
        var deferred = $q.defer();

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
          if (i === 0) {
            origin = coordinatesList[i];
          }
          if (i === coordinatesList.length - 1) {
            destination = coordinatesList[i];
          } else {
            waypts.push({
              location: coordinatesList[i],
              stopover: true
            });
          }
        }

        var request = {
          origin: origin,
          destination: destination,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING
        };

        // directionsDisplay = new google.maps.DirectionsRenderer({
        //   suppressMarkers: true
        // });

        stays.forEach(function(stay) {
          new google.maps.Marker({
            position: new google.maps.LatLng(stay.destinationLat, stay.destinationLong),
            map: map,
            title: stay.destination
          });
        });

        var marker = new google.maps.Marker({
          position: origin,
          map: map,
          title: 'origin'
        });

        // var infowindow = new google.maps.InfoWindow({
        //   content: "<span>There ones was a mayden from ..../span>"
        // });

        // google.maps.event.addListener(marker, 'click', function() {
        //   infowindow.open(map, marker);
        // });

        new google.maps.Marker({
          position: destination,
          map: map,
          title: 'destination'
        });

        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            deferred.resolve(response.routes[0]);
          } else {
            // var err = new Error('Route couldn\'t be calculated');
            var err = new Error(status);
            deferred.reject(err);
            return cb(err);
          }
        });

        return deferred.promise;
      },

      /**
       * draw route with polygons
       *
       * @param   {Function}  callback    - optional  
       * @param   {Object}    map
       * @return  {Array}     path
      */
      polygons: function(callback, map) {

        var cb = callback || angular.noop;
        // var deferred = $q.defer();

        // if (google === undefined) {
        //   var err = new Error('No Connection to Google!');
        //   deferred.reject(err);
        //   return cb(err);
        // }

        // var coordinatesList = [
        //   new google.maps.LatLng(48.368765, 10.898706),
        //   new google.maps.LatLng(48.218800, 11.624707),
        //   new google.maps.LatLng(52.516275, 13.377704),
        // ];

        var first = new google.maps.LatLng(48.368765, 10.898706);
        var second = new google.maps.LatLng(48.218800, 11.624707);
        var third = new google.maps.LatLng(52.516275, 13.377704); 

        var polyOptions = {
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 3
        };

        var poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);

        var path = poly.getPath(); 

        path.push(first);
        path.push(second);
        path.push(third);

        new google.maps.Marker({
          position: first,
          title: '#1',
          map: map
        });
            
        new google.maps.Marker({
          position: second,
          title: '#2',
          map: map
        });
            
        new google.maps.Marker({
          position: third,
          title: '#3',
          map: map
        });

        // for (var i = 0; coordinatesList.length - 1; i++) {

        //   path.push(coordinatesList[i]);

        //   var marker = new google.maps.Marker({
        //     position: coordinatesList[i],
        //     title: '#' + path.getLength(),
        //     map: map
        //   });
        // }

        // deferred.resolve(path);
        // return deferred.promise;
      }
    };
  });