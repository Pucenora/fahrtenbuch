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
          deferred.resolve(info);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * add account
       *
       * @param  {Object} account
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      postAccount: function(account, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();     

        $http.post('api/accounts/', account)
        .success(function(account) {
          deferred.resolve(account);
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
       * get car
       *
       * @param  {String}   id
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      getCar: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        var carURL = '/api/cars/' + id;

        $http.get(carURL)
        .success(function(car) {
          deferred.resolve(car);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * delete car
       *
       * @param  {String}   id
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      deleteCar: function(id, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        var carURL = '/api/cars/' + id;        

        $http.delete(carURL)
        .success(function(info) {
          deferred.resolve(info);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * patch car
       *
       * @param  {Object}   car
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      patchCar: function(car, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        var carURL = '/api/cars/' + car._id;

        $http.patch(carURL, car)
        .success(function(car) {
          deferred.resolve(car);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      },

      /**
       * add car
       *
       * @param  {Object} car
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      postCar: function(car, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();     

        $http.post('api/cars/', car)
        .success(function(car) {
          deferred.resolve(car);
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