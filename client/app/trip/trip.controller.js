'use strict';

angular.module('fahrtenbuchApp')

	/**
	 * /trip
	 * trip overview 
	**/
	.controller('TripCtrl', function ($scope, $http, socket, $location) {
	
		// get trips
		$scope.trips = [];
    $http.get('/api/trips').success(function(trips) {
      $scope.trips = trips;
    });

    // redirect
		$scope.addTrip = function() {
			$location.path("/trip/new");
		}	
	})	

	/**
	 * /trip/new
	 * create new trip
	**/
	.controller('CreateTripCtrl', function ($scope, $http, socket, $location, Auth) {

		// init
		$scope.hourStep = 1;
  	$scope.minuteStep = 5;
  	$scope.trip.origin_time = new Date();
		$scope.trip.destination_time = new Date();

	 	$scope.accounts = [];
	 	$scope.cars = [];
	 	$scope.user = Auth.getCurrentUser();
	 	$scope.trip = {}; 

	 	$scope.stays = [];
	 	$scope.stays.push({destination: '', client: '', destination_time: new Date()});

	 	// get data
	  $http.get('/api/accounts').success(function(accounts) {
	    $scope.accounts = accounts;
	  });

	  $http.get('/api/cars').success(function(cars) {
	    $scope.cars = cars;
	  });

	  var carURL = '/api/cars/' + $scope.user.default_car;

	  $http.get(carURL).success(function(car) {
		  $scope.trip.car = $scope.cars[car.__v];
		  $scope.trip.kilometer_start = car.mileage;
	  });

	  // @todo
		// var Geocoder = new google.maps.Geocoder();

		/**
		 * add a stay to the form
		**/
		$scope.addStay = function() {
			$scope.stays.push({destination: '', client: '', destination_time: new Date()});
		};

		/**
		 * post trip to server
		**/
		$scope.addTrip = function() {

			// init
			var stayIds = [];
			var len = $scope.stays.length;
			var counter = 0;

			// add object ids to trip and post trip
			if($scope.trip.account) {
				$scope.trip.account = $scope.trip.account._id;
			}
			$scope.trip.car = $scope.trip.car._id;
			$scope.trip.user = $scope.user._id;
			$scope.trip.timestamp = new Date();

			$scope.stays.forEach(function(stay) {
				$http.post('/api/stays', stay).success(function(data, status, headers, config) {		
  				stayIds.push(data._id);
  				counter += 1;
  				if (counter === len) {
  					$scope.trip.stays = stayIds;
						$http.post('/api/trips', $scope.trip);	
  				}
 				}).error(function(data, status, headers, config) {
 					console.log(status);
			  });
			});

			// redirect
			$location.path("/trip");
		};

		/**
		 * @todo
		 * log lat und lng
		**/
		$scope.showPosition = function(position) {
	    console.log("Latitude: " + position.coords.latitude);
	    console.log("Longitude: " + position.coords.longitude);
		}

		/**
		 * @todo
		 * start getting location
		**/
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

		/**
		 * @todo
		 * stop getting location
		**/
		$scope.stopWatching = function() {
			console.log(new Date());
			var latLngObject = navigator.geolocation.getCurrentPosition($scope.showPosition);
			// console.log(Geocoder.geocode( { 'latLng': latLngObject }, callback));
      // navigator.geolocation.clearWatch();
		}
	})

	/**
	 * show details of a trip
	**/
	.controller('DetailTripCtrl', function ($scope, $http, $routeParams, socket, $location) {

		// init
		$scope.trip = {};

		// get trip from server
		var tripURL = '/api/trips/' + $routeParams.id;
    $http.get(tripURL).success(function(trip) {
      $scope.trip = trip;
    });

    // redirect
    $scope.returnToOverview = function() {
			$location.path("/trip");
		};
	})
;