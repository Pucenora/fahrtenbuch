'use strict';

angular.module('fahrtenbuchApp')
  .factory('Stay', function Stay($location, $rootScope, $http, Auth, $cookieStore, $q) {

    return {

      /**
       * returns destinatons of a stay as a string
       *
       * @param  {Array}		stays
       * @return {String}	 	destinations
      */
      getDestinationsAsString: function(stays) {
		  	var destinations = "";
		  	var count = 1;
		  	var len = stays.length;

		  	if (len === 0) {
		  		destinations = "private";
		  	}

		  	stays.forEach(function(stay){
		  		if (count === len) {
		  			destinations += stay.destination;
		  		} else {
		   			destinations += stay.destination + " / ";  
		   			count++;   			
		  		}
		  	});

		  	return destinations;
      },

      /**
       * post stay
       *
       * @param  {Object}   stay
       * @param  {Function} callback  - optional
       * @return {Promise}
      */
      postStay: function(stay, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('api/stays', stay)
        .success(function(stay) {
          deferred.resolve(stay);
        })
        .error(function(err) {
          deferred.reject(err);
          return cb(err);
        });

        return deferred.promise;
      }
    };
  });