'use strict';

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

        Geocode.geocode(null, $scope.user.baseName)
        .then(function(coords) {
          $scope.user.baseLat = coords.G;
          $scope.user.baseLong = coords.K;

          Auth.createUser({
            name: $scope.user.name,
            baseName: $scope.user.baseName,
            baseLat: $scope.user.baseLat,
            baseLong: $scope.user.baseLong,
            defaultCar: $scope.car._id,
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then( function() {
            // Account created, redirect to home
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

        })
        .catch(function(err) {
          $scope.errors.other = "Location not found!";
        });
      }
    };

  });
