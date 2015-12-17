/**
 * Created by hp on 27/10/2015.
 */
!(function () {
    'use strict';

    angular.module('bayaApp').controller('AuthController', ['$scope', '$state', '$location', '$rootScope', '$stateParams', 'AuthService', 'UtilityService', function ($scope, $state, $location, $rootScope, $stateParams, AuthService, UtilityService) {
            $scope.loginFrom = AuthService.loginForm;
            $scope.loginFrom.email = '';
            $scope.loginFrom.password = '';
            $scope.signupFrom = AuthService.signupForm;
            $scope.signupFrom = {};
            $scope.forgotPasswordForm = AuthService.forgotPasswordForm;
             $scope.forgotPasswordForm.email = '';
            $scope.resetFrom = AuthService.resetPasswordForm;
            $scope.loader = false;
            $scope.btnLoader = false;
            $scope.btnDisable = false;
            $scope.disableLoginSbmtBtn = false;
            $scope.disableSendBtn = false;
            angular.element('body').removeClass('modal-open');
            angular.element('.modal-backdrop').remove();
            if($stateParams.status==='success'){
                UtilityService.showToast('success',Message.getSuccessMessage('account_activate_success')); 
            }
            if($stateParams.status==='failed'){
                UtilityService.showToast('error',Message.getErrorMessage('account_activation_failed')); 
            }
             if($scope.showAfterLoginHeader && (!UtilityService.getUserInfo() || UtilityService.getUserInfo()===undefined || UtilityService.getUserInfo()==='')){
                angular.element(document.querySelector('#showBeforeLoginHeader')).removeClass('ng-hide');
                angular.element(document.querySelector('#showAfterLoginHeader')).addClass('ng-hide');
            }
            /* User Login Authentication */
            $scope.login = function () {
                if ($scope.form.$valid) {
                    $scope.loader = true;
                    $scope.disableLoginSbmtBtn = true;
                    $scope.loginFrom.email = $scope.loginFrom.email.toLowerCase();
                    AuthService.login($scope.loginFrom, function (response) {
                        if (response.success === true) {
                            if ($state.current.name === 'login' && response.data.user_type === 'admin') {
                                UtilityService.setLocalStorage('userInfo', response.data);
                                $state.go('admin.dashboard');
                                window.location.reload();
                                AuthService.loginForm = {};
                                //UtilityService.showToast('success',Message.getSuccessMessage("login"));
                            } else if ($state.current.name === 'root.login' && response.data.user_type === 'business_user') {
                                UtilityService.setLocalStorage('userInfo', response.data);
                                $state.go('user.dashboard');
                                window.location.reload();
                                AuthService.loginForm = {};
                                // UtilityService.showToast('success',Message.getSuccessMessage("login"));
                            } else {
                                UtilityService.showToast('error', Message.getErrorMessage("login"));
                            }
                        } else {
                            UtilityService.showToast('error', response.message);
                        }
                        $scope.loader = false;
                        $scope.disableLoginSbmtBtn = false;
                    }, function (error) {
                        $scope.loader = false;
                        $scope.disableLoginSbmtBtn = false;
                        UtilityService.showToast('error', error.message);
                    });

                }
            };
            $scope.forgotPassword = function () {
                if ($scope.form.$valid) {
                    $scope.loader = true;
                    $scope.disableSendBtn = true;
                    $scope.forgotPasswordForm.user_type = "business_user";
                    $scope.forgotPasswordForm.email = $scope.forgotPasswordForm.email.toLowerCase();
                    AuthService.forgotPassword($scope.forgotPasswordForm, function (response) {
                        if (response.success === true) {
                                $state.go('root.login');
                                AuthService.forgotPasswordForm = {};
                                UtilityService.showToast('success',Message.getSuccessMessage("forgotpassword"));
                        } else {
                            UtilityService.showToast('error', response.message);
                        }
                        $scope.loader = false;
                        $scope.disableSendBtn = false;
                    }, function (error) {
                        $scope.loader = false;
                        $scope.disableSendBtn = false;
                        UtilityService.showToast('error', error.message);
                    });

                }
            };
            
             /* User Login Authentication */
            $scope.resetPassword = function () {
                if ($scope.form.$valid) {
                    $scope.resetFrom.token = $stateParams.id;
                    $scope.resetFormBtnloader = true;
                    $scope.disableResetSbmtBtn = true;
                    AuthService.resetPassword($scope.resetFrom, function (response) {
                        if (response.success === true) {
                                $state.go('root.login');
                                AuthService.resetFrom = {};
                                UtilityService.showToast('success',Message.getSuccessMessage("reset_password"));
                        } else {
                            UtilityService.showToast('error', Message.getErrorMessage("session_expired"));
                        }
                        $scope.resetFormBtnloader = false;
                        $scope.disableResetSbmtBtn = false;
                    }, function (error) {
                        $scope.resetFormBtnloader = false;
                        $scope.disableResetSbmtBtn = false;
                        UtilityService.showToast('error', Message.getErrorMessage("session_expired"));
                    });
                }
            };
            
            /* Get state list */
            if ($state.current.name === 'root.signup') {
                $scope.statesData = [];
                $scope.stateHdn = '';
                $scope.statesText = {buttonDefaultText: 'Select State'};

                AuthService.getStateList('', function (response) {
                    angular.forEach(response.data, function (value, key) {
                        $scope.statesData.push({id: value._id, label: value.state_name});
                    });
                }, function (error) {
                    UtilityService.showToast('error', error.message);
                });
                
                $scope.stateEvent = {
                    onItemDeselect: function (item) {
                        $scope.signupForm.state = "";
                    },
                    onItemSelect: function (item) {
                        $scope.signupFrom.state = item.id;
                        $scope.stateHdn = item;
                    }
                };
                $scope.stateSettings = {
                        selectionLimit: 1, 
                        scrollable: true, 
                        scrollableHeight: '150px', 
                        smartButtonMaxItems: 1, 
                        closeOnSelect: true, 
                        closeOnDeselect: true, 
                        showCheckAll: false, 
                        showUncheckAll: false, 
                        smartButtonTextConverter: function(itemText, originalItem) {
                            return itemText;
                        }
                };
            }

            /* User signup */
            $scope.signup = function () {
                if ($scope.form.$valid) {
                    $scope.btnLoader = true;
                    $scope.btnDisable = true;
                    $scope.signupFrom.user_type = 'business_user';
                    
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'address': $scope.signupFrom.address+ ', '+$scope.signupFrom.address+', '+$scope.signupFrom.zipcode}, function (results, status) {

                        if (status == google.maps.GeocoderStatus.OK) {
                            var latLong = results[0].geometry.location;
                            if(latLong.lat() === undefined || latLong.lat() === '' || latLong.lng() === undefined || latLong.lng() === '') {
                                $scope.signupFrom.lattitude = '0';
                                $scope.signupFrom.longtitude = '0';
                                
                            } else {
                                $scope.signupFrom.lattitude = latLong.lat();
                                $scope.signupFrom.longtitude = latLong.lng();
                            }
                        } else {
                            $scope.signupFrom.lattitude = '0';
                            $scope.signupFrom.longtitude = '0';
                        }
                        $scope.signupFrom.email =  $scope.signupFrom.email.toLowerCase();
                        AuthService.signup($scope.signupFrom, function (response) {
                            if (response.success) {
                                $state.go('root.login');
                                UtilityService.showToast('success', Message.getSuccessMessage("user_signup"));
                                AuthService.signupForm = {};
                            } else {
                                UtilityService.showToast('error',response.message);
                            }
                            $scope.btnLoader = false;
                            $scope.btnDisable = false;

                        }, function (error) {
                            UtilityService.showToast('error', error.message);                       
                            $scope.btnLoader = false;
                            $scope.btnDisable = false;
                            UtilityService.showToast('error', error.message);
                        });
                    });
                }
            };
        }]);
})();
