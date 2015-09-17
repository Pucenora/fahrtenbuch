'use strict';

/**
 * Sign up as new user
**/ 
angular.module('fahrtenbuchApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, Car, Geocode) {

    $scope.user = {};
    $scope.errors = {};

    Car.getCars()
    .then(function(cars) {
      $scope.cars = cars;
      $scope.car = $scope.cars[0];
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {

        // save new user
        Auth.createUser({
          name: $scope.user.name,
          defaultCar: $scope.car._id,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // redirect to trip overview
          $location.path('/trip');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
