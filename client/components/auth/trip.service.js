'use strict';

angular.module('fahrtenbuchApp')
  .factory('Trip', function Trip($location, $rootScope, $http, Auth, $cookieStore, $q) {

    return {

      /**
       * get accounts
       *
       * @param  {Array}   accounts   - login info
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getAccounts: function(accounts, callback) {
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
       * @param  {Array}   cars       - login info
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getCars: function(cars, callback) {
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
       * @param  {Object}   car       - login info
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getDefaultCar: function(cars, callback) {
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
      }
    };
  });