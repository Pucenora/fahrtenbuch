'use strict';

angular.module('fahrtenbuchApp')

	.controller('TripCtrl', function ($scope, $http, socket, $location) {
	
	$scope.trips = [];

    $http.get('/api/trips').success(function(trips) {
      $scope.trips = trips;
    });

		$scope.addTrip = function() {
			$location.path("/trip/new");
		}	
	})	

	.controller('CreateTripCtrl', function ($scope, $http, socket, $location, Auth) {

		$scope.hourStep = 1;
  	$scope.minuteStep = 5;

	 	$scope.accounts = [];
	 	$scope.cars = [];
	 	$scope.user = Auth.getCurrentUser();
	 	$scope.trip = {}; 

	 	$scope.stays = [];
	 	$scope.stays.push({destination: '', client: '', destination_time: new Date()});

	  $http.get('/api/accounts').success(function(accounts) {
	    $scope.accounts = accounts;
		  // $scope.trip.account = $scope.accounts[0]; 
	  });

	  $http.get('/api/cars').success(function(cars) {
	    $scope.cars = cars;
	  });

	  var carURL = '/api/cars/' + $scope.user.default_car;

	  $http.get(carURL).success(function(car) {
		  // $scope.trip.car = car;
		  $scope.trip.car = $scope.cars[car.__v];
		  $scope.trip.kilometer_start = car.mileage;
	  });

	  $scope.trip.origin_time = new Date();
		$scope.trip.destination_time = new Date();

		// var Geocoder = new google.maps.Geocoder();

		$scope.addStay = function() {
			$scope.stays.push({destination: '', client: '', destination_time: new Date()});
		};

		$scope.addTrip = function() {

			if($scope.trip.account) {
				$scope.trip.account = $scope.trip.account._id;
			}
			$scope.trip.car = $scope.trip.car._id;
			$scope.trip.user = $scope.user._id;
			$scope.trip.timestamp = new Date();
			$http.post('/api/trips', $scope.trip);

			// redirect
			$location.path("/trip");
		};

		$scope.showPosition = function(position) {
	    console.log("Latitude: " + position.coords.latitude);
	    console.log("Longitude: " + position.coords.longitude);
		}

		$scope.startWatching = function() {
	    if (navigator.geolocation) {
	    		console.log(new Date());
	        // navigator.geolocation.watchPosition($scope.showPosition);
	        var latLngObject = navigator.geolocation.getCurrentPosition($scope.showPosition);
	        // console.log(Geocoder.geocode( { 'latLng': latLngObject }, callback));
	    } else {
	        console.log("Geolocation is not supported by this browser.");
	    }
		}

		$scope.stopWatching = function() {
			console.log(new Date());
			var latLngObject = navigator.geolocation.getCurrentPosition($scope.showPosition);
			// console.log(Geocoder.geocode( { 'latLng': latLngObject }, callback));
      // navigator.geolocation.clearWatch();
		}
	})

	.controller('DetailTripCtrl', function ($scope, $http, $routeParams, socket, $location) {

		$scope.trip = {};

		var tripURL = '/api/trips/' + $routeParams.id;

    $http.get(tripURL).success(function(trip) {
      $scope.trip = trip;
    });

    $scope.returnToOverview = function() {
			$location.path("/trip");
		};
	})
;