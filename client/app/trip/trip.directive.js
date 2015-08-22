'use strict';

angular.module('fahrtenbuchApp')


  /**
   * Validation - Is this value a license tag?
  **/
  .directive('kilometerEnd', [
    function () {
       return {
        require: 'ngModel',
          link: function(scope, element, attrs, ctrl) {
            ctrl.$validators.kilometerEnd = function(modelValue, viewValue) {
              if (ctrl.$isEmpty(modelValue)) {
                return true;
              }

              if (viewValue > scope.trip.kilometerStart) {
                return true;
              }

              return false;
            };
          }
        };
      }
    ])