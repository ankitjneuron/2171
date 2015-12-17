!(function() {
    'use strict';

    angular.module('bayaApp').controller('AdminDashboardController', ['$scope', '$state', '$location', '$rootScope', '$stateParams', '$ngBootbox', 'ListingService', 'UtilityService', function($scope, $state, $location, $rootScope, $stateParams, $ngBootbox, ListingService, UtilityService) {
            $scope.businessOwnerCount = 0;
            $scope.patientCount = 0;
            $scope.businessListCount = 0;

            /* Create Category */
            $scope.getDashboardDetail = function() {
                ListingService.getAdminDashboardDetail({}, function(response) {
                    if (response.success) {
                        $scope.businessOwnerCount = response.data.business_owner;
                        $scope.patientCount = response.data.patient;
                        $scope.businessListCount = response.data.business_list;
                    }
                }, function(error) {
                });
            };
            
            
            $scope.getDashboardDetail();
        }]);
})();
