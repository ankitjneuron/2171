!(function() {
    'use strict';

    angular.module('bayaApp').controller('BusinessUserController', ['$scope', '$state', '$location', '$rootScope', '$ngBootbox', 'ListingService', 'UtilityService', 'AuthService', '$stateParams', function($scope, $state, $location, $rootScope, $ngBootbox, ListingService, UtilityService, AuthService, $stateParams) {
            $scope.businessPageCurrentPage = 1;
            $scope.businessList = [];
            $scope.pageData = {};
            /* Get verified Listing */
            $scope.getBusinessPageListing = function() {
                $scope.businessListLoader = true;
                $scope.businessList = [];
                ListingService.getBusinessPageListing({page: $scope.businessPageCurrentPage, search: $scope.searchValue}, function(response) {
                    if (response.success && response.data.items.length > 0) {
                        $scope.noBusinessPagesFound = false;
                        $scope.businessList = response.data.items;
                        $scope.businessPageMaxSize = response.data.page;
                        $scope.businessListTotalItems = response.data.totalItems;
                        $scope.businessListPagination = (response.data.page > 1) ? true : false;
                    } else {
                        $scope.businessListPagination = false;
                        $scope.noBusinessPagesFound = true;
                    }
                    $scope.businessListLoader = false;
                }, function(error) {
                    $scope.businessListLoader = false;
                });
            };
            if($state.current.name==='admin.businesspages'){
              $scope.getBusinessPageListing();
            }
          
            $scope.tabActive = function(){
                setTimeout(function(){
                   angular.element( document.querySelector( '.leftTab' ) ).removeClass('active');   
                   angular.element( document.querySelector( '#businessPage' ) ).addClass('active');
                
                },200);
               
            };
          
             $scope.getBusinessPageDetail = function() {
               $scope.tabActive(); 
               $scope.pageError = false;
               $scope.pageDetail = false;
                ListingService.getListingDetail($stateParams.id, function(response) {
                    if (response.success) {
                         $scope.pageData = response.data.listing_detail;
                    } else {
                       $scope.pageError = true;
                       $scope.pageDetail = true;
                    }
                }, function(error) {
                    $scope.pageError = true;
                    $scope.pageDetail = true;
                });
            };
            
            if($state.current.name==='admin.businessview'){
                 $scope.getBusinessPageDetail();
            }
            /*Delete category*/
            $scope.acceptBusinessList = function(id,type,index) {
                $ngBootbox.hideAll();
                $ngBootbox.customDialog(
                    {
                        message: 'Are you sure you want to '+type+' this business ?',
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
                                  var data = {listing_id: id,status: (type==='accept') ? 'approved' : 'disapproved'};
                                    ListingService.acceptBusinessListing(data, function(response) {
                                        if (response.success) {
                                               $scope.businessList.splice(index, 1);
                                                if ($scope.businessList.length === 0) {
                                                    $scope.noBusinessPagesFound = true;
                                                }   
                                            UtilityService.showToast('success',(type==='accept') ? Message.getSuccessMessage("accept_business_listing") : Message.getSuccessMessage("reject_business_listing"));
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
          
          /* Date Formate */
            $scope.getDate = function(date) {
                return UtilityService.getDate(date);
            };
            
           /* Get business category (convert array to string)*/
            $scope.getBusinessCategory = function(category){
               var category = category || [];
               var categoryString = '';
               if(category.length>0 && category!==undefined){
                   angular.forEach(category,function(cat){
                       categoryString+= ', '+cat.cat_id.category_name;  
                   });
                   return categoryString.replace(/^,|,$/g,''); 
               }else{
                   return '-';
               } 
               
            };  
        }]);
})();
