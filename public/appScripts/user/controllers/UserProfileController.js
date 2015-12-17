!(function() {
    'use strict';
    angular.module('bayaApp').controller('UserProfileController', ['$scope', '$state', '$injector', '$location', '$rootScope','$timeout', 'UserProfileService', 'UtilityService', 'AuthService', function($scope, $state, $injector, $location, $rootScope,$timeout, UserProfileService, UtilityService, AuthService) {
            $scope.changePasswordForm = UserProfileService.changePasswordForm;
            $scope.userProfileFrom = UserProfileService.userProfileForm;
            $scope.updateBtnDisable = false;
            $scope.updateBtnLoader = false;
            $scope.userProfileImage = '';
             $timeout(function(){
               $scope.business_name = $scope.myBusinessInfo.business_name;
           },200);
            var $validationProvider = $injector.get('$validation');
            /* Reset form */
            $scope.reset = function(form) {
                $validationProvider.reset(form);
            };
            /* Change Password */
            $scope.changePassword = function(form) {
                $validationProvider.validate(form)
                    .success(function() {
                        $scope.updateBtnDisable = true;
                        $scope.updateBtnLoader = true;
                        UserProfileService.changePassword($scope.changePasswordForm, function(response) {
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

            /* Change Password Reset Form */
            $scope.resetForm = function() {
                $scope.changePasswordForm = {};
                var resetButton = document.getElementById("resetFormId");
                resetButton.click();
                $scope.userForm.$valid = false;
            };
            
            /* Update user profile */
            $scope.updateUser = function() {
                if ($scope.form.$valid) {
                    $scope.updateBtnDisable = true;
                    $scope.updateBtnLoader = true;
                    $scope.userProfileFrom.user_image = ($scope.userProfileImage !== undefined) ? $scope.userProfileImage : '';
                    UserProfileService.updateProfile($scope.userProfileFrom, function (response) {
                        if (response.success) {
                            UtilityService.setLocalStorage('userInfo', response.data);
                            $rootScope.setUserInfo();
                            UtilityService.showToast('success', Message.getSuccessMessage("updateUserProfile"));
                        } else {
                            UtilityService.showToast('error', Message.getErrorMessage("signup"));
                        }
                        $scope.updateBtnDisable = false;
                        $scope.updateBtnLoader = false;
                    }, function (error) {
                        $scope.updateBtnDisable = false;
                        $scope.updateBtnLoader = false;
                        UtilityService.showToast('error', error.message);
                         
                    });
                }
            };
            
            if ($state.current.name === 'user.userprofile') {
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
                        $scope.userProfileFrom.state = "";
                    },
                    onItemSelect: function (item) {
                        $scope.userProfileFrom.state = item.id;
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
                
                /*Get user profile data*/
                UserProfileService.getUserProfile('', function(response) {
                    angular.element( document.querySelector( '#profileLoaderDiv' ) ).removeClass('overlay');
                    $scope.hidePageLoader = true;
                    $scope.userProfileFrom = response.data;
                    if (response.data.image !== '' && response.data.image !== undefined) {
                        UtilityService.isImageExist('uploads/profile/thumb/' + response.data.image).then(function(resp) {
                            if (resp) {
                                $scope.userProfileImageSrc = baseUrl + 'uploads/profile/thumb/' + response.data.image;
                            } else {
                                $scope.userProfileImageSrc = baseUrl + 'images/default-profileimage.jpg';
                            }
                        });
                    } else {
                        $scope.userProfileImageSrc = baseUrl + 'images/default-profileimage.jpg';
                    }
                    $scope.stateHdn = {id:response.data.state};  
                    
                }, function(error) {
                    angular.element( document.querySelector( '#profileLoaderDiv' ) ).removeClass('overlay');
                    $scope.hidePageLoader = true;
                    UtilityService.showToast('error', error.message);
                });
                
                $scope.fileClickEvent = function() {
                    var fileElem = document.getElementById("userImageId");
                    setTimeout(function() {
                        fileElem.click();
                    }, 200);
                };

                /*File onchange event*/
                document.getElementById('userImageId').onchange = function() {
                    $scope.file = this.value.split('.')[1];
                    $scope.file = $scope.file.toLowerCase();
                    if ($scope.file === 'gif' || $scope.file === 'png' || $scope.file === 'jpg' || $scope.file === 'jpeg') {
                        $scope.userProfileImageSrc = URL.createObjectURL(this.files[0]);
                    } else {
                        UtilityService.showToast('error', Message.getErrorMessage("invalid_file_formate"));
                    }
                };
            }
            
        }]);
})();
