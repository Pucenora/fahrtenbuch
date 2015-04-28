'use strict';

angular.module('fahrtenbuchApp')

  .controller('AdminCtrl', function () {
  })

  .controller('AdminCarCtrl', function ($scope, Trip) {

    Trip.getCars()
    .then(function(cars) {
      $scope.cars = cars;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    // $scope.addCar = function() {

    // };

    // $scope.deleteCar = function(car) {

    // };   
  })

  .controller('AdminAccountCtrl', function ($scope, Trip) {

    Trip.getAccounts()
    .then(function(accounts) {
      $scope.accounts = accounts;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    // $scope.addAccount = function() {

    // };

    $scope.deleteAccount = function(account) {

      Trip.deleteAccount(account._id)
      .then(function(accounts) {
        angular.forEach($scope.accounts, function(a, i) {
          if (a === account) {
            $scope.accounts.splice(i, 1);
          }
        });
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    };   
  })

  .controller('AdminUserCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
