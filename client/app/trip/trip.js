'use strict';

angular.module('fahrtenbuchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/trip', {
        templateUrl: 'app/trip/trip.html',
        controller: 'TripCtrl'
      });
  });