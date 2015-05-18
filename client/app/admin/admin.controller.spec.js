'use strict';

describe('Controller: AdminAccountCtrl', function () {

  // load the controller's module
  beforeEach(module('fahrtenbuchApp'));
  var AdminAccountCtrl, scope, $httpBackend, AccountServiceMock, test;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, Account, $q) {
    
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    AccountServiceMock = {
      getAccounts: function() {
      	test = "Success!!!";
        var deferred = $q.defer();
        deferred.resolve([{test: "test"}]);
        return deferred.promise;
    	}
  	};

    AdminAccountCtrl = $controller('AdminAccountCtrl', {
      $scope: scope,
      AccountServiceMock: Account
    });

    // spyOn(Account, "getAccounts").andCallFake(function() {
    //   var deferred = $q.defer();
    //   deferred.resolve([{test: "test"}]);
    //   return deferred.promise;
    // });
  }));

  it('can do remote call', inject(function(Account) {
    // Account.getAccounts()
    //   .then(function() {
    //     console.log('Success');
    // 	});

  	
  	// expect(scope.accounts).toEqual([{test: "test"}]);
  	expect(test).toEqual("Success!!!");
  }));

	// it('should get accounts', inject(function() {

 //    $httpBackend.expectGET('/api/accounts').respond([{test: "test"}]);
 //    $httpBackend.flush();
 //    expect(scope.accounts).toEqual([{test: "test"}]);
	// }));
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




