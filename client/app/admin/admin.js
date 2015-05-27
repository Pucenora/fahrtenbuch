'use strict';

angular.module('fahrtenbuchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/admin/user', {
        templateUrl: 'app/admin/admin.user.html',
        controller: 'AdminUserCtrl'
      })
      .when('/admin/account', {
        templateUrl: 'app/admin/admin.account.html',
        controller: 'AdminAccountCtrl'
      })
      .when('/admin/car', {
        templateUrl: 'app/admin/admin.car.html',
        controller: 'AdminCarCtrl'
      })
      .when('/admin/car/new', {
        templateUrl: 'app/admin/admin.car.create.html',
        controller: 'AdminCarAddCtrl'
      })
      .when('/admin/car/:id', {
        templateUrl: 'app/admin/admin.car.create.html',
        controller: 'AdminCarEditCtrl'
      });
  });