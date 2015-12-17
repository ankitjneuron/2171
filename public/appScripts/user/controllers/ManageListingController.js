!(function() {
    'use strict';
    angular.module('bayaApp').controller('ManageListingController', ['$scope', '$state', '$location', '$rootScope', '$stateParams', '$modal', 'ManageListingService', 'UtilityService', 'AuthService', function($scope, $state, $location, $rootScope, $stateParams, $modal, ManageListingService, UtilityService, AuthService) {
            $scope.listingForm = ManageListingService.ListingForm;
            $scope.listingData = [];
            $scope.listingCurrentPage = 1;
            $scope.listingDetail = {};
            $scope.category = [];
            $scope.statesData = [];
            $scope.categoryData = [];
            $scope.statesText = {buttonDefaultText: 'Select State'};
            $scope.businessCatText = {buttonDefaultText: 'Select Business Category'};
            $scope.listingForm.categoryHddn = '';
            $scope.stateHdn = '';
            $scope.listingForm.business_category = [];
            $scope.categoryArray = [];
            $scope.categoryArrayNew = [];
            $scope.userInfo = UtilityService.getUserInfo();

            $scope.adminProfileImageSrc = baseUrl + 'images/defaulthospital-logo.jpg';
            $scope.businessLogo = '';
      
            /* Get my listing*/
            $scope.getMyBusinessListing = function() {
                $scope.listingAvailable = false;
                $scope.listDetailLoader = true;
                $scope.businessLogo = '';
                ManageListingService.getMyBusinessListing({}, function(response) {
                    if (response.success && response.data) {

                        $scope.listingDetail = response.data;
                        $scope.listingDetail.notification_number = ($scope.listingDetail.notification_number ===undefined || $scope.listingDetail.notification_number==='') ? $scope.listingDetail.phone_number : $scope.listingDetail.notification_number;
                        $scope.listingAvailable = true;
                        $scope.listingForm = response.data;
                        angular.forEach(response.data.business_claim, function(data) {
                            if (data.status === 'accepted' && data.user_id === $scope.userInfo._id) {
                                $scope.editMyListing = true;
                            }
                        });

                    } else {
                        $scope.noListingAvailable = true;
                    }
                    $scope.listDetailLoader = false;
                    if ($state.current.name === 'user.editbusinessinfo') {
                        angular.element(document.querySelector('#listingUpdateLoaderDiv')).removeClass('overlay');
                        $scope.hideListPageLoader = true;
                        $scope.stateHdn = {id: response.data.state._id};
                        angular.forEach(response.data.business_category, function(cat) {
                            $scope.categoryArrayNew.push({id: cat.cat_id._id});
                            $scope.categoryArray.push(cat.cat_id._id);
                        });

                        $scope.category = $scope.categoryArrayNew;
                        $scope.listingForm.business_category = $scope.categoryArray;
                        $scope.listingForm.categoryHddn = ($scope.listingForm.business_category.length) ? 'check' : '';
//                        UtilityService.isImageExist('uploads/listing/' + response.data.business_logo).then(function(resp) {
//                            if (resp) {
//                                $scope.businessImageLogo = baseUrl + 'uploads/listing/' + response.data.business_logo;
//                            }
//                        });
                        $scope.businessImageLogo = baseUrl + 'uploads/listing/' + response.data.business_logo;
                    }
                }, function(error) {
                    $scope.listDetailLoader = true;
                    UtilityService.showToast('error', error.message);
                    if ($state.current.name === 'user.editbusinessinfo') {
                        $scope.updateListPageLoader(false);
                    }
                });
            };

            if ($state.current.name === 'user.businessinfo' || $state.current.name === 'user.editbusinessinfo') {
                $scope.getMyBusinessListing();
            }

            /* Get all category*/
            if ($state.current.name === 'user.editbusinessinfo') {
                setTimeout(function() {
                    angular.element(document.querySelector('.leftTab')).removeClass('active');
                    angular.element(document.querySelector('#businessInfoPage')).addClass('active');
                }, 200);
                /* Get state list */
                AuthService.getStateList('', function(response) {
                    angular.forEach(response.data, function(value, key) {
                        $scope.statesData.push({id: value._id, label: value.state_name});
                    });
                }, function(error) {
                    UtilityService.showToast('error', error.message);
                });

                $scope.stateEvents = {
                    onItemDeselect: function(item) {
                        $scope.listingForm.state = "";
                    },
                    onItemSelect: function(item) {
                        $scope.listingForm.state = item.id;
                        $scope.stateHdn = item;
                    }

                };

                /*States Settings*/
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

                /* Get category list */
                ManageListingService.getCategoryList('', function(response) {
                    angular.forEach(response.data, function(value, key) {
                        $scope.categoryData.push({id: value._id, label: value.category_name});
                    });
                }, function(error) {
                    UtilityService.showToast('error', error.message);
                });

                $scope.categoryEvents = {
                    onItemDeselect: function(item) {
                        $scope.setCategory();
                        if ($scope.listingForm.business_category.length === 0) {
                            $scope.listingForm.categoryHddn = '';
                        }
                    },
                    onItemSelect: function(item) {
                        $scope.setCategory();
                        $scope.listingForm.categoryHddn = 'check';
                    }
                };

                $scope.setCategory = function() {
                    $scope.categoryArray = [];
                    angular.forEach($scope.category, function(cat) {
                        $scope.categoryArray.push(cat.id);
                    });
                    $scope.listingForm.business_category = $scope.categoryArray;
                };
                /*File onchange event*/
                document.getElementById('businessLogoId').onchange = function() {
                    $scope.file = this.value.split('.')[1];
                    $scope.file = $scope.file.toLowerCase();
                    if ($scope.file === 'gif' || $scope.file === 'png' || $scope.file === 'jpg' || $scope.file === 'jpeg') {
                        $scope.businessImageLogo = URL.createObjectURL(this.files[0]);
                    } else {
                        UtilityService.showToast('error', Message.getErrorMessage("invalid_file_formate"));
                    }
                };
            }
            /* Date Formate */
            $scope.getDate = function(date) {
                return UtilityService.getDate(date);
            };

            /* Get business category (convert array to string)*/
            $scope.getBusinessCategory = function(category) {
                var categoryString = '';
                if (category !== undefined) {
                    if (category.length > 0) {
                        angular.forEach(category, function(cat) {
                            categoryString += ', ' + cat.cat_id.category_name;
                        });
                        return categoryString.replace(/^,|,$/g, '');
                    } else {
                        return '-';
                    }
                }
            };
            /* File click event */
            $scope.fileClickEvent = function() {
                var fileElem = document.getElementById("businessLogoId");
                setTimeout(function() {
                    fileElem.click();
                }, 200);
            };

            /* Update listing */

            $scope.updateListing = function() {
                if ($scope.form.$valid) {
                    $scope.disableUpdateListBtn = true;
                    $scope.updateListLoader = true;
                    $scope.listingForm.listing_id = $scope.listingForm._id;
                    $scope.userBusinessLogo = ($scope.businessLogo !== undefined) ? $scope.businessLogo : '';
                    ManageListingService.updateListing($scope.listingForm, $scope.userBusinessLogo, function(response) {
                        if (response.success) {
                            $scope.userBusinessLogo = '';
                            UtilityService.showToast('success', Message.getSuccessMessage("updateBusinessInfo"));
                        } else {
                            UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                        }
                        $scope.disableUpdateListBtn = false;
                        $scope.updateListLoader = false;
                    }, function(error) {
                        $scope.disableUpdateListBtn = false;
                        $scope.updateListLoader = false;
                        UtilityService.showToast('error', error.message);

                    });
                }
            };
        }]);
})();
