'use strict';
/* global google */

angular.module('fahrtenbuchApp')

	/**
	 * /trip
	 * Trip overview 
	**/
	.controller('TripCtrl', function ($scope, $location, Stay, Trip) {
	
		$scope.trips = [];

		Trip.getTrips()
    .then(function(trips) {
    	$scope.trips = trips;
    	// stays get replaced by a label consisting of destinations of a stay
      $scope.trips.forEach(function(trip){
      	trip.stays  = Stay.getDestinationsAsString(trip.stays);
      });
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    // redirect to create trip controller
		$scope.addTrip = function() {
			$location.path('/trip/new');
		};	
	})	

	/**
	 * /trip/new
	 * Create new trip
	**/
	.controller('CreateTripCtrl', function ($scope, $q, $location, $localStorage, Account, Car, Stay, Trip, Coordinate, Auth, Location, Geocode, Directions, config) {

		/**
		 * Start initialize variables
		**/

		// steps for datetimepicker
		$scope.hourStep = 1;
  	$scope.minuteStep = 5;
  	// display recording the route has not started yet
	 	$scope.recordingStatus = 'stopped'; 
  	// general error displayed in the view
    $scope.errors = {};
    $scope.saveRoute = false;

    // initialize local storage
    $scope.$storage = $localStorage;

    // get currently logged in user and his default car
		$scope.user = Auth.getCurrentUser();
	 	$scope.defaultCar = $scope.user.defaultCar;

	 	$scope.accounts = [];
	 	$scope.cars = [];
	 	$scope.trip = {};
	 	$scope.route = [];

		// initialize dates in datetimepicker
  	$scope.trip.originTime = new Date();
		$scope.trip.destinationTime = new Date();

		// adds one empty stay to view
	 	$scope.stays = [];
	 	$scope.stays.push({destination: '', client: '', destinationTime: new Date()});

	 	// get user's base
	 	var base;
	 	if ($scope.user.baseLat && $scope.user.baseLong) {
	 		base = new google.maps.LatLng($scope.user.baseLat, $scope.user.baseLong);
	 	} 
	 	// if the user has no base, set the coordinates to "Rathaus Augsburg"
	 	else {
	 		base = new google.maps.LatLng(48.368801, 10.898653);
	 	}

	 	// use default options and base to initialize google map
	 	var mapOptions = config.defaultMapOptions;
	 	mapOptions.center = base;
	 	var map = new google.maps.Map(document.getElementById('mapContainer'), config.defaultMapOptions);

		/**
		 * End initialize variables
		**/

		// get accounts
		Account.getAccounts()
    .then(function(accounts) {
    	$scope.accounts = accounts;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

		// get cars
		Car.getCars()
    .then(function(cars) {
    	$scope.cars = cars;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

		// get the user's default car
		Car.getCar($scope.defaultCar)
    .then(function(defaultCar) {
    	$scope.trip.car = $scope.cars[defaultCar.__v];
    	$scope.trip.kilometerStart = defaultCar.mileage;
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    // when there is local storage data, apply it
    if ($scope.$storage.trip !== null && $scope.$storage.trip !== undefined && $scope.$storage.stays !== undefined && $scope.$storage.stays !== null) {
		  $scope.trip = $scope.$storage.trip;
		  $scope.stays = $scope.$storage.stays;
		}

		// as soon as something in the trip or stays variables changes, it get saved in the local storage
		// this is necessary to prevent data loss
	 	$scope.$watchCollection('trip', function() {
	 		$scope.$storage.trip = $scope.trip;
		});

 		$scope.$watchCollection('stays', function() {
	 		$scope.$storage.stays = $scope.stays;
		});

 		// localize the current position and address, and add it to stay
		$scope.getPosition = function(stay) {
			Location.getCurrentPosition()
	    .then(function(position) {
	    	stay.destinationLat = position.latitude;
	    	stay.destinationLong = position.longitude;
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

		// start recording the route
		$scope.startWatchPosition = function() {
			Location.watchPosition();
			$scope.recordingStatus = 'started';
		};

		// stop recording the route and display it on the map
		$scope.stopWatchPosition = function() {
			Location.clearWatch()
			.then(function(positions) {
				Directions.polygons(null, positions, map);
				$scope.route = positions;
				$scope.recordingStatus = 'stopped';
			})
	    .catch(function(err) {
      	$scope.errors.other = err.message;
    	});
		};

		// update kilometer start when car changed
		$scope.updateKilometerStart = function() {
			$scope.trip.kilometerStart = $scope.trip.car.mileage;
		};

		// add a empty stay to the form
		$scope.addStay = function() {
			$scope.stays.push({destination: '', client: '', destinationTime: new Date()});
		};

		// remove a stay from the form
		$scope.removeStay = function(stay) {
		  var index = $scope.stays.indexOf(stay);
  		$scope.stays.splice(index, 1);  
		};

		/**
		 * Start save data
		**/
		$scope.addTrip = function() {

			var promises = [];
			var count = 0;

			// save all associated stays to database
			if ($scope.stays !== null) {
				$scope.stays.forEach(function(stay) {
					var promise = Stay.postStay(stay)
				  .catch(function(err) {
				    $scope.errors.other = err.message;
				  });
					promises.push(promise);
					count ++;
				});
			}

			// save all associated positions to database
			if ($scope.route !== null && $scope.saveRoute !== false) {
    		var currentPromises = [];
				$scope.route.forEach(function(position) {
					var coordinate = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					};
					var currentPromise = Coordinate.postCoordinate(coordinate)
				  .catch(function(err) {
				    $scope.errors.other = err.message;
				  });
					promises.push(currentPromise);
				});
			}

			$q.all(promises)
			.then(function(data) {

				// add stays to trip
				var stayIds = [];
				for (var i = 0; i<count; i++) {
					stayIds.push(data[i]._id);
				}
				$scope.trip.stays = stayIds;

				// add positions to trip
				var positionIds = [];
				for (var j = count + 1; j<data.length; j++) {
					positionIds.push(data[j]._id);
				}
				$scope.trip.route = positionIds;

				// add car, account and user to trip
	    	$scope.trip.user = $scope.user._id;
	    	var car = $scope.trip.car;
	    	$scope.trip.car = $scope.trip.car._id;

	    	if ($scope.trip.account === undefined) {
	    		$scope.trip.account = null;
	    	} else {
	    		$scope.trip.account = $scope.trip.account._id;
	    	}

				// save trip in database
				Trip.postTrip($scope.trip)
		    .then(function() {

		    	// update mileage in used car
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
	 * End save data
	**/

	/**
	 * show trip details
	**/
	.controller('DetailTripCtrl', function ($scope, $routeParams, $location, Stay, Trip, Auth, Directions, config) {

		$scope.trip = {};
		$scope.destinations = '';
    $scope.user = Auth.getCurrentUser();
    $scope.errors = {};

		Trip.getTrip($routeParams.id)
    .then(function(trip) {
			$scope.trip = trip;
    	// the description of the trip consists of all destinations of a stay
  		$scope.destinations = Stay.getDestinationsAsString(trip.stays);

  		var base;
		 	if ($scope.user.baseLat && $scope.user.baseLong) {
		 		base = new google.maps.LatLng($scope.user.baseLat, $scope.user.baseLong);
		 	} 
		 	// if the user has no base, set the coordinates to "Rathaus Augsburg"
		 	else {
		 		base = new google.maps.LatLng(48.368801, 10.898653);
		 	}

		 	// use default options and base to initialize google map
		 	var mapOptions = config.defaultMapOptions;
		 	mapOptions.center = base;
		 	var map = new google.maps.Map(document.getElementById('mapContainer'), config.defaultMapOptions);
			
			if ($scope.trip.route !== []) {
				Directions.polygons(null, $scope.trip.route, map);
			}

			for (var i = 0; i < $scope.trip.stays.length; i++) {
				var lat = $scope.trip.stays[i].destinationLat;
				var lng = $scope.trip.stays[i].destinationLong;
				if (lat && lng) {
					new google.maps.Marker({
				    position: new google.maps.LatLng(lat, lng),
				    map: map
	  			});
				}
			}
    })
    .catch(function(err) {
      $scope.errors.other = err.message;
    });

    // redirect to trip overview
    $scope.returnToOverview = function() {
			$location.path('/trip');
		};
	})
;