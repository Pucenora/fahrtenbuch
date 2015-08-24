'use strict';

angular.module('fahrtenbuchApp')

  /**
   * Admin Overview
  **/
  .controller('AdminCtrl', function () {
  })

  /**
   * Controllers of the account admin pages
  **/
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
      .then(function() {
        // reload so that the new account is shown
        $route.reload();
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    };

    $scope.deleteAccount = function(account) {

      // remove account from database
      Account.deleteAccount(account._id)
      // remove account from view
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

  /**
   * Controllers of the user admin pages
  **/
  .controller('AdminUserCtrl', function ($scope, $location, $http, User, Car) {

    $scope.users = [];

    // get users and their default car
    User.query().$promise
    .then(function(users) {
      angular.forEach(users, function(user, i) {
        Car.getCar(user.defaultCar)
        .then(function(car) {
          user.defaultCar = car.description;
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      });
      $scope.users = users;
    });

    $scope.deleteUser = function(user) {
      // remove user from database
      User.remove({ id: user._id });
      // remove user from view      
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  })

  /**
   * Controllers of the car admin pages
  **/
  .controller('AdminCarCtrl', function ($scope, $location, Car) {

    $scope.car = {};

    Car.getCars()
    .then(function(cars) {
      $scope.cars = cars;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    // redirect to admin car add controller
    $scope.addCar = function() {
      $location.path('/admin/car/new');
    };

    // redirect to admin car edit controller
    $scope.editCar = function(car) {
      var carURL = '/admin/car/' + car._id;
      $location.path(carURL);
    };

    $scope.deleteCar = function(car) {
      // remove car from database
      Car.deleteCar(car._id)
      // remove car from view
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

  .controller('AdminCarAddCtrl', function ($scope, $location, Car) {
    // modus in admin car create view
    $scope.modus = 'Add';
    $scope.car = {};

    $scope.createCar = function() {
      Car.postCar($scope.car)
      .then(function() {
        // redirect to admin car overview
        $location.path('/admin/car');
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    };
  })

  .controller('AdminCarEditCtrl', function ($scope, $location, $routeParams, Car) {
    // modus in admin car create view
    $scope.modus = 'Edit';
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
        // redirect to admin car overview
        $location.path('/admin/car');
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    };
  });
