'use strict';

angular.module('fahrtenbuchApp')
  .factory('Car', function Car($location, $rootScope, $http, Auth, $cookieStore, $q) {

    return {

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

        $http.post('api/cars', car)
        .success(function(car) {
          deferred.resolve(car);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      }
    };
  });