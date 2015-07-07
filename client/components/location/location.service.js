'use strict';
/* global google */
/* global navigator */

angular.module('fahrtenbuchApp')
  .factory('Location', function Location($q, $rootScope, config) {

    return {

      /**
       * get current position
       *
       * @param   {Function}  callback  - optional
       * @param   {Object}    options
       * @return  {Object}    position
      */
      getCurrentPosition: function(callback, options) {

        var cb = callback || angular.noop;
        var deferred = $q.defer();

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
          options = config.defaultLocalizationOptions;
        }

        navigator.geolocation.getCurrentPosition(function (position) {
          
          var coordinates = position.coords;

          if (coordinates.accuracy > config.desktopLocalizationAccuracy) {
            var err = new Error('Warning! Result is inaccurate!');
            deferred.reject(err);
            return cb(err);
          }

          deferred.resolve(coordinates);

        }, function () {
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

        if (google === undefined) {
          var err = new Error('No Connection to Google!');
          deferred.reject(err);
          return cb(err);
        }

        if (navigator.geolocation.watchPosition === undefined) {
          throw new Error('Googe service watchPosition can not be loaded!');
        }

        if (!options) {
          options = config.defaultLocalizationOptions;
        }

        navigator.geolocation.watchPosition(function (position) {  
          console.log(position);
          $rootScope.positions.push(position);
        }, function () {
          throw new Error('watchPosition failed!');
        }, options);
      },

      /**
       * stop watchPosition
       *
       * @param   {Function}  callback  - optional
       * @return  {Array}    positions
      */
      clearWatch: function(callback) {

        var cb = callback || angular.noop;
        var deferred = $q.defer();

        if (google === undefined) {
          var err = new Error('No Connection to Google!');
          deferred.reject(err);
          return cb(err);
        }

        if (navigator.geolocation.clearWatch === undefined) {
          var err = new Error('Googe service getCurrentPosition can not be loaded!');
          deferred.reject(err);
          return cb(err);
        }

        navigator.geolocation.clearWatch(Location.watchPosition);

        deferred.resolve($rootScope.positions);
        return deferred.promise;
      }  
    };
  });