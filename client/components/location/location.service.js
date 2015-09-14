'use strict';
/* global navigator */

angular.module('fahrtenbuchApp')
  .factory('Location', function Location($q, $rootScope, config, Directions) {

    return {

      /**
       * get current position
       *
       * @param   {Function}  callback  - optional
       * @param   {Object}    options   - optional
       * @return  {Promsise}  with position
      */
      getCurrentPosition: function(callback, options) {

        var cb = callback || angular.noop;
        var deferred = $q.defer();

        // cancel when application can't connect to geocode api
        if (navigator.geolocation.getCurrentPosition === undefined) {
          var err = new Error('Service getCurrentPosition can not be loaded!');
          deferred.reject(err);
          return cb(err);
        }

        // get default options when no options are assigned
        if (!options) {
          options = config.defaultLocalizationOptions;
        }

        navigator.geolocation.getCurrentPosition(function (position) {
          // case: success
          var coordinates = position.coords;
          // cancel when result isn't accurate enough
          if (coordinates.accuracy > config.desktopLocalizationAccuracy) {
            var err = new Error('Warning! Result is inaccurate!');
            deferred.reject(err);
            return cb(err);
          }
          deferred.resolve(coordinates);

        }, function () {
          // casse: error
          var err = new Error('getCurrentPosition timed out!');
          deferred.reject(err);
          return cb(err);
        
        }, options);

        return deferred.promise;
      },

      /**
       * watch position
       *
       * @param   {Object}    options
      */
      watchPosition: function(options) {

        $rootScope.positions = [];
        
        // cancel when application can't connect to geocode api
        if (navigator.geolocation.watchPosition === undefined) {
          throw new Error('Śervice watchPosition can not be loaded!');
        }
        
        // get default options when no options are assigned
        if (!options) {
          options = config.defaultLocalizationOptions;
        }

        // watch position
        navigator.geolocation.watchPosition(function (position) { 
          Directions.addPointToPolyline(position);
        }, function () {
          throw new Error('watchPosition failed!');
        }, options);
      },

      /**
       * stops watchPosition service and returns results
       *
       * @param   {Function}  callback  - optional
       * @return  {Promise}   with positions
      */
      clearWatch: function(callback) {

        var cb = callback || angular.noop;
        var deferred = $q.defer();

        // cancel when application can't connect to geocode api
        if (navigator.geolocation.clearWatch === undefined) {
          var err = new Error('Service clearWatch can not be loaded!');
          deferred.reject(err);
          return cb(err);
        }

        // clear watch
        navigator.geolocation.clearWatch(Location.watchPosition);

        deferred.resolve($rootScope.path);
        return deferred.promise;
      }  
    };
  });