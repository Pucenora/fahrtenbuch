'use strict';

angular.module('fahrtenbuchApp')

	.controller('TripCtrl', function ($scope, $http, socket, $location) {
	
	$scope.trips = [];

    $http.get('/api/trips').success(function(trips) {
      $scope.trips = trips;
      socket.syncUpdates('trip', $scope.trips);
    });

		$scope.addTrip = function() {
			$location.path("/trip/new");
		}	

	})	

	.controller('CreateTripCtrl', function ($scope, $http, socket, $location) {

		$scope.hourStep = 1;
  	$scope.minuteStep = 5;
	 	$scope.accounts = [];
	 	$scope.trip = {}; 

	  $http.get('/api/accounts').success(function(accounts) {
	    $scope.accounts = accounts;
		  $scope.trip.account = $scope.accounts[0]; 
	  });

	  $scope.trip.origin_time = new Date();
		$scope.trip.destination_time = new Date();

		// var Geocoder = new google.maps.Geocoder();

		$scope.addTrip = function() {

			//
			$scope.trip.account = $scope.trip.account._id;
			
			var json_data = JSON.stringify($scope.trip);
			$http.post('/api/trips', json_data);

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
		console.log(tripURL);

    $http.get(tripURL).success(function(trip) {
      $scope.trip = trip;
      console.log(trip);
      socket.syncUpdates('trip', $scope.trip);
    });

    $scope.returnToOverview = function() {
			$location.path("/trip");
		};
	})

  // .directive('reverseGeocode', function () {
  //     return {
  //         restrict: 'E',
  //         template: '<div></div>',
  //         link: function (scope, element, attrs) {
  //             var geocoder = new google.maps.Geocoder();
  //             var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
  //             geocoder.geocode({ 'latLng': latlng }, function (results, status) {
  //                 if (status == google.maps.GeocoderStatus.OK) {
  //                     if (results[1]) {
  //                         element.text(results[1].formatted_address);
  //                     } else {
  //                         element.text('Location not found');
  //                     }
  //                 } else {
  //                     element.text('Geocoder failed due to: ' + status);
  //                 }
  //             });
  //         },
  //         replace: true
  //     }
  // })
;