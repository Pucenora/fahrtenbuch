'use strict';
/* global google */
/* global navigator */

angular.module('fahrtenbuchApp')
  .factory('config', function config() {
    return {
      defaultLocalizationAccuracy : 10,
      desktopLocalizationAccuracy : 100000,
      defaultLocalizationOptions : {
			  enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
			},
			defaultMapOptions : {
				zoom: 15,
	 			streetViewControl: false,
	 			mapTypeControl: false,
	 			scrollwheel: false,
	 			navigationControlOptions: {
					style: google.maps.NavigationControlStyle.SMALL
	 			},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
    };
  });