'use strict';

angular.module('fahrtenbuchApp')

	/**
	 * /trip
	 * trip overview 
	**/
	.controller('TripCtrl', function ($scope, $http, socket, $location, Stay, Trip) {
	
		// get trips
		$scope.trips = [];

		Trip.getTrips()
    .then(function(trips) {
    	$scope.trips = trips;
      $scope.trips.forEach(function(trip){
      	var stays = Stay.getDestinationsAsString(trip.stays);
      	trip.stays = stays;
      });
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
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
	.controller('CreateTripCtrl', function ($scope, $http, socket, $location, Auth, Trip) {

		// init
		$scope.hourStep = 1;
  	$scope.minuteStep = 5;

	 	$scope.accounts = [];
	 	$scope.cars = [];
	 	$scope.user = Auth.getCurrentUser();
	 	$scope.trip = {}; 

  	$scope.trip.origin_time = new Date();
		$scope.trip.destination_time = new Date();
	 	$scope.stays = [];
	 	$scope.stays.push({destination: '', client: '', destination_time: new Date()});
	 	
		Trip.getAccounts()
    .then(function(accounts) {
    	$scope.accounts = accounts;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

		Trip.getCars()
    .then(function(cars) {
    	$scope.cars = cars;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

		Trip.getDefaultCar()
    .then(function(defaultCar) {
    	$scope.trip.car = $scope.cars[defaultCar.__v];
    	$scope.trip.kilometer_start = defaultCar.mileage;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
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
		 * remove a stay to the form
		**/
		$scope.removeStay = function(stay) {
		  var index = $scope.stays.indexOf(stay);
  		$scope.stays.splice(index, 1);  
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

			console.log($scope.stays);

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
			// .then(function(test) {
			// 	$scope.trip.stays = stayIds;
			// 	$http.post('/api/trips', $scope.trip);
			// 	console.log(test);
			// });

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
	.controller('DetailTripCtrl', function ($scope, $routeParams, $location, Stay, Trip) {

		// init
		$scope.trip = {};
		$scope.destinations = "";

		// get trip from server
		Trip.getTrip($routeParams.id)
    .then(function(trip) {
			$scope.trip = trip;
  		$scope.destinations = Stay.getDestinationsAsString(trip.stays);
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    // redirect
    $scope.returnToOverview = function() {
			$location.path("/trip");
		};
	})
;