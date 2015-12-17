!(function() {
    'use strict';

    angular.module('bayaApp').controller('ListingController', ['$scope', '$state', '$location', '$rootScope', '$ngBootbox', '$timeout', '$filter', 'ListingService', 'UtilityService', 'AuthService', '$stateParams', function($scope, $state, $location, $rootScope, $ngBootbox, $timeout, $filter, ListingService, UtilityService, AuthService, $stateParams) {

            $scope.listing = ListingService.ListingForm;
            $scope.listing = {};
            $scope.verifiedListData = [];
            $scope.verifiedlistCurrentPage = 1;
            $scope.nonVerifiedListData = [];
            $scope.nonVerifiedlistCurrentPage = 1;
            $scope.listing.category = [];
            $scope.currentTab = 'verified';
            $scope.disableAddListBtn = false;
            $scope.addlistLoader = false;
            $scope.claimedListing = [];
            $scope.claimArray = [];
            $scope.userClaimArray = [];
            $scope.status = {};
            $scope.statusVal = '';
            $scope.statusData = [
                {id: "pending", label: "Pending"},
                {id: "waiting", label: "Waiting for claim"},
            ];
            $scope.statusEvents = {
                onItemDeselect: function(item) {
                    $scope.status = {};
                },
                onItemSelect: function(item) {
                    if ($scope.statusVal === '' && $scope.statusVal !== item) {
                        $scope.statusVal = item;
                        $scope.status = item;
                        $scope.getNonVerifiedListing();
                    } else {
                        $scope.status = {};
                        $scope.statusVal = '';
                        $scope.getNonVerifiedListing();
                    }
                }

            };

            /*States Settings*/
            $scope.statusSettings = {
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
            //$state.go('admin.listingtype',{status: 'nonverified'});
            /* Create Listing */
            $scope.saveListing = function() {
                if ($scope.form.$valid) {
                    $scope.disableAddListBtn = true;
                    $scope.addlistLoader = true;
                    ListingService.saveListing($scope.listing, function(response) {
                        if (response.success) {
                            $location.path('/admin/listing').search('status', ($location.search().status === undefined) ? 'nonverified' : $location.search().status);
                            ListingService.ListingForm = {};
                            $scope.listing.categoryHddn = '';
                            $scope.stateHdn = '';
                            $scope.categoryArray = [];
                            if ($state.current.name === 'admin.updatelisting') {
                                UtilityService.showToast('success', Message.getSuccessMessage("updateListing"));
                            } else {
                                UtilityService.showToast('success', Message.getSuccessMessage("createListing"));
                            }
                        } else {
                            $scope.disableAddListBtn = false;
                            $scope.addlistLoader = false;
                            UtilityService.showToast('error', Message.getErrorMessage("createListing"));
                        }
                    }, function(error) {
                        $scope.disableAddListBtn = false;
                        $scope.addlistLoader = false;
                        UtilityService.showToast('error', error.message);
                    });
                }
            };

            /*Get listing details*/
            $scope.getListingDetails = function(id) {
                angular.element(document.querySelector('#pageLoaderDiv')).addClass('overlay');
                $scope.hidePageLoader = true;
                ListingService.getListingDetail(id, function(response) {
                    if (response.success) {
                        $scope.listing = response.data.listing_detail;
                        $scope.listing.listing_id = response.data.listing_detail._id;
                        $scope.stateHdn = {id: response.data.listing_detail.state._id};

                        angular.forEach(response.data.listing_detail.business_category, function(cat) {
                            $scope.categoryArrayNew.push({id: cat.cat_id._id});
                            $scope.categoryArray.push(cat.cat_id._id);
                        });

                        $scope.listing.category = $scope.categoryArrayNew;
                        $scope.listing.business_category = $scope.categoryArray;
                        $scope.listing.categoryHddn = 'check';
                    }
                    angular.element(document.querySelector('#pageLoaderDiv')).removeClass('overlay');
                    $scope.hidePageLoader = false;
                }, function(error) {
                    angular.element(document.querySelector('#pageLoaderDiv')).removeClass('overlay');
                    $scope.hidePageLoader = false;
                    $state.go('admin.listing');
                    UtilityService.showToast('error', error.message);
                });
            };

            if ($state.current.name === "admin.updatelisting") {
                $scope.getListingDetails($stateParams.id);
            }


            if ($state.current.name === 'admin.addlisting' || $state.current.name === 'admin.updatelisting') {
                $scope.statesData = [];
                $scope.categoryData = [];
                $scope.statesText = {buttonDefaultText: 'Select State'};
                $scope.businessCatText = {buttonDefaultText: 'Select Business Category'};
                $scope.listing.categoryHddn = '';
                $scope.stateHdn = '';
                $scope.listing.business_category = [];
                $scope.categoryArray = [];
                $scope.categoryArrayNew = [];

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
                        $scope.listing.state = "";
                    },
                    onItemSelect: function(item) {
                        $scope.listing.state = item.id;
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
                ListingService.getCategoryList('', function(response) {
                    angular.forEach(response.data, function(value, key) {
                        $scope.categoryData.push({id: value._id, label: value.category_name});
                    });
                }, function(error) {
                    UtilityService.showToast('error', error.message);
                });

                $scope.categoryEvents = {
                    onItemDeselect: function(item) {
                        $scope.setCategory();
                        if ($scope.listing.business_category.length === 0) {
                            $scope.listing.categoryHddn = '';
                        }
                    },
                    onItemSelect: function(item) {
                        $scope.setCategory();
                        $scope.listing.categoryHddn = 'check';
                    }
                };

                $scope.setCategory = function() {
                    $scope.categoryArray = [];
                    angular.forEach($scope.listing.category, function(cat) {
                        $scope.categoryArray.push(cat.id);
                    });
                    $scope.listing.business_category = $scope.categoryArray;
                };

                $scope.multiSelectSettings = {selectionLimit: 0, scrollable: true, scrollableHeight: '150px', smartButtonMaxItems: 3, closeOnSelect: true, closeOnDeselect: true, showCheckAll: false, showUncheckAll: false, smartButtonTextConverter: function(itemText, originalItem) {
                        return itemText;
                    }};


            }
            /* Function for tab change */
            $scope.tabChange = function(id) {

                var tabId = angular.element(document.querySelector('#' + id));
                (id === 'verified') ? $('#nonverified').removeClass('active') : $('#verified').removeClass('active');
                $scope.currentTab = (id === 'verified') ? 'verified' : 'nonverified';
                tabId.addClass('active');

            };

            /* Get verified Listing */
            $scope.getVerifiedListing = function() {
                $scope.verifiedListLoader = true;
                $scope.verifiedListData = [];
                ListingService.getListing({page: $scope.verifiedlistCurrentPage, is_verified: 'verified', search: $scope.searchValue, claim_status: ""}, function(response) {
                    if (response.success && response.data.items.length > 0) {
                        $scope.noVerifyListFound = false;
                        $scope.verifiedListData = response.data.items;
                        $scope.verifyListMaxSize = response.data.page;
                        $scope.verifyListTotalItems = response.data.totalItems;
                        $scope.verifyListPagination = (response.data.page > 1) ? true : false;
                    } else {
                        $scope.verifyListPagination = false;
                        $scope.noVerifyListFound = true;
                    }
                    $scope.verifiedListLoader = false;
                }, function(error) {
                    $scope.verifiedListLoader = false;
                });
            };

            /* Get Nonverified Listing */
            $scope.getNonVerifiedListing = function() {
                $scope.nonVerifiedListLoader = true;
                $scope.nonVerifiedListData = [];
                ListingService.getListing({page: $scope.nonVerifiedlistCurrentPage, is_verified: 'pending', search: $scope.searchValue, claim_status: $scope.status}, function(response) {
                    if (response.success && response.data.items.length > 0) {
                        $scope.noNonVerifyListFound = false;
                        $scope.nonVerifiedListData = response.data.items;
                        $scope.nonVerifyListMaxSize = response.data.page;
                        $scope.nonVerifyListTotalItems = response.data.totalItems;
                        $scope.nonVerifyListPagination = (response.data.page > 1) ? true : false;
                    } else {
                        $scope.nonVerifyListPagination = false;
                        $scope.noNonVerifyListFound = true;
                    }
                    $scope.nonVerifiedListLoader = false;
                }, function(error) {
                    $scope.nonVerifiedListLoader = false;
                });
            };

            /* Date Formate */
            $scope.getDate = function(date) {
                return UtilityService.getDate(date);
            };

            /* Get business category (convert array to string)*/
            $scope.getBusinessCategory = function(category) {
                var categoryString = '';
                if (category.length > 0) {
                    angular.forEach(category, function(cat) {
                        categoryString += ', ' + cat.cat_id.category_name;
                    });
                    return categoryString.replace(/^,|,$/g, '');
                } else {
                    return '-';
                }

            };

            /*Search listing*/
            $scope.searchList = function() {
                if ($scope.currentTab === 'verified') {
                    $scope.getVerifiedListing();
                } else {
                    $scope.getNonVerifiedListing();
                }
            };

            /*Delete category*/
            $scope.deleteListing = function(id, type, index) {
                $ngBootbox.hideAll();
                $ngBootbox.customDialog(
                    {
                        message: Message.getAlertMessage("listing_delete"),
                        className: 'test-class',
                        buttons: {
                            warning: {
                                label: "No",
                                className: "btn-default",
                                callback: function() {
                                    //console.log('Confirm dismissed!');
                                }
                            },
                            success: {
                                label: "Yes",
                                className: "btn-primary",
                                callback: function() {
                                    ListingService.deleteListing({id: id}, function(response) {
                                        if (response.success) {
                                            if (type === 'verified') {
                                                $scope.verifiedListData.splice(index, 1);
                                                if ($scope.verifiedListData.length === 0) {
                                                    $scope.noVerifyListFound = true;
                                                }
                                            } else {
                                                $scope.nonVerifiedListData.splice(index, 1);
                                                if ($scope.nonVerifiedListData.length === 0) {
                                                    $scope.noNonVerifyListFound = true;
                                                }
                                            }

                                            UtilityService.showToast('success', Message.getSuccessMessage("listing_delete"));
                                        } else {
                                            UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                                        }
                                    }, function(error) {
                                        UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                                    });
                                }
                            }
                        }
                    }
                );

            };
            /*Get claimed listing user*/
            $scope.getClaimedListing = function(id) {
                $scope.claimListLoader = true;
                $scope.claimedListing = [];
                $scope.noClaimFound = false;
                ListingService.getClaimedListing(id, function(response) {
                    if (response.success) {
                        $scope.userClaimArray = response.data.business_claim;
                        angular.forEach(response.data.business_claim, function(data) {
                            if (data.status === 'pending') {
                                $scope.claimedListing.push(data);
                            }
                        });
                        if (!$scope.claimedListing.length) {
                            $scope.noClaimFound = true;
                        }
                    } else {
                        $state.go('admin.listing');
                        UtilityService.showToast('error', Message.getErrorMessage("commonErr"));
                    }
                    $scope.claimListLoader = false;
                }, function(error) {
                    $scope.claimListLoader = false;
                    $state.go('admin.listing');
                    UtilityService.showToast('error', error.message);
                });
            };

            if ($state.current.name === 'admin.claimlisting') {
                $scope.noClaimFound = false;
                $scope.getClaimedListing($stateParams.id);
                $scope.acceptClaimForm = ListingService.acceptClaimForm;
            }

            /*Accept or reject*/
            $scope.acceptClaim = function(userId, claimId, status, claimObjArray) {
                $ngBootbox.hideAll();
                var msg = (status === 'accepted') ? "assign" : "reject";
                $ngBootbox.customDialog(
                    {
                        message: "Are you sure you want to " + msg + " this listing ?",
                        className: 'test-class',
                        buttons: {
                            warning: {
                                label: "No",
                                className: "btn-default",
                                callback: function() {
                                    //console.log('Confirm dismissed!');
                                }
                            },  
                            success: {
                                label: "Yes",
                                className: "btn-primary",
                                callback: function() {
                                    $scope.claimArray = [];
                                    $scope.acceptClaimForm.listing_id = $stateParams.id;
                                    $scope.acceptClaimForm.user_id = userId;
                                    $scope.acceptClaimForm.claim_id = claimId;
                                    $scope.acceptClaimForm.status = status;
                                    angular.forEach(claimObjArray, function(data) {
                                        if (status === 'accepted') {
                                            
                                           if(claimId === data._id){
                                              //var acceptClaimStatus = (claimId === data._id) ? 'accepted' : (data.status === 'pending') ? 'cancelled' : data.status; 
                                               var acceptClaimStatus = 'accepted'; 
                                                $scope.claimArray.push({_id: data._id, user_id: data.user_id, status: acceptClaimStatus});
                                            }
                                          } else {
                                           // var rejectClaimStatus = (claimId === data._id) ? 'rejected' : data.status;
                                           if(claimId !== data._id){
                                            $scope.claimArray.push({_id: data._id, user_id: data.user_id, status: data.status});
                                            }
                                        }
                                    });
                                    $scope.acceptClaimForm.claimArray = $scope.claimArray;
                                    ListingService.acceptClaim($scope.acceptClaimForm, function(response) {
                                        if (response.success) {
                                            if (status === 'accepted') {
                                                $location.path('/admin/listing').search('status', 'nonverified');
                                            } else if (status === 'rejected') {
                                                $scope.getClaimedListing($stateParams.id);
                                            }
                                            $scope.acceptClaimForm = {};
                                            UtilityService.showToast('success', response.message);
                                        } else {
                                            $location.path('/admin/listing').search('status', 'nonverified');
                                            UtilityService.showToast('error', response.message);
                                        }
                                    }, function(error) {
                                        $location.path('/admin/listing').search('status', 'nonverified');
                                        UtilityService.showToast('error', error.message);
                                    });
                                }
                            }
                        }
                    });
            };

            $scope.loadTab = function(type) {
                if (type === 'verified') {
                    $timeout(function() {
                        angular.element(document.querySelector('#listingVerified')).addClass('active');
                        angular.element(document.querySelector('#listingNonVerified')).removeClass('active');
                        angular.element(document.querySelector('#verified')).addClass('active');
                        angular.element(document.querySelector('#nonverified')).removeClass('active');
                    }, 200);
                } else {
                    $timeout(function() {
                        angular.element(document.querySelector('#listingVerified')).removeClass('active');
                        angular.element(document.querySelector('#listingNonVerified')).addClass('active');
                        angular.element(document.querySelector('#verified')).removeClass('active');
                        angular.element(document.querySelector('#nonverified')).addClass('active');
                    }, 200);
                }
            };

            /* Load and check listing */
            if ($location.search().status === undefined || ($location.search().status !== 'verified' && $location.search().status !== 'nonverified')) {
                $scope.getVerifiedListing();
            }

            if ($location.search().status === 'verified') {
                $scope.loadTab('verified');
                $scope.getVerifiedListing();

            }


            if ($location.search().status === 'nonverified') {
                $scope.loadTab('nonverified');
                $scope.getNonVerifiedListing();
            }

            /*Active left tab */
            if ($state.current.name === 'admin.updatelisting' || $state.current.name === 'admin.claimlisting') {
                setTimeout(function() {
                    angular.element(document.querySelector('.leftTab')).removeClass('active');
                    angular.element(document.querySelector('#listingPage')).addClass('active');
                }, 200);

            }

            /*Load edit and create listing page*/
            $scope.loadEditPage = function(type, id) {
                if (type === 'verified') {
                    $location.path('/admin/update-listing/' + id).search('status', type);
                } else {
                    $location.path('/admin/update-listing/' + id).search('status', type);
                }
            };

            /*Get claim count*/
            $scope.getClaimedCount = function(claimedArray) {
                var count = 0;
                angular.forEach(claimedArray, function(obj) {
                    if (obj.status === 'pending') {
                        count += 1;
                    }
                });
                return count;
            };

            /*Accept or reject*/
            $scope.changeListingStatus = function(status, listingId) {
                $ngBootbox.hideAll();
                var msg = (status) ? "Listing successfully active." : "Listing successfully inactive.";
                status = (status) ? "active" : "inactive";
                ListingService.changeListingStatus({"status": status, "listing_id": listingId}, function(response) {
                    if (response.success) {

                        UtilityService.showToast('success', msg);
                    } else {
                        UtilityService.showToast('error', response.message);
                    }
                }, function(error) {
                    UtilityService.showToast('error', error.message);
                });

            };

            /*Accept or reject*/
            $scope.cancelListing = function(index, listingId) {
                $scope.listData = $scope.verifiedListData[index];
                $scope.postObject = {};
                $scope.categoryArray = [];
                // console.log($scope.listData);
                if ($scope.listData !== undefined && $scope.listData !== "") {
                    $ngBootbox.hideAll();

                    $ngBootbox.customDialog(
                        {
                            message: "Are you sure you want to cancel this listing ?",
                            className: 'test-class',
                            buttons: {
                                warning: {
                                    label: "No",
                                    className: "btn-default",
                                    callback: function() {
                                        //console.log('Confirm dismissed!');
                                    }
                                },
                                success: {
                                    label: "Yes",
                                    className: "btn-primary",
                                    callback: function() {
                                        $scope.postObject.business_name = $scope.listData.business_name;
                                        angular.forEach($scope.listData.business_category, function(cat) {
                                            $scope.categoryArray.push(cat.cat_id._id);
                                        });
                                        $scope.postObject.business_category = $scope.categoryArray;
                                        $scope.postObject.neighbour = $scope.listData.neighbour;
                                        $scope.postObject.website_name = ($scope.listData.website_name !== undefined) ? $scope.listData.website_name : "";
                                        $scope.postObject.phone_number = $scope.listData.phone_number;
                                        $scope.postObject.address = $scope.listData.address;
                                        $scope.postObject.city = $scope.listData.city;
                                        $scope.postObject.state = $scope.listData.state._id;
                                        $scope.postObject.zipcode = $scope.listData.zipcode;
                                        $scope.postObject.is_approved = "approved";
                                        $scope.postObject.is_verified = "pending";
                                        $scope.postObject.status = "active";
                                        $scope.postObject.cancel_listing_id = listingId; 
                                        ListingService.cancelListing($scope.postObject, function(response) {
                                            if (response.success) {
                                                $scope.postObject = {};
                                                $scope.categoryArray = [];
                                                $scope.loadTab('nonverified');
                                                $scope.getNonVerifiedListing();
                                                UtilityService.showToast('success', 'Listing successfully calcelled.');
                                            } else {
                                                UtilityService.showToast('error', response.message);
                                            }
                                        }, function(error) {
                                            UtilityService.showToast('error', error.message);
                                        });
                                    }
                                }
                            }
                        });
                }
            };
            
            $scope.backButton = function() {
                if($location.search().status === 'nonverified' || ($state.current.name === 'admin.claimlisting')) {
                    $location.url('admin/listing?status=nonverified');
                } else {
                    $state.go('admin.listing');
                }
            };
        }]);
})();
