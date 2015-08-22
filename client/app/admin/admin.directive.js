'use strict';

var regex = /^(\w{1,3})\-(\w{1,3})\-(\d{1,4})/;

angular.module('fahrtenbuchApp')

  .directive('ngConfirmClick', [
    function() {
      return {
        link: function (scope, element, attr) {
          var msg = attr.ngConfirmClick || "Are you sure?";
          var clickAction = attr.confirmedClick;
          element.bind('click',function (event) {
            if ( window.confirm(msg) ) {
              scope.$eval(clickAction)
            }
          });
        }
      };
    }
  ])

  /**
   * Validation - Is this value a license tag?
  **/
  .directive('licenseTag', [
    function () {
       return {
        require: 'ngModel',
          link: function(scope, element, attrs, ctrl) {
            ctrl.$validators.licenseTag = function(modelValue, viewValue) {
              if (ctrl.$isEmpty(modelValue)) {
                return true;
              }

              if (regex.test(viewValue)) {
                console.log("Yeah!");
                return true;
              }

              console.log("Doah!");
              return false;
            };
          }
        };
      }
    ])