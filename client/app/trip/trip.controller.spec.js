'use strict';
/* global google */

/**
 * Test TripCtrl
 */
describe('Controller: TripCtrl', function () {

  beforeEach(module('fahrtenbuchApp'));
  var TripCtrl, $scope, $httpBackend, $location;

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _$location_) {
    
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $scope = $rootScope.$new();
    TripCtrl = $controller('TripCtrl', {
      $scope: $scope
    });
  }));

	it('call TripCtrl', inject(function() {
    $httpBackend.expectGET('/api/trips').respond([{stays: [{destination: 'test'}]}]);
    $httpBackend.flush();

    expect($scope.trips).toEqual([{stays: 'test'}]);
	}));

  it('test addTrip function', inject(function() {
    $scope.addTrip();
    expect($location.path()).toBe('/trip/new');
  }));
});

/**
 * Test CreateTripCtrl
 */
 describe('Controller: CreateTripCtrl', function () {

  var CreateTripCtrl, $scope, $httpBackend, $location;
  var stayWithOneElements, stayWithTwoElements, fakeResponse, cars, car, accounts;
  var user = {
    name: 'Test',
    defaultCar: 1
    // email, baseName, baseLat, baseLong, role
  };

  beforeEach(function () {
    module('fahrtenbuchApp');
    module(function($provide) {
      $provide.service('Auth', function() {
        this.getCurrentUser = jasmine.createSpy('getCurrentUser').andCallFake(function() {
          return user;
        });
      });
    });
  });

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _$location_) {
    
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $location = _$location_;
    fakeResponse = '';

    CreateTripCtrl = $controller('CreateTripCtrl', {
      $scope: $scope
    });

    stayWithOneElements = [{
      destination: '',
      // destinationLat: null,
      // destinationLong: null,
      client: '',
      destinationTime: new Date()
    }];

    stayWithTwoElements = [{
      destination: '',
      client: '',
      destinationTime: new Date()
    }, {
      destination: '',
      client: '',
      destinationTime: new Date()
    }];

    cars = [{_id: 1, __v: 0, mileage: 42}, {_id: 2, __v: 1, mileage: 123}];
    car = {_id: 1, __v: 0, mileage: 42};
    accounts = [{_id: 1, name: 'test'}];

    $httpBackend.expectGET('/api/accounts').respond(accounts);
    $httpBackend.expectGET('/api/cars').respond(cars);
    $httpBackend.expectGET('/api/cars/1').respond(car);
    $httpBackend.flush();
  }));

  it('call CreateTripCtrl', inject(function() {
    expect(angular.equals($scope.accounts, accounts)).toBe(true);
    expect(angular.equals($scope.cars, cars)).toBe(true);
    expect(angular.equals($scope.trip.car, car)).toBe(true);    
    expect(angular.equals($scope.user, user)).toBe(true);

    expect(angular.equals($scope.trip.kilometerStart, 42)).toBe(true);
    expect(angular.equals($scope.defaultCar, user.defaultCar)).toBe(true);
  }));

  it('test updateKilometerStart function', inject(function() {
    $scope.trip.car = {mileage: 333};
    $scope.updateKilometerStart();

    expect($scope.trip.kilometerStart).toBe(333);
  }));
  
  it('test addStay function', inject(function() {
    $scope.stays = stayWithOneElements;
    expect(angular.equals($scope.stays.length, 1)).toBe(true);
    
    $scope.addStay();
    expect(angular.equals($scope.stays.length, 2)).toBe(true);
  }));
  
  it('test removeStay function', inject(function() {
    $scope.stays = stayWithTwoElements;
    expect(angular.equals($scope.stays.length, 2)).toBe(true);

    $scope.removeStay($scope.stays[0]);
    expect(angular.equals($scope.stays.length, 1)).toBe(true);
  }));
 
  it('test addTrip function', inject(function() {

    $scope.user = {_id: 1, name: 'test'};
    $scope.trip.account = accounts[0];
    $scope.trip.car = cars[0];    

    var stays = [{_id: 1, destination: '', client: '', destinationTime: new Date('2015-05-30 10:00:00')}];
    $scope.stays = stays;
    $scope.trip.route = fakeResponse;

    $scope.addTrip();
    $httpBackend.expectPOST('/api/stays').respond(stays);
    $httpBackend.expectPOST('/api/trips').respond(fakeResponse);
    $httpBackend.expectPATCH('/api/cars/1').respond(fakeResponse);
    $httpBackend.flush();

    expect(angular.equals($scope.trip.user, 1)).toBe(true);
    expect(angular.equals($scope.trip.account, 1)).toBe(true);
    expect(angular.equals($scope.trip.car, 1)).toBe(true);
    expect($location.path()).toBe('/trip');
  }));
});

/**
 * Test DetailTripCtrl
 */
describe('Controller: DetailTripCtrl', function () {

  beforeEach(module('fahrtenbuchApp'));
  var DetailTripCtrl, $scope, $httpBackend, $location, testTrip;

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, $routeParams, _$location_) {
    
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $location = _$location_;

    DetailTripCtrl = $controller('DetailTripCtrl', {
      $scope: $scope,
      $routeParams: {id: 1}
    });
    testTrip = {_id: 1, stays: [{destination: 'test'}]};
  }));

  it('should get trip with destinations', inject(function() {

    $httpBackend.expectGET('/api/trips/' + testTrip._id).respond(testTrip);
    $httpBackend.flush();

    expect($scope.trip).toEqual(testTrip);
    expect($scope.destinations).toEqual('test');
  }));

  it('test returnToOverview function', inject(function() {
    $scope.returnToOverview();
    expect($location.path()).toBe('/trip');
  }));
});

// @todo
// $scope.$storage.trip, $scope.$storage.stays
// getPosition
// startWatchPosition
// stopWatchPosition
// with trips or without