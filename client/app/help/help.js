'use strict';

angular.module('fahrtenbuchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/help', {
        templateUrl: 'app/help/help.html',
        controller: 'HelpCtrl'
      });
  });