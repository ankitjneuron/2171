/**
 * Created by hp on 27/10/2015.
 */
!(function() {
    'use strict';

    angular.module('bayaApp').controller('BaseController', ['$scope', '$state', '$location', '$rootScope', 'UtilityService', 'AuthService', function($scope, $state, $location, $rootScope, UtilityService, AuthService) {
            var userinfo = UtilityService.getUserInfo();
            $scope.defaultProfileImage = 'default-profileimage.jpg';
            $scope.profileImage = baseUrl + 'images/' + $scope.defaultProfileImage;
            $scope.userType = '';
            $scope.userDashboardDetail = [];
            $scope.business_name = '';
            $scope.businessAppointment = [];
            $scope.myBusinessInfo = {};
            $scope.hideTab = true;
            //UtilityService.setLocalStorage('myBusiness', '');
            /* User logout */
            $scope.logout = function(data) {
                if (UtilityService.checkUserLogin()) {

                    AuthService.logout(UtilityService.getUserAccessToken(), function(response) {
                        if (response.success) {
                            $scope.showBeforeLoginHeader = false;
                            $scope.showAfterLoginHeader = false;
                            UtilityService.removeLocalStorage('userInfo');
                            UtilityService.removeLocalStorage('myBusiness');
                            if (data === 'admin')
                                $state.go('login');
                            else if (data === 'user')
                                $state.go('root.login');
                            else
                                $state.go('root.login');
                            //UtilityService.showToast('success', Message.getSuccessMessage("logout"));
                        } else {
                            UtilityService.showToast('error', Message.getErrorMessage("logout"));
                        }
                    }, function(error) {
                        UtilityService.showToast('error', Message.getErrorMessage("logout"));
                    });

                } else {
                    $location.path("/");
                }
            };

            $rootScope.userLogOut = function() {
                $scope.logout();
            };

            $rootScope.setUserInfo = function() {
                userinfo = UtilityService.getUserInfo();
                if (userinfo.hasOwnProperty('image')) {
                    UtilityService.isImageExist('uploads/profile/' + userinfo.image).then(function(resp) {
                        if (resp) {
                            $scope.profileImage = baseUrl + 'uploads/profile/' + userinfo.image;
                        } else {
                            $scope.profileImage = baseUrl + 'images/default-profileimage.jpg';
                        }
                    });
                } else {
                    $scope.profileImage = baseUrl + 'images/default-profileimage.jpg';
                }
                if (userinfo.hasOwnProperty('first_name')) {
                    $scope.userName = userinfo.first_name;
                }
                if (userinfo.hasOwnProperty('last_name')) {
                    $scope.userName += ' ' + userinfo.last_name;
                }

                if (userinfo) {
                    $scope.userType = userinfo.user_type;
                    $scope.showBeforeLoginHeader = true;
                    $scope.showAfterLoginHeader = true;
                } else {
                    $scope.showBeforeLoginHeader = false;
                    $scope.showAfterLoginHeader = false;
                }
            };

            $scope.getUserDashboardDetail = function() {
                $scope.claimProfile = false;
                $scope.pendingClaimProfile = false;
                $scope.confirmClaimProfile = false;
                $scope.hideTab = true;
                $scope.businessAppointment = [];
                AuthService.getUserDashboardDetail({}, function(response) {
                    if (response.success) {
                        UtilityService.setLocalStorage('myBusiness', response.data.my_listing);
                        $scope.myBusinessInfo = response.data.my_listing;
                        $scope.current = response.data.profile_percentage.percentVal;
                        $scope.max = response.data.profile_percentage.total;
                        $scope.percentage = response.data.profile_percentage.percent;
                        $scope.businessAppointment = response.data.pending_appointment;
                        if (response.data.my_listing) {
                            if (response.data.my_listing_claim) {
                                var claimStatusData = response.data.my_listing_claim;

                                $scope.hideTab = (claimStatusData.status === 'accepted' && claimStatusData.user_id === userinfo._id) ? false : true;
                                if (claimStatusData.status === 'pending' && claimStatusData.user_id === userinfo._id) {
                                    $scope.claimProfile = false;
                                    $scope.pendingClaimProfile = true;
                                    $scope.confirmClaimProfile = false;
                                }
                                if (claimStatusData.status === 'accepted' && claimStatusData.user_id === userinfo._id) {
                                    $scope.claimProfile = false;
                                    $scope.pendingClaimProfile = false;
                                    $scope.confirmClaimProfile = true;
                                    $scope.business_name = response.data.my_listing.business_name;
                                }


                            } else {
                                $scope.claimProfile = true;
                            }

                        } else {
                            $scope.claimProfile = true;
                        }
                    }
                }, function(error) {
                });
            };

            if (userinfo.user_type === 'business_user') {
                $scope.getUserDashboardDetail();
            }

            $rootScope.userDashboard = function() {
                $scope.getUserDashboardDetail();
            };

            $scope.$state = $state;

            /*Search business query string*/
            $scope.searchBusiness = function() {
                $scope.businessName = ($scope.businessName === undefined || $scope.businessName === '') ? '' : $scope.businessName;
                $scope.address = ($scope.address === undefined || $scope.address === '') ? '' : $scope.address;
                $location.path('/listing').search('businessName', $scope.businessName).search('address', $scope.address);
            };

            $rootScope.checkMylisting = function() {
                if ($scope.myBusinessInfo.my_listing_claim !== undefined) {
                    $scope.hideTab = ($scope.myBusinessInfo.my_listing_claim.status === 'accepted' && $scope.myBusinessInfo.my_listing_claim.user_id === userinfo._id) ? false : true;
                }
            };

        }]);

})();
