'use strict';

angular.module('fahrtenbuchApp')

	/**
	 * /trip
	 * trip overview 
	**/
	.controller('TripCtrl', function ($scope, $location, Stay, Trip) {
	
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
	.controller('CreateTripCtrl', function ($scope, $q, $location, Auth, Account, Car, Stay, Trip) {

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
	 	
		Account.getAccounts()
    .then(function(accounts) {
    	$scope.accounts = accounts;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

		Car.getCars()
    .then(function(cars) {
    	$scope.cars = cars;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

		Car.getCar(Auth.getCurrentUser().default_car)
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
		 * sync kilometer start to car
		**/
		$scope.sync = function() {
			// console.log("clicked");
			$scope.trip.kilometer_start = $scope.trip.car.mileage;
		};

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
		$scope.addTrip = function(form) {

			if(form.$valid) {

				var promises = [];

				$scope.stays.forEach(function(stay) {
					var promise = Stay.postStay(stay)
				  .catch(function(err) {
				    $scope.errors.other = err.message;
				  });
					promises.push(promise);
				});

				$q.all(promises).
				then(function(stays) {

					var stayIds = [];
					stays.forEach(function(stay) {
						stayIds.push(stay._id);
					});
		    	var car = $scope.trip.car;

		    	$scope.trip.car = $scope.trip.car._id;
					$scope.trip.stays = stayIds;
		    	$scope.trip.account = $scope.trip.account._id;
		    	$scope.trip.user = $scope.user._id;

					Trip.postTrip($scope.trip)
			    .then(function() {

			    	car.mileage = $scope.trip.kilometer_end;
			    	
						Car.patchCar(car)
				    .then(function() {
				    	$location.path("/trip");
				    })
				    .catch(function(err) {
				      $scope.errors.other = err.message;
				    });
			    })
			    .catch(function(err) {
			      $scope.errors.other = err.message;
			    });
				});
			}
		};

		/**
		 * @todo
		 * log lat und lng
		**/
		$scope.showPosition = function(position) {
	    console.log("Latitude: " + position.coords.latitude);
	    console.log("Longitude: " + position.coords.longitude);
		};

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
		};

		/**
		 * @todo
		 * stop getting location
		**/
		$scope.stopWatching = function() {
			console.log(new Date());
			var latLngObject = navigator.geolocation.getCurrentPosition($scope.showPosition);
			// console.log(Geocoder.geocode( { 'latLng': latLngObject }, callback));
      // navigator.geolocation.clearWatch();
		};
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