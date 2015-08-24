'use strict';

/**
 * Login into application
**/
angular.module('fahrtenbuchApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // redirect to trip overview
          $location.path('/trip');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
