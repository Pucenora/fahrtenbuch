'use strict';

describe('Controller: TripCtrl', function () {

  // load the controller's module
  beforeEach(module('fahrtenbuchApp'));
  var TripCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    TripCtrl = $controller('TripCtrl', {
      $scope: scope
    });
  }));

	it('should get trips', inject(function() {

    $httpBackend.expectGET('/api/trips').respond([{stays: [{destination: "test"}]}]);
    $httpBackend.flush();

    expect(scope.trips).toEqual([{stays: "test"}]);
	}));
});

// @todo CreateTripCtrl

describe('Controller: DetailTripCtrl', function () {

  // load the controller's module
  beforeEach(module('fahrtenbuchApp'));
  var DetailTripCtrl, scope, $httpBackend, testTrip;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, $routeParams) {
    
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    DetailTripCtrl = $controller('DetailTripCtrl', {
      $scope: scope,
      $routeParams: {id: 12345678}
    });
    testTrip = {_id: 12345678, stays: [{destination: "test"}]};
  }));

  it('should get trip with destinations', inject(function() {

    $httpBackend.expectGET('/api/trips/' + testTrip._id).respond(testTrip);
    $httpBackend.flush();

    expect(scope.trip).toEqual({_id: 12345678, stays: [{destination: "test"}]});
    expect(scope.destinations).toEqual("test");
  }));
});




