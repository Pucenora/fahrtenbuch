'use strict';
/* global google */

angular.module('fahrtenbuchApp')
  .factory('Geocode', function Geocode($q) {

    return {

      /**
       * get name of location with coordinates
       *
       * @param   {Function}  callback    - optional  
       * @param   {Object}    coordinates 
       * @return  {String}    address
      */
      reverseGeocode: function(callback, coordinates) {

        if (google === undefined) {
          var err = new Error('No Connection to Google!');
          deferred.reject(err);
          return cb(err);
        }
   
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        var Geocoder = new google.maps.Geocoder();

        Geocoder.geocode({'latLng': coordinates}, function(results, status) {

          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0].formatted_address === undefined) {
              var err = new Error('Could not find a name for this location!');
              deferred.reject(err);
              return cb(err);
            } else {
              deferred.resolve(results[0].formatted_address);
            }
          } else {
            var err = new Error('Geocoding your location failed');
            deferred.reject(err);
            return cb(err);
          }
        });

        return deferred.promise;

      },

      /**
       * get coordinates of location with name
       *
       * @param   {Function}  callback    - optional  
       * @param   {String}    address 
       * @return  {Object}    coordinates
      */
      geocode: function(callback, address) {

        if (google === undefined) {
          var err = new Error('No Connection to Google!');
          deferred.reject(err);
          return cb(err);
        }
   
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        var Geocoder = new google.maps.Geocoder();

        Geocoder.geocode({'address': address}, function(results, status) {

          if (status === google.maps.GeocoderStatus.OK) {
            deferred.resolve(results[0].geometry.location);
          } else {
            var err = new Error('Geocoding your location failed');
            deferred.reject(err);
            return cb(err);
          }
        });

        return deferred.promise;
      
      }
    };
  });