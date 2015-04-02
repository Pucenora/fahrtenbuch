'use strict';

angular.module('fahrtenbuchApp').controller('TripCtrl', function ($scope, $http, socket) {

  $scope.items = [
    'Sparda',
    'Dresdner',
    'Sparkasse'
  ];

});
