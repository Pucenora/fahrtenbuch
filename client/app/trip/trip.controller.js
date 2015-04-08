'use strict';

angular.module('fahrtenbuchApp')

	.controller('CreateTripCtrl', function ($scope, $http, socket) {

	  $scope.items = [
	    'Sparda',
	    'Dresdner',
	    'Sparkasse'
	  ];

		$scope.addThing = function() {

			// @todo validation

			//
			$http.post('/api/trip', { 
		  	title: 'Test'
	  	});

		  // if($scope.corporate == true) {
		  // 	$scope.type = 'corporate';
		  // } else {
		  // 	$scope.type = 'noncorporate';
		  // }

		  // $http.post('/api/trip', { 
		  // 	title: $scope.title,
		  // 	driver: $scope.driver,
		  // 	car: $scope.car,
		  // 	type: $scope.type,
		  // 	account: $scope.account,
		  // 	client: $scope.client,
		  // 	kilometer_start: $scope.kilometer_start,
		  // 	kilometer_end: $scope.kilometer_end,
		  // 	kilometer: $scope.kilometer,
		  // 	origin: $scope.origin,
		  // 	origin_time: $scope.origin_time,
		  // 	destination: $scope.destination,
		  // 	destination_time: $scope.destination_time,
		  // });

		  // @todo redirect
		};
	})

	.controller('TripCtrl', function ($scope, $http, socket) {
	
		// @todo

	})	

	.controller('DetailTripCtrl', function ($scope, $http, socket) {

		$scope.trip = { 
	  	title: 'BMW München',
	  	driver: 'Adam Außendienstmitarbeiter',
	  	car: 'BMW #6',
	  	type: 'geschäftlich',
	  	account: 'Sparda',
	  	client: 'BMW',
	  	kilometer_start: '2000',
	  	kilometer_end: '2100',
	  	kilometer: '100',
	  	origin: 'Ulm',
	  	origin_time: new Date(),
	  	destination: 'München',
	  	destination_time: '11:00 Uhr',
	  };
	})
;