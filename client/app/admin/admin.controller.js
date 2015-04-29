'use strict';

angular.module('fahrtenbuchApp')

  .controller('AdminCtrl', function () {
  })

  .controller('AdminAccountCtrl', function ($scope, $route, Trip) {

    $scope.account = {};

    Trip.getAccounts()
    .then(function(accounts) {
      $scope.accounts = accounts;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    $scope.addAccount = function(account) {

      Trip.postAccount(account)
      .then(function(account) {
        $route.reload();
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    };

    $scope.deleteAccount = function(account) {

      Trip.deleteAccount(account._id)
      .then(function() {
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
  })

  .controller('AdminCarCtrl', function ($scope, $location, Trip) {

    $scope.car = {};

    Trip.getCars()
    .then(function(cars) {
      $scope.cars = cars;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    $scope.addCar = function() {
      $location.path("/admin/car/new");
    };

    $scope.editCar = function(car) {
      var carURL = "/admin/car/" + car._id;
      $location.path(carURL);
    };

    $scope.deleteCar = function(car) {

      Trip.deleteCar(car._id)
      .then(function() {
        angular.forEach($scope.cars, function(c, i) {
          if (c === car) {
            $scope.cars.splice(i, 1);
          }
        });
        console.log($scope.cars);
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    };   
  })

  .controller('AdminCarEditCtrl', function ($scope, $location, $routeParams, Trip) {
    
    $scope.modus = "Edit";
    $scope.car = {};

    Trip.getCar($routeParams.id)
    .then(function(car) {
      $scope.car = car;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    $scope.createCar = function() {
      Trip.patchCar($scope.car)
      .then(function() {
        $location.path("/admin/car");
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    }
  })

  .controller('AdminCarAddCtrl', function ($scope, $location, Trip) {
    $scope.modus = "Add";
    $scope.car = {};

    $scope.createCar = function() {
      Trip.postCar($scope.car)
      .then(function() {
        $location.path("/admin/car");
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    }
  });
