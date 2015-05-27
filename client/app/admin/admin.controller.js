'use strict';

angular.module('fahrtenbuchApp')

  .controller('AdminCtrl', function () {
  })

  .controller('AdminAccountCtrl', function ($scope, $route, Account) {

    $scope.accounts = {};

    Account.getAccounts()
    .then(function(accounts) {
      $scope.accounts = accounts;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    $scope.addAccount = function(account) {
      Account.postAccount(account)
      .then(function(account) {
        $route.reload();
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    };

    $scope.deleteAccount = function(account) {

      Account.deleteAccount(account._id)
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

  .controller('AdminCarCtrl', function ($scope, $location, Car) {

    $scope.car = {};

    Car.getCars()
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

      Car.deleteCar(car._id)
      .then(function() {
        angular.forEach($scope.cars, function(c, i) {
          if (c === car) {
            $scope.cars.splice(i, 1);
          }
        });
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    };   
  })

  .controller('AdminCarEditCtrl', function ($scope, $location, $routeParams, Car) {
    
    $scope.modus = "Edit";
    $scope.car = {};

    Car.getCar($routeParams.id)
    .then(function(car) {
      $scope.car = car;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    $scope.createCar = function() {
      Car.patchCar($scope.car)
      .then(function() {
        $location.path("/admin/car");
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    }
  })

  .controller('AdminCarAddCtrl', function ($scope, $location, Car) {
    $scope.modus = "Add";
    $scope.car = {};

    $scope.createCar = function() {
      Car.postCar($scope.car)
      .then(function() {
        $location.path("/admin/car");
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    }
  });
