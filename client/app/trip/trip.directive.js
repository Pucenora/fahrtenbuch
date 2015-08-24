'use strict';

angular.module('fahrtenbuchApp')


  /**
   * Validation - Is the amcount of kilometers in the end higher than at the start?
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
              // input matches condition
              if (viewValue > scope.trip.kilometerStart) {
                return true;
              }
              // it isn't
              return false;
            };
          }
        };
      }
    ])