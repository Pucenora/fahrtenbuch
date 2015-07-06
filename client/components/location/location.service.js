'use strict';
/* global google */
/* global navigator */

angular.module('fahrtenbuchApp')
  .factory('Location', function Location($q) {

    return {

      /**
       * get current location
       *
       * @param   {Function}  callback  - optional  
       * @return  {Object}    options   - optional
      */
      getCurrentPosition: function(callback, options) {

        if (google === undefined) {
          var err = new Error('No Connection to Google!');
          deferred.reject(err);
          return cb(err);
        }

        if (navigator.geolocation.getCurrentPosition === undefined) {
          var err = new Error('Googe service getCurrentPosition can not be loaded!');
          deferred.reject(err);
          return cb(err);
        }

        if (!options) {
        	options = {
  				  enableHighAccuracy: true,
  				  timeout: 1000,
  				  maximumAge: 0
  				};
        }

        var cb = callback || angular.noop;
        var deferred = $q.defer();

        navigator.geolocation.getCurrentPosition(function (position) {
          
          var coordinates = position.coords;

          if (coordinates.accuracy > 100000) {
            var err = new Error('Warning! Result is inaccurate!');
            deferred.reject(err);
            return cb(err);
          }

          deferred.resolve(position);

        }, function () {
          var err = new Error('getCurrentPosition timed out!')
          deferred.reject(err);
          return cb(err);

        }, options);

        return deferred.promise;

      }
    };
  });