!(function () {
    'use strict'

    angular.module('bayaApp').controller('HomeController', ['$scope','$state','$location', '$rootScope','AuthService', function($scope,$state,$location, $rootScope,AuthService) {

        /* User Login Authentication */
        $scope.login = function(){
           if($scope.form.$valid) {
               console.log($scope.loginFrom);
           }
       }
    }]);
})();
