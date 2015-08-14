'use strict';

angular.module('fahrtenbuchApp')
  .factory('Coordinate', function Coordinate($http, $q) {

    return {

      /**
       * get coordinates
       *
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getCoordinates: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/coordinates')
        .success(function(coordinates) {
          deferred.resolve(coordinates);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * get specific coordinate
       *
       * @param  {String}   id  
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getCoordinate: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        var coordinateURL = '/api/coordinates/' + id;

        $http.get(coordinateURL)
        .success(function(coordinates) {
          deferred.resolve(coordinates);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * post coordinate
       *
       * @param  {Object}   coordinate
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      postCoordinate: function(coordinate, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/coordinates', coordinate)
        .success(function(coordinate) {
          deferred.resolve(coordinate);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      }
    };
  });