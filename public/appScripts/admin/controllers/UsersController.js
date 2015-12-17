!(function() {
    'use strict';
        angular.module('bayaApp').controller('UsersController', ['$scope', '$state', '$location', '$rootScope', 'UsersService', 'UtilityService', 'AuthService', function($scope, $state, $location, $rootScope, UsersService, UtilityService, AuthService) {
            $scope.userForm = UsersService.UserForm;
             /* Get verified Listing */
             $scope.businessUserData = [];
              $scope.userListCurrentPage=1;
               $scope.patientListCurrentPage=1;
                $scope.currentTab = 'business_user';
            $scope.getBusinessUserListing = function() {
                $scope.businessUserListLoader = true;
                $scope.businessUserData = [];
                UsersService.getUsers({page: $scope.userListCurrentPage,user_type:'business_user', search: $scope.searchUser}, function(response) {
                    if (response.success && response.data.items.length > 0) {
                        $scope.noUserListFound = false;
                        $scope.businessUserData = response.data.items;
                        $scope.businessListMaxSize = response.data.page;
                        $scope.businessListTotalItems = response.data.totalItems;
                        $scope.businessListPagination = (response.data.page > 1) ? true : false;
                    } else {
                        $scope.businessListPagination=false;
                        $scope.noUserListFound = true;
                    }
                    $scope.businessUserListLoader = false;
                }, function(error) {
                    $scope.businessUserListLoader = false;
                });
            };
            
            
            
            $scope.getPatientUserListing = function() {
                $scope.patientUserListLoader = true;
                $scope.patientUserData = [];
                UsersService.getUsers({page: $scope.patientListCurrentPage,user_type:'patient', search: $scope.searchUser}, function(response) {
                    if (response.success && response.data.items.length > 0) {
                        $scope.noPatientListFound = false;
                        $scope.patientUserData = response.data.items;
                        $scope.patientListMaxSize = response.data.page;
                        $scope.patientListTotalItems = response.data.totalItems;
                        $scope.patientListPagination = (response.data.page > 1) ? true : false;
                    } else {
                        $scope.patientListPagination=false;
                        $scope.noPatientListFound = true;
                    }
                    $scope.patientUserListLoader = false;
                }, function(error) {
                    $scope.patientUserListLoader = false;
                });
            };
            if($state.current.name==='admin.users'){
                $scope.getBusinessUserListing();
            }
             $scope.tabChange = function(id){
                var tabId = angular.element( document.querySelector( '#'+id ) );
                (id==='business_user') ? $('#patient').removeClass('active') : $('#business_user').removeClass('active');  
                tabId.addClass('active');
                 $scope.currentTab = id;
            };
            
            /* Change  status for user */
             $scope.changeUserStatus = function(enabled,id) {
                UsersService.changeStatus({enabled: (enabled) ? 'active' : 'inactive',id:id }, function(response) {
                    if (response.success) {
                        UtilityService.showToast('success', Message.getSuccessMessage("updateUserStatus"));
                      
                    } else {
                        UtilityService.showToast('error',Message.getErrorMessage("updateUserStatus"));
                    }
                 
                }, function(error) {
                });
            };
            /* Date Formate */
            $scope.getDate = function(date) {
                return UtilityService.getDate(date);
            };

         /*Search listing*/
            $scope.searchUsers = function() {
                if ($scope.currentTab === 'business_user') {
                    $scope.getBusinessUserListing();
                } else {
                    $scope.getPatientUserListing();
                }
            };

        }]);
})();
