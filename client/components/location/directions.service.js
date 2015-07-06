'use strict';
/* global google */

angular.module('fahrtenbuchApp')
  .factory('Directions', function Directions($q) {

    return {

      /**
       * get route
       *
       * @param   {Function}  callback    - optional  
       * @param   {Object}    coordinatesList
       * @param   {Object}    map
       * @return  {Object}    routes
      */
      getRoute: function(callback, coordinatesList, map) {

        if (google === undefined) {
          var err = new Error('No Connection to Google!');
          deferred.reject(err);
          return cb(err);
        }
   
        var cb = callback || angular.noop;
        var deferred = $q.defer();

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

// var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();
// var map;
// var marker;

// function initialize() {
//   directionsDisplay = new google.maps.DirectionsRenderer();
//   var home = new google.maps.LatLng(48.327294599999995, 10.727326099999999);
//   var mapOptions = {
//     zoom: 6,
//     center: home
//   }
//   map = new google.maps.Map(document.getElementById('mapContainer'), mapOptions);
//   directionsDisplay.setMap(map);
// }

// function calcRoute() {
//   // var start = new google.maps.LatLng(48.3272946, 10.7273261);
//   var start = "Gessertshausen";
//   // var end = new google.maps.LatLng(48.370590, 10.89285);
//   var end = "Allianzarena";
//   var waypts = [];

//   waypts.push({
//     // location: new google.maps.LatLng(48.218800, 11.624707),
//     location: "Augsburg",
//     stopover: true
//   });

//   var request = {
//     origin: start,
//     destination: end,
//     waypoints: waypts,
//     optimizeWaypoints: true,
//     travelMode: google.maps.TravelMode.DRIVING
//   };

//   directionsService.route(request, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//       var route = response.routes[0];
//     }
//   });
// }

// function worked (position) {

//   var latitude = position.coords.latitude;
//   var longitude = position.coords.longitude;
//   var accuracy = position.coords.accuracy;

//   var coords = new google.maps.LatLng(latitude, longitude);
//   var mapOptions = {
//     zoom: 20,
//     center: coords,
//     streetViewControl: false,
//     mapTypeControl: false,
//     navigationControlOptions: {
//         style: google.maps.NavigationControlStyle.SMALL
//     },
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

//   map = new google.maps.Map(document.getElementById("mapContainer"), mapOptions);
//   marker = new google.maps.Marker({
//     position: coords,
//     map: map,
//     title: "TEST"
//   });
// }

// initialize();
// google.maps.event.addDomListener(window, 'load', initialize);
// calcRoute();
// alert("Geolocation API is not supported in your browser.");