'use strict';

angular.module('fahrtenbuchApp').controller('TripCtrl', function ($scope, $http, socket) {

  $scope.items = [
    'Sparda',
    'Dresdner',
    'Sparkasse'
  ];

	$scope.addThing = function() {
		console.log($scope.origin);

		// @todo validation

	  if($scope.corporate == true) {
	  	$scope.kind = 'corporate';
	  } else {
	  	$scope.kind = 'noncorporate';
	  }

	  $http.post('/api/trip', { 
	  	driver: $scope.driver,
	  	car: $scope.car,
	  	type: $scope.kind,
	  	account: $scope.account,
	  	kilometer_start: $scope.kilometer_start,
	  	kilometer_end: $scope.kilometer_end,
	  	kilometer: $scope.kilometer,
	  	origin: $scope.origin,
	  	origin_time: $scope.origin_time,
	  	destination: $scope.destination,
	  	destination_time: $scope.destination_time,
	  });

	  // @todo redirect
	};
});
