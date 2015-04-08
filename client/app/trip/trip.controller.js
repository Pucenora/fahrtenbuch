'use strict';

angular.module('fahrtenbuchApp')

	.controller('TripCtrl', function ($scope, $http, socket, $location) {
	
		$scope.addTrip = function() {
			$location.path("/trip/new");
		}	

	})	

	.controller('CreateTripCtrl', function ($scope, $http, socket, $location) {

	  $scope.accounts = [
	    {name:'Sparda'},
	    {name:'Dresdner'},
	    {name:'Sparkasse'},
	  ];

	  $scope.trip = {};
	  $scope.trip.account = $scope.accounts[0];

		$scope.addTrip = function() {

			console.log($scope.trip);

			// var json_data = JSON.stringify($scope.trip);
			// console.log(json_data);

			// $http.post('/api/trip', json_data);

			// redirect
			// $location.path("/trip");

		  // if($scope.corporate == true) {
		  // 	$scope.type = 'corporate';
		  // } else {
		  // 	$scope.type = 'noncorporate';
		  // }

			// type, account
		};
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