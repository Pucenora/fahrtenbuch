'use strict';

describe('Controller: AdminAccountCtrl', function () {

  // load the controller's module
  beforeEach(module('fahrtenbuchApp'));
  var AdminAccountCtrl, $scope, $location, $httpBackend, fakeResponse;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$location_, _$httpBackend_) {

    $scope = $rootScope.$new();
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    fakeResponse = '';

    AdminAccountCtrl = $controller('AdminAccountCtrl', {
      $scope: $scope
    });

    $location.path('/admin/account');
    expect($location.path()).toBe('/admin/account');

  	$httpBackend.expectGET('/api/accounts').respond([{_id: 1}, {_id: 2}, {_id: 3}]);
  	$httpBackend.when('GET', 'app/admin/admin.account.html').respond(fakeResponse);
    $httpBackend.flush();
  }));

	it('call AdminAccountCtrl', function () {
	  expect($scope.accounts).toBeDefined();
	  expect($scope.accounts).toEqual([{_id: 1}, {_id: 2}, {_id: 3}]);
	});

	it('test add function', function () {
    $scope.addAccount({ name: "test" });
  	$httpBackend.expectPOST('/api/accounts').respond(fakeResponse);    
    $httpBackend.flush();
	});

	it('test delete function', function () {
    $scope.deleteAccount($scope.accounts[0]);
    $httpBackend.expectDELETE('/api/accounts/1').respond(fakeResponse);
    $httpBackend.flush();

    expect($scope.accounts).toEqual([{_id: 2}, {_id: 3}]);
	});
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


// @todo AdminCarCtrl
// @todo AdminCarAddCtrl




