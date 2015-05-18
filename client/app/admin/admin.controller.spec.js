'use strict';

describe('Controller: AdminAccountCtrl', function () {

  // load the controller's module
  beforeEach(module('fahrtenbuchApp'));
  var AdminAccountCtrl, scope, $location, fakeFactory, q, deferred;

  beforeEach(function () {
    fakeFactory = {
      getAccounts: function () {
        deferred = q.defer();
        // Place the fake return object here
        deferred.resolve([{test: "test"}]);
        return deferred.promise;
      }
    };
    spyOn(fakeFactory, 'getAccounts').andCallThrough();
	});

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$location_, $q, Account) {

    scope = $rootScope.$new();
    q = $q;
    $location = _$location_;
    AdminAccountCtrl = $controller('AdminAccountCtrl', {
      $scope: scope,
      Account: fakeFactory
    });
    $location.path('/admin/account');
  }));

	it('Ensure that the method was invoked', function () {
	  // scope.$apply();
	  // $location.path('admin/account');
	  expect($location.path()).toBe('/admin/account');
	  scope.$apply();
	  expect(fakeFactory.getAccounts).toHaveBeenCalled();
	  expect(scope.accounts).toBeDefined();
	  expect(scope.accounts).toBe([{test: "test"}]);
	});

	// it('can do remote call', inject(function() {
	//   	scope.$apply();
	//     expect(scope.accounts).toBeDefined();
	//   }));
});

// describe('Controller: AdminUserCtrl', function () {

//   // load the controller's module
//   beforeEach(module('fahrtenbuchApp'));
//   var AdminUserCtrl, scope, $httpBackend, testTrip;

//   // Initialize the controller and a mock scope
//   beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, $routeParams) {
    
//     $httpBackend = _$httpBackend_;
//     scope = $rootScope.$new();
//     AdminUserCtrl = $controller('AdminUserCtrl', {
//       $scope: scope,
//       $routeParams: {id: 12345678}
//     });
//     testTrip = {_id: 12345678, stays: [{destination: "test"}]};
//   }));

//   it('should get trips', inject(function() {

//     $httpBackend.expectGET('/api/trips/' + testTrip._id).respond(testTrip);
//     $httpBackend.flush();

//     expect(scope.trip).toEqual({_id: 12345678, stays: [{destination: "test"}]});
//     expect(scope.destinations).toEqual("test");
//   }));
// });

// AdminCarCtrl
// AdminCarAddCtrl




