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



