'use strict';

angular.module('fahrtenbuchApp')
  .factory('Trip', function Trip($location, $rootScope, $http, Auth, $cookieStore, $q) {

    return {

      /**
       * get accounts
       *
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getAccounts: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/accounts')
        .success(function(accounts) {
          deferred.resolve(accounts);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * delete account
       *
       * @param  {String}   id
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      deleteAccount: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        var accountURL = '/api/accounts/' + id;        

        $http.delete(accountURL)
        .success(function(info) {
          console.log(info);
          deferred.resolve(info);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * get accounts
       *
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getAccounts: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/accounts')
        .success(function(accounts) {
          deferred.resolve(accounts);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * get cars
       *
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getCars: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/cars')
        .success(function(cars) {
          deferred.resolve(cars);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * get default car
       *
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getDefaultCar: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        var defaultCarURL = '/api/cars/' + Auth.getCurrentUser().default_car;

        $http.get(defaultCarURL)
        .success(function(defaultCar) {
          deferred.resolve(defaultCar);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * get trips
       *
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getTrips: function(callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/api/trips/')
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
       * @return {Promise}
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
      }
    };
  });