'use strict';

/**
 * Test AdminAccountCtrl
 */
describe('Controller: AdminAccountCtrl', function () {

  beforeEach(module('fahrtenbuchApp'));
  var AdminAccountCtrl, $scope, $location, $httpBackend, fakeResponse;

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

	it('test addAccount function', function () {
    $scope.addAccount({ name: 'test' });
  	$httpBackend.expectPOST('/api/accounts').respond(fakeResponse);    
    $httpBackend.flush();
	});

	it('test deleteAccount function', function () {
    $scope.deleteAccount($scope.accounts[0]);
    $httpBackend.expectDELETE('/api/accounts/1').respond(fakeResponse);
    $httpBackend.flush();

    expect($scope.accounts).toEqual([{_id: 2}, {_id: 3}]);
	});
});

/**
 * Test AdminUserCtrl
 */
describe('Controller: AdminUserCtrl', function () {

  beforeEach(module('fahrtenbuchApp'));
  var AdminUserCtrl, $scope, $location, $httpBackend, fakeResponse;

  beforeEach(inject(function ($controller, $rootScope, _$location_, _$httpBackend_) {

    $scope = $rootScope.$new();
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    fakeResponse = '';

    AdminUserCtrl = $controller('AdminUserCtrl', {
      $scope: $scope
    });

    $location.path('/admin/user');
    expect($location.path()).toBe('/admin/user');

  	$httpBackend.expectGET('/api/users').respond([
      {_id: 1, defaultCar: 1},
      {_id: 2, defaultCar: 2},
      {_id: 3, defaultCar: 3}
    ]);
    $httpBackend.expectGET('/api/cars/1').respond({description: "BMW"});
    $httpBackend.expectGET('/api/cars/2').respond({description: "Audi"});
    $httpBackend.expectGET('/api/cars/3').respond({description: "Opel"});
  	$httpBackend.when('GET', 'app/admin/admin.user.html').respond(fakeResponse);
    $httpBackend.flush();
  }));

	it('call AdminUserCtrl', function () {
	  expect($scope.users).toBeDefined();

	  expect(angular.equals($scope.users, [
      {_id: 1, defaultCar: "BMW"},
      {_id: 2, defaultCar: "Audi"},
      {_id: 3, defaultCar: "Opel"}
    ])).toBe(true);
	});

	it('test delete function', function () {
    $scope.deleteUser($scope.users[0]);
    $httpBackend.expectDELETE('/api/users/1').respond(fakeResponse);
    $httpBackend.flush();

    expect(angular.equals($scope.users, [
      {_id: 2, defaultCar: "Audi"},
      {_id: 3, defaultCar: "Opel"}
    ])).toBe(true);
	});
});

/**
 * Test AdminCarCtrl
 */
describe('Controller: AdminCarCtrl', function () {

  beforeEach(module('fahrtenbuchApp'));
  var AdminCarCtrl, $scope, $location, $httpBackend, fakeResponse;

  beforeEach(inject(function ($controller, $rootScope, _$location_, _$httpBackend_) {

    $scope = $rootScope.$new();
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    fakeResponse = '';

    AdminCarCtrl = $controller('AdminCarCtrl', {
      $scope: $scope
    });

    $location.path('/admin/car');
    expect($location.path()).toBe('/admin/car');

  	$httpBackend.expectGET('/api/cars').respond([{_id: 1}, {_id: 2}, {_id: 3}]);
  	$httpBackend.when('GET', 'app/admin/admin.car.html').respond(fakeResponse);
    $httpBackend.flush();
  }));

	it('call AdminCarCtrl', function () {
	  expect($scope.cars).toBeDefined();
	  expect(angular.equals($scope.cars, [{_id: 1}, {_id: 2}, {_id: 3}])).toBe(true);
	});

	it('test addCar function', function () {
	  $scope.addCar();
	  expect($location.path()).toBe('/admin/car/new');
	});

	it('test editCar function', function () {
	  $scope.editCar({_id: 1});
	  expect($location.path()).toBe('/admin/car/1');
	});

	it('test deleteCar function', function () {
    $scope.deleteCar($scope.cars[0]);
    $httpBackend.expectDELETE('/api/cars/1').respond(fakeResponse);
    $httpBackend.flush();

    expect(angular.equals($scope.cars, [{_id: 2}, {_id: 3}])).toBe(true);
	});
});

/**
 * Test AdminCarAddCtrl
 */
describe('Controller: AdminCarAddCtrl', function () {

  beforeEach(module('fahrtenbuchApp'));
  var AdminCarAddCtrl, $scope, $location, $httpBackend, fakeResponse;

  beforeEach(inject(function ($controller, $rootScope, _$location_, _$httpBackend_) {

    $scope = $rootScope.$new();
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    fakeResponse = '';

    AdminCarAddCtrl = $controller('AdminCarAddCtrl', {
      $scope: $scope,
    });

  	$httpBackend.when('GET', 'app/admin/admin.car.html').respond(fakeResponse);
  }));

	it('test createCar function', function () {
		$scope.car = {_id: 1};
    $scope.createCar();
    $httpBackend.expectPOST('/api/cars').respond(fakeResponse);
    $httpBackend.flush();

    expect($location.path()).toBe('/admin/car');
	});
});