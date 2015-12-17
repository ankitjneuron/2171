!(function() {
    'use strict';
    angular.module('bayaApp').directive('fileModel', ['$parse', function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;
                    element.bind('change', function() {
                        scope.$apply(function() {
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);

    angular.module('bayaApp').directive('ngCompare', function() {
        var compareEl;
        return {
            require: 'ngModel',
            link: function(scope, currentEl, attrs, ctrl) {
                var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
                compareEl = angular.element(comparefield);

                //current field key up
                currentEl.on('keyup', function() {
                    if (compareEl.val() !== "") {
                        var isMatch = currentEl.val() === compareEl.val();
                        ctrl.$setValidity('compare', isMatch);
                        scope.$digest();
                    }
                });

                //Element to compare field key up
                compareEl.on('keyup', function() {
                    if (currentEl.val() !== "") {
                        var isMatch = currentEl.val() === compareEl.val();
                        ctrl.$setValidity('compare', isMatch);
                        scope.$digest();
                    }
                });
            }
        };
    });

    angular.module('bayaApp').filter('capitalize', function() {
        return function(input) {
            return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
        };
    });

    angular.module('bayaApp').filter('to_trusted', ['$sce', function($sce) {
            return function(text) {
                return $sce.trustAsHtml(text);
            };

            angular.module('bayaApp').filter('capitalize', function() {
                return function(input) {
                    return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
                };
            });

        }]);

})();
