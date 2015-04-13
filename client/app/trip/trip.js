'use strict';

angular.module('fahrtenbuchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/trip', {
        templateUrl: 'app/trip/trip.html',
        controller: 'TripCtrl'
      })
      .when('/trip/new', {
        templateUrl: 'app/trip/trip.create.html',
        controller: 'CreateTripCtrl'
      })
      .when('/trip/:id', {
        templateUrl: 'app/trip/trip.detail.html',
        controller: 'DetailTripCtrl'
      });
  });