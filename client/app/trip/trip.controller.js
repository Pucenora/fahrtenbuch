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
	.controller('CreateTripCtrl', function ($scope, $q, $location, $localStorage, Account, Car, Stay, Trip, Auth, Location, Geocode, Directions, config) {

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
	 	$scope.recordingStatus = 'stopped'; // or started

	 	var base = new google.maps.LatLng($scope.user.baseLat, $scope.user.baseLong);
	 	var mapOptions = config.defaultMapOptions
	 	mapOptions.center = base;
	 	var map = new google.maps.Map(document.getElementById('mapContainer'), config.defaultMapOptions);

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

		$scope.getPosition = function(stay) {
			Location.getCurrentPosition()
	    .then(function(position) {
	    	stay.destinationLat = position.latitude
	    	stay.destinationLong = position.longitude
	    	Geocode.reverseGeocode(null, position)
		    .then(function(locationName) {
		    	stay.destination = locationName;
		    })
		    .catch(function(err) {
	      	$scope.errors.other = err.message;
	    	});
	    })
	    .catch(function(err) {
	      $scope.errors.other = err.message;
	    });
		};

		$scope.startWatchPosition = function() {
			Location.watchPosition();
			$scope.recordingStatus = 'started'
		};

		$scope.stopWatchPosition = function() {
			Location.clearWatch()
			.then(function(positions) {

				var waypoints = [];
				for (var i = 0; i < positions.length; i++) {
					waypoints.push(new google.maps.LatLng(positions[i].coords.latitude, positions[i].coords.longitude));
				}
			// 	Directions.getRoute(null, waypoints, $scope.stays, map)
			// 	.then(function(results) {
			// 		console.log(results);
			// 		$scope.recordingStatus = 'stopped'
			// 	})
			// 	.catch(function(err) {
			// 	  $scope.errors.other = err.message;
			// 	});
			// })

				Directions.polygons(null, waypoints, map);
				$scope.recordingStatus = 'stopped';
			})

	    .catch(function(err) {
      	$scope.errors.other = err.message;
    	});
		};

		/**
		 * sync kilometer start to car
		**/
		$scope.sync = function() {
			$scope.trip.kilometerStart = $scope.trip.car.mileage;
		};

		/**
		 * sync form when private
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