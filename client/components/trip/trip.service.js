'use strict';

angular.module('fahrtenbuchApp')
  .factory('Trip', function Trip($http, $q) {

    return {

      /**
       * get trips
       *
       * @param  {Function} callback  - optional
       * @return {Promise}  with trips
      */
      getTrips: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/trips')
        .success(function(trips) {
          deferred.resolve(trips);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * get specific trip
       *
       * @param  {String}   id  
       * @param  {Function} callback  - optional
       * @return {Promise}  with trip
      */
      getTrip: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        var tripURL = '/api/trips/' + id;

        $http.get(tripURL)
        .success(function(trips) {
          deferred.resolve(trips);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * post trip
       *
       * @param  {Object}   trip
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      postTrip: function(trip, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/api/trips', trip)
        .success(function(trip) {
          deferred.resolve(trip);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      }
    };
  });