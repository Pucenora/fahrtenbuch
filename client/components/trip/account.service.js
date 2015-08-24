'use strict';

/**
 * Interface to account logic in server
**/
angular.module('fahrtenbuchApp')
  .factory('Account', function Account($http, $q) {

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

        $http.post('/api/accounts', account)
        .success(function(account) {
          deferred.resolve(account);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      }
    };
  });