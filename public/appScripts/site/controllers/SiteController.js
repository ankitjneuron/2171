/**
 * Created by hp on 05/11/2015.
 */
!(function() {
    'use strict';
    angular.module('bayaApp').controller('SiteController', ['$scope', '$state', '$location', '$rootScope', 'SiteService', 'UtilityService', '$stateParams', '$ngBootbox', 'AuthService', function($scope, $state, $location, $rootScope, SiteService, UtilityService, $stateParams, $ngBootbox, AuthService) {
            $scope.loginFrom = AuthService.loginForm;
            $scope.userDetail = UtilityService.getLocalStorage('userInfo');
            $scope.businessListing = [];
            $scope.claimOnListArr = {};
            $scope.pageCnt = '';
            $scope.paginate = 1;
            $scope.loadmore = false;
            $scope.loadMoreLoder = false;
            $scope.loadMoreDisable = false;
            $scope.noRecordFound = false;
            $scope.loginChk = false;
            $scope.listingDetails = '';
            $scope.noScheduleFound = false;
            $scope.pageDetail = {};
            $scope.listingLoader = true;
            $scope.noDoctorFound = false;
            $scope.loader = false;
            $scope.disableLoginSbmtBtn = false;
            $scope.claimProfile = {display: ''};
            $scope.claimId = '';
            $scope.defaultBusinessLogo = "uploads/listing/default_logo.jpg";
            $scope.myListingId = '';
            $scope.getMyListing = UtilityService.getLocalStorage('myBusiness');
            $scope.isOwner = false;
            $scope.isOwnerId = '';
            $scope.myClaim = {};
            $scope.myListingClaim = {};
          
            if($scope.showAfterLoginHeader && (!UtilityService.getUserInfo() || UtilityService.getUserInfo()===undefined || UtilityService.getUserInfo()==='')){
                angular.element(document.querySelector('#showBeforeLoginHeader')).removeClass('ng-hide');
                angular.element(document.querySelector('#showAfterLoginHeader')).addClass('ng-hide');
            }
            /*Check query string*/
            $scope.checkQueryString = function() {
                if ($location.search().business_name !== '') {
                    $scope.businessName = $location.search().businessName;
                }

                if ($location.search().address !== '') {
                    $scope.address = $location.search().address;
                }
            };
            $scope.checkQueryString();
            /*Get business listing*/
            $scope.getAllBusinessListing = function(cnt) {
                $scope.postData = {};
                $scope.loadMoreLoder = true;
                $scope.loadMoreDisable = true;
                $scope.noRecordFound = false;
                $scope.paginate = cnt;

                if ($scope.pageCnt >= $scope.paginate) {
                    $scope.paginate++;
                }
                if ($scope.paginate === undefined) {
                    $scope.businessListing = [];
                    $scope.paginate = 1;
                    $scope.listingLoader = true;
                }

                if ($scope.businessName !== '' && $scope.businessName !== undefined) {
                    $scope.postData.business_name = $scope.businessName;
                }
                if ($scope.address !== '' && $scope.address !== undefined) {
                    $scope.postData.address = $scope.address;
                }
                $scope.postData.page = $scope.paginate;
                SiteService.getAllBusinessListing($scope.postData, function(response) {
                    $scope.listingLoader = false;
                    if (response.success === true) {
                        $scope.myListingClaim = response.data.my_listing_claim;
                        
                        $scope.businessListing.push.apply($scope.businessListing, response.data.listing.data);
                        if ($scope.businessListing.length !== 0) {

                            $scope.pageCnt = response.data.listing.pageCount;
                            if ($scope.pageCnt > 1) {
                                $scope.loadmore = true;
                            }

                            if ($scope.paginate === response.data.listing.pageCount) {
                                $scope.loadmore = false;
                            }

                            if (UtilityService.checkUserLogin()) {
                                $scope.loginChk = true;
                            }
 
                        } else {
                            $scope.loadmore = false;
                            $scope.noRecordFound = true;
                        }
                    } else {
                        UtilityService.showToast('error', response.message);
                    }
                    $scope.loadMoreLoder = false;
                    $scope.loadMoreDisable = false;
                }, function(error) {
                    $scope.loadMoreLoder = false;
                    $scope.loadMoreDisable = false;
                    UtilityService.showToast('error', error.message);
                });

            };
            if ($state.current.name === 'root.listing') {
                $scope.getAllBusinessListing($scope.paginate);
            }
            
            /*Get business listing*/
            $scope.getBusinessListingDetail = function(id) {
                angular.element(document.querySelector('#pageLoaderDiv')).addClass('overlay');
                $scope.hidePageLoader = true;
                SiteService.getBusinessListingDetail(id, function(response) {
                    if (response.success) {
                        $scope.listingDetails = response.data.listing_detail;
                        $scope.myClaim = response.data.my_listing_claim;
                        
                         $scope.defaultBusinessLogo = "uploads/listing/" + response.data.listing_detail.business_logo;
                        if (UtilityService.checkUserLogin()) {
                            $scope.loginChk = true;
                        }
                        if ($scope.listingDetails.availability === undefined || $scope.listingDetails.availability.availability.length === 0) {
                            $scope.noScheduleFound = true;
                        }
                        if ($scope.listingDetails.doctors.length === 0) {
                            $scope.noDoctorFound = true;
                        }
                        
                        $scope.loadMap();
                        angular.forEach($scope.listingDetails.business_claim,function(val) {
                            if(val.status==='pending' || val.status==='accepted'){
                                $scope.hideClaimButton = true;
                            }
                        });
                    }
                    angular.element(document.querySelector('#pageLoaderDiv')).removeClass('overlay');
                    $scope.hidePageLoader = false;
                }, function(error) {
                    angular.element(document.querySelector('#pageLoaderDiv')).removeClass('overlay');
                    $scope.hidePageLoader = false;
                    $state.go('root.listing');
                    UtilityService.showToast('error', error.message);
                });

            };

            if ($state.current.name === 'root.doctordetails') {
                $scope.getBusinessListingDetail($stateParams.id);
            }
            /*Claim on list*/
            $scope.claimOnList = function(id) {
                $ngBootbox.customDialog(
                    {
                        message: Message.getAlertMessage("claimOnList"),
                        className: 'test-class',
                        buttons: {
                            warning: {
                                label: "No",
                                className: "btn-default",
                                callback: function() {
                                }
                            },
                            success: {
                                label: "Yes",
                                className: "btn-info",
                                callback: function() {
                                    $scope.claimOnListArr.listing_id = id;
                                    SiteService.claimOnList($scope.claimOnListArr, function(response) {
                                        if (response.success) {
                                            // angular.element('#alreadyClaimId_'+id).show();
                                            //angular.element('#claimId_'+id).hide();
                                            $rootScope.userDashboard();
                                            $state.go($state.current, {}, {reload: true});
                                            UtilityService.showToast('success', response.message);
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
            };

            /*Get business listing*/
            $scope.getCmsPageDetail = function() {
                $scope.showPageLoader = false;
                $scope.termAndCondition = ($stateParams.slug === 'terms-and-conditions') ? true : false;
                $scope.privacyPolicy = ($stateParams.slug === 'privacy-policy') ? true : false;
                SiteService.getCmsPageDetail({slug: $stateParams.slug}, function(response) {
                    if (response.success) {
                        $scope.pageDetail = response.data;

                    } else {
                        $state.go('root.home');
                    }
                    $scope.showPageLoader = true;
                }, function(error) {
                    $scope.showPageLoader = true;
                    $state.go('root.home');
                });

            };

            if ($state.current.name === 'root.pagedetail') {
                $scope.getCmsPageDetail();
            }
            /*Load doctor detail page map*/
            $scope.loadMap = function() {
                $scope.lattitude = ($scope.listingDetails.loc[1] === undefined) ? 0 : $scope.listingDetails.loc[1];
                $scope.longtitude = ($scope.listingDetails.loc[0] === undefined) ? 0 : $scope.listingDetails.loc[0];
                var mapOptions = {
                    zoom: 5,
                    center: new google.maps.LatLng($scope.lattitude, $scope.longtitude),
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                };
                var infoWindow = new google.maps.InfoWindow();
                $scope.map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
                $scope.markers = [];
                $scope.selectedMarker = {};
                if ($scope.lattitude!== undefined && $scope.longtitude !== 0) {
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: new google.maps.LatLng($scope.lattitude, $scope.longtitude),
                        title: $scope.listingDetails.business_name
                    });

                    marker.content = '<div class="infoWindowContent">' + $scope.listingDetails.address + ', ' + $scope.listingDetails.zipcode + '</div>';
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                        $scope.selectedMarker = marker;
                        $scope.$apply();
                        infoWindow.open($scope.map, marker);
                    });
                    $scope.markers.push(marker);
                }
                $scope.openInfoWindow = function(e, selectedMarker) {
                    google.maps.event.trigger(selectedMarker, 'click');
                };
            };

            /*Login*/
            $scope.login = function() {
                if ($scope.form.$valid) {
                    $scope.loader = true;
                    $scope.disableLoginSbmtBtn = true;
                    AuthService.login($scope.loginFrom, function(response) {
                        if (response.success === true) {
                            UtilityService.setLocalStorage('userInfo', response.data);
                            window.location.reload();
                            AuthService.loginForm = {};
                        } else {
                            UtilityService.showToast('error', response.message);
                        }
                        $scope.loader = false;
                        $scope.disableLoginSbmtBtn = false;
                    }, function(error) {
                        $scope.loader = false;
                        $scope.disableLoginSbmtBtn = false;
                        UtilityService.showToast('error', error.message);
                    });
                }
            };
            /*Clear Login Values*/
            $scope.clearLoginValues = function() {
                $scope.loginFrom = {
                        "email": "",
                        "password": ""
                    };
            };

            /*Cancel claim on list*/
            $scope.cancelClaimOnList = function(listing_id,claim_id) {
                 $ngBootbox.customDialog(
                    {
                        message: Message.getAlertMessage("cancel_claim"),
                        className: 'test-class',
                        buttons: {
                            warning: {
                                label: "No",
                                className: "btn-default",
                                callback: function() {
                                }
                            },
                            success: {
                                label: "Yes",
                                className: "btn-info",
                                callback: function() {
                                   // claim_id = (claim_id===undefined) ? $scope.myClaim.claim_id : claim_id;
                                    SiteService.cancelClaimOnList({claim_id:claim_id, listing_id: listing_id}, function(response) {
                                        if (response.success) {
                                            $rootScope.userDashboard();
                                            UtilityService.showToast('success', response.message);
                                            $state.go($state.current, {}, {reload: true});
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
            }; 
        }]);
})();
