/**
 * Created by hp on 2/11/2015.
 */
!(function() {
    'use strict';

    angular.module('bayaApp').controller('AdminProfileController', ['$scope', '$state', '$location', '$rootScope', '$ngBootbox', 'AdminProfileService', 'UtilityService', '$stateParams', '$injector', function($scope, $state, $location, $rootScope, $ngBootbox, AdminProfileService, UtilityService, $stateParams, $injector) {
            $scope.adminProfileForm = AdminProfileService.adminProfileForm;
            $scope.adminProfileImage = "";
            $scope.adminProfileImageSrc = "images/default-profileimage.jpg";
            var $validationProvider = $injector.get('$validation');

            /*Update admin profile*/
            $scope.updateAdminProfile = function() {
                if ($scope.form.$valid) {
                    $scope.updateBtnDisable = true;
                    $scope.updateBtnLoader = true;
                    $scope.adminProfileForm.admin_image = ($scope.adminProfileImage !== undefined) ? $scope.adminProfileImage : '';
                    AdminProfileService.updateProfile($scope.adminProfileForm, function(response) {
                        if (response.success) {
                            UtilityService.setLocalStorage('userInfo', response.data);
                            $rootScope.setUserInfo();
                            UtilityService.showToast('success', Message.getSuccessMessage("updateAdminProfile"));
                        } else {
                            UtilityService.showToast('error', response.message);
                        }
                        $scope.updateBtnDisable = false;
                        $scope.updateBtnLoader = false;
                    }, function(error) {
                        $scope.updateBtnDisable = false;
                        $scope.updateBtnLoader = false;
                        UtilityService.showToast('error', error.message);
                    });
                }
            };
            /*Get admin profile data*/
            $scope.getAdminProfile = function() {
                
                AdminProfileService.getAdminProfile('', function(response) {
                    angular.element( document.querySelector( '#profileLoaderDiv' ) ).removeClass('overlay');
                    $scope.hidePageLoader = true;
                    $scope.adminProfileForm = response.data;
                    if (response.data.image !== '') {
                        UtilityService.isImageExist('uploads/profile/thumb/' + response.data.image).then(function(resp) {
                            if (resp) {
                                $scope.adminProfileImageSrc = baseUrl + 'uploads/profile/thumb/' + response.data.image;
                            } else {
                                $scope.adminProfileImageSrc = baseUrl + 'images/default-profileimage.jpg';
                            }
                        });
                    } else {
                        $scope.adminProfileImageSrc = baseUrl + 'images/default-profileimage.jpg';
                    }
                }, function(error) {
                    angular.element( document.querySelector( '#profileLoaderDiv' ) ).removeClass('overlay');
                    $scope.hidePageLoader = true;
                    UtilityService.showToast('error', error.message);
                });
            };

            if ($state.current.name === 'admin.adminprofile') {
                $scope.getAdminProfile();

                $scope.fileClickEvent = function() {
                    var fileElem = document.getElementById("adminImageId");
                    setTimeout(function() {
                        fileElem.click();
                    }, 200);
                };

                /*File onchange event*/
                document.getElementById('adminImageId').onchange = function() {
                    $scope.file = this.value.split('.')[1];
                    $scope.file = $scope.file.toLowerCase();
                    if ($scope.file === 'gif' || $scope.file === 'png' || $scope.file === 'jpg' || $scope.file === 'jpeg') {
                        $scope.adminProfileImageSrc = URL.createObjectURL(this.files[0]);
                    } else {
                        UtilityService.showToast('error', Message.getErrorMessage("invalid_file_formate"));
                    }
                };
            }

            /* Change Password */
            $scope.changePassword = function(form) {
                $validationProvider.validate(form)
                    .success(function() {
                        $scope.updateBtnDisable = true;
                        $scope.updateBtnLoader = true;
                        AdminProfileService.changePassword($scope.changePasswordForm, function(response) {
                            if (response.success) {
                                $scope.reset(form);
                                UtilityService.showToast('success', Message.getSuccessMessage("password_changed"));
                            } else {
                                UtilityService.showToast('error', response.message);
                            }
                            $scope.updateBtnDisable = false;
                            $scope.updateBtnLoader = false;
                        }, function(error) {
                            $scope.updateBtnDisable = false;
                            $scope.updateBtnLoader = false;
                            UtilityService.showToast('error', error.message);
                        });
                    })
                    .error(function() {
                        //console.log("error");
                    });
            };

            $scope.reset = function(form) {
                $validationProvider.reset(form);
            };

        }]);
})();
