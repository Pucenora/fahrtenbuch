'use strict';

angular.module('fahrtenbuchApp')

	.controller('TripCtrl', function ($scope, $http, socket, $location) {
	
	$scope.trips = [];

    $http.get('/api/trips').success(function(trips) {
      $scope.trips = trips;
      // console.log(trips[0].__v);
      socket.syncUpdates('trip', $scope.trips);
    });

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

		var json_data = JSON.stringify($scope.trip);

		$http.post('/api/trips', json_data);

		// redirect
		$location.path("/trip");

	  // if($scope.corporate == true) {
	  // 	$scope.type = 'corporate';
	  // } else {
	  // 	$scope.type = 'noncorporate';
	  // }

		// type, account
		};
	})

	.controller('DetailTripCtrl', function ($scope, $http, $routeParams, socket) {

		$scope.trip = {};

		var myURL = '/api/trips/' + $routeParams.id;
		console.log(myURL);

    $http.get(myURL).success(function(trip) {
      $scope.trip = trip;
      console.log(trip);
      socket.syncUpdates('trip', $scope.trip);
    });

	})
;