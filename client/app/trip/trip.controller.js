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

	  $scope.accounts = [
	    {name:'Sparda'},
	    {name:'Dresdner'},
	    {name:'Sparkasse'},
	  ];

	  $scope.hourStep = 1;
  	$scope.minuteStep = 15;

	  $scope.trip = {};
	  
	  $scope.trip.account = $scope.accounts[0]; 
		$scope.trip.origin_time = new Date();
		$scope.trip.destination_time = new Date();


		$scope.addTrip = function() {

			$scope.trip.account = $scope.trip.account.name;
			
			var json_data = JSON.stringify($scope.trip);
			$http.post('/api/trips', json_data);

			// redirect
			$location.path("/trip");
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

    $scope.returnToOverview = function() {
			$location.path("/trip");
		};
	})

	.directive('datetimez', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          element.datetimepicker({           
           language: 'en',
           pickDate: false,          
          }).on('changeDate', function(e) {
            ngModelCtrl.$setViewValue(e.date);
            scope.$apply();
          });
        }
    };
	})
;