describe("Trip", function () {

    beforeEach(module('fahrtenbuchApp'));

    var $httpBackend, trip;

    beforeEach(inject(function (_$httpBackend_, Trip) {
      trip = Trip;
      $httpBackend = _$httpBackend_;
    }));

    /**
     * get trips
    **/
    it("getTrips should be defined", function () {
        expect(trip.getTrips).toBeDefined();
    });

    it("getTrips should return array of trips", function () {

      $httpBackend.whenGET("/api/trips").respond([{}]);
  		$httpBackend.expectGET("/api/trips");

      trip.getTrips();
      $httpBackend.flush();
    });

    /**
     * get trip
    **/
    it("getTrip should be defined", function () {
        expect(trip.getTrip).toBeDefined();
    });

    // it("getTrip should a trip", inject(function ($httpBackend) {
		it("getTrip should a trip", function () {
		  
		  $httpBackend.whenGET('/api/trips/123').respond({ id: 123 });
  		$httpBackend.expectGET("/api/trips/123");
		 
		  trip.getTrip(123);
		  $httpBackend.flush();
		});

    /**
     * post trip
    **/
    it("postTrip should be defined", function () {
      expect(trip.postTrip).toBeDefined();
    });

    it("postTrip should post a trip", function () {

      $httpBackend.whenPOST("/api/trips").respond(201);
  		$httpBackend.expectPOST("/api/trips");

      trip.postTrip();
      $httpBackend.flush();
    });
});