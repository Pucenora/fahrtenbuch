'use strict';
/* global google */

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
      	trip.stays  = Stay.getDestinationsAsString(trip.stays);
      });
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    // redirect
		$scope.addTrip = function() {
			$location.path('/trip/new');
		};	
	})	

	/**
	 * /trip/new
	 * create new trip
	**/
	.controller('CreateTripCtrl', function ($scope, $q, $location, $localStorage, Auth, Account, Car, Stay, Trip) {

		// init
		$scope.hourStep = 1;
  	$scope.minuteStep = 5;
    $scope.errors = {};
    $scope.$storage = $localStorage;

	 	$scope.accounts = [];
	 	$scope.cars = [];
	 	$scope.user = Auth.getCurrentUser();
	 	$scope.defaultCar = $scope.user.defaultCar;
	 	$scope.trip = {}; 

  	$scope.trip.originTime = new Date();
		$scope.trip.destinationTime = new Date();
	 	$scope.stays = [];
	 	$scope.stays.push({destination: '', client: '', destinationTime: new Date()});

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

		Car.getCar($scope.defaultCar)
    .then(function(defaultCar) {
    	$scope.trip.car = $scope.cars[defaultCar.__v];
    	$scope.trip.kilometerStart = defaultCar.mileage;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    if ($scope.$storage.trip !== null && $scope.$storage.trip !== undefined && $scope.$storage.stays !== undefined && $scope.$storage.stays !== null) {
		  $scope.trip = $scope.$storage.trip;
		  $scope.stays = $scope.$storage.stays;
		}

	 	$scope.$watchCollection('trip', function() {
	 		$scope.$storage.trip = $scope.trip;
		});

 		$scope.$watchCollection('stays', function() {
	 		$scope.$storage.stays = $scope.stays;
		});

		/**
		 * sync kilometer start to car
		**/
		$scope.sync = function() {
			$scope.trip.kilometerStart = $scope.trip.car.mileage;
		};

		/**
		 * sync form when private .... 
		**/
		$scope.sync2 = function() {
			$scope.stays = [];
		};

		/**
		 * add a stay to the form
		**/
		$scope.addStay = function() {
			$scope.stays.push({destination: '', client: '', destinationTime: new Date()});
		};

		/**
		 * remove a stay to the form
		**/
		$scope.removeStay = function(stay) {
		  var index = $scope.stays.indexOf(stay);
  		$scope.stays.splice(index, 1);  
		};

		/**
		 * get Position and Geocode
		**/
		function success(pos) {
		  var crd = pos.coords;

		  console.log('Your current position is:');
		  console.log('Latitude : ' + crd.latitude);
		  console.log('Longitude: ' + crd.longitude);
		  console.log('More or less ' + crd.accuracy + ' meters.');

		  //
		  if (crd.accuracy > 10) {
		  	$scope.errors.other = 'Warning result is inaccurate';
		  }

			var Geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(crd.latitude, crd.longitude);
		  Geocoder.geocode({'latLng': latlng}, function(results, status) {
		  	if (status === google.maps.GeocoderStatus.OK) {
		  		console.log(results[0].formattedAddress);
		  		$scope.stays[0].destination = results[0].formattedAddress;
		  	} else {
		  		console.log('Geocoding your location failed');
		  	}
		  });
		}

		function error(err) {
		  console.warn('ERROR(' + err.code + '): ' + err.message);
		}

		$scope.getPosition = function() {
		  var options = {
			  enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
			};

			navigator.geolocation.getCurrentPosition(success, error, options);
		};

		/**
		 * post trip to server
		**/
		$scope.addTrip = function() {

			var promises = [];

			if ($scope.stays !== null) {
				$scope.stays.forEach(function(stay) {
					var promise = Stay.postStay(stay)
				  .catch(function(err) {
				    $scope.errors.other = err.message;
				  });
					promises.push(promise);
				});
			}

			$q.all(promises)
			.then(function(stays) {

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

		    	car.mileage = $scope.trip.kilometerEnd;
		    	
					Car.patchCar(car)
			    .then(function() {
			    	$scope.$storage.trip = null;
			    	$scope.$storage.stays = null;
			    	$location.path('/trip');
			    })
			    .catch(function(err) {
			      $scope.errors.other = err.message;
			    });
		    })
		    .catch(function(err) {
		      $scope.errors.other = err.message;
		    });
			});
		};
	})

	/**
	 * show details of a trip
	**/
	.controller('DetailTripCtrl', function ($scope, $routeParams, $location, Stay, Trip) {

		// init
		$scope.trip = {};
		$scope.destinations = '';

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
			$location.path('/trip');
		};
	})
;