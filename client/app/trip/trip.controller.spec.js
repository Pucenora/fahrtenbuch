'use strict';

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

  beforeEach(module('fahrtenbuchApp'));
  var CreateTripCtrl, $scope, $httpBackend, $location, stayWithOneElements, stayWithTwoElements;

  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, _$location_) {
    
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $location = _$location_;

    CreateTripCtrl = $controller('CreateTripCtrl', {
      $scope: $scope
    });

    stayWithOneElements = [{
      destination: '',
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

  }));

  it('call CreateTripCtrl', inject(function() {

    $httpBackend.expectGET('/api/accounts').respond([{stays: [{destination: 'test'}]}]);
    $httpBackend.expectGET('/api/cars').respond([{stays: [{destination: 'test'}]}]);
    // @todo
    $httpBackend.expectGET('/api/cars/undefined').respond([{stays: [{destination: 'test'}]}]);
    $httpBackend.flush();

    // @todo
    // console.log($scope.accounts);
    // console.log($scope.cars);
    // console.log($scope.trip.car);
    // console.log($scope.trip.kilometerStart);
  }));

  it('test sync function', inject(function() {
    $scope.trip.car = {mileage: 42};
    $scope.sync();

    expect($scope.trip.kilometerStart).toBe(42);
  }));
  
  it('test addStay function', inject(function() {
    $scope.stays = stayWithOneElements;
    $scope.addStay();

    // expect($scope.stays).toEqual(stayWithTwoElements);
    expect(angular.equals($scope.stays, stayWithTwoElements)).toBe(true);
  }));
  
  it('test removeStay function', inject(function() {
    $scope.stays = stayWithTwoElements;
    $scope.removeStay($scope.stays[0]);

    // expect($scope.stays).toEqual(stayWithOneElements);
    expect(angular.equals($scope.stays, stayWithOneElements)).toBe(true);
  }));
 
  // @todo 
  // it('test addTrip function', inject(function() {

  //   $httpBackend.expectGET('/api/accounts').respond([{stays: [{destination: "test"}]}]);
  //   $httpBackend.expectGET('/api/cars').respond([{stays: [{destination: "test"}]}]);
  //   // !!!
  //   $httpBackend.expectGET('/api/cars/undefined').respond([{stays: [{destination: "test"}]}]);
  //   $httpBackend.flush();

  //   $scope.stays = stayWithTwoElements;
  //   $httpBackend.expectPOST('/api/stays').respond([{stays: [{destination: "test"}]}]);
  //   $httpBackend.expectPOST('/api/stays').respond([{stays: [{destination: "test"}]}]);
  //   $httpBackend.flush();
  // }));
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

    expect($scope.trip).toEqual({_id: 1, stays: [{destination: 'test'}]});
    expect($scope.destinations).toEqual('test');
  }));

  it('test returnToOverview function', inject(function() {
    $scope.returnToOverview();
    expect($location.path()).toBe('/trip');
  }));
});




