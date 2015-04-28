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
  })

  .controller('AdminAccountCtrl', function ($scope, Trip) {

    Trip.getAccounts()
    .then(function(accounts) {
      $scope.accounts = accounts;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });
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
