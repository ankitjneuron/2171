!(function() {
    'use strict';

    angular.module('bayaApp').controller('CmsController', ['$scope', '$state', '$location', '$rootScope', '$stateParams', '$ngBootbox', 'CmsService', 'UtilityService', function($scope, $state, $location, $rootScope, $stateParams, $ngBootbox, CmsService, UtilityService) {
            $scope.cms_image_path = "images/defult_icon.png";
            $scope.imageData = [];
            $scope.pageData = [];
            $scope.cmsImageCurrentPage = 1;
            $scope.currentTab = 'page';
            $scope.baseUrl = window.baseUrl;
            $scope.cmsPageCurrentPage = 1;
            
            $scope.editorOptions = {
                height: '300px'
            };


            /* Function for tab change */
            $scope.tabChange = function(id) {

                var tabId = angular.element(document.querySelector('#' + id));
                (id === 'image') ? $('#page').removeClass('active') : $('#image').removeClass('active');
                $scope.currentTab = (id === 'image') ? 'image' : 'page';
                tabId.addClass('active');
            };

            /* Create Category */
            $scope.saveImage = function() {
                if ($scope.imageTitle !== '' && $scope.imageTitle !== undefined && $scope.cmsImage !== '' && $scope.cmsImage !== undefined) {
                    $scope.titleError = false;
                    $scope.imageError = '';
                    $scope.disableImageBtn = true;
                    $scope.imageLoader = true;
                    CmsService.cmsImage({'title': $scope.imageTitle, image: $scope.cmsImage}, function(response) {
                        if (response.success) {
                            $scope.imageTitle = '';
                            $scope.cmsImage = '';
                            $scope.cms_image_path = "images/defult_icon.png";
                            document.getElementById('cmsImage').value = '';
                            UtilityService.showToast('success', Message.getSuccessMessage("image_success"));
                        } else {
                            UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                        }
                        $scope.disableImageBtn = false;
                        $scope.imageLoader = false;
                    }, function(error) {
                        $scope.disableImageBtn = false;
                        $scope.imageLoader = false;
                        UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                    });
                } else {
                    $scope.titleError = ($scope.imageTitle === '' || $scope.imageTitle === undefined) ? true : false;
                    $scope.imageError = ($scope.cmsImage === '' || $scope.cmsImage === undefined) ? 'Image is required.' : '';
                }
            };

            /*File onchange event*/
            document.getElementById('cmsImage').onchange = function() {
                $scope.cmsFile = this.value.split('.')[1];
                $scope.cmsFile = $scope.file.toLowerCase();
                if ($scope.cmsFile === 'gif' || $scope.cmsFile === 'png' || $scope.cmsFile === 'jpg' || $scope.cmsFile === 'jpeg') {
                    $scope.cms_image_path = URL.createObjectURL(this.files[0]);
                } else {
                    UtilityService.showToast('error', Message.getErrorMessage("invalid_file_formate"));
                }
            };

            /*Update Cms Page*/
            $scope.updatePage = function() {
                if ($scope.pageTitle !== '' && $stateParams.id!=='' && $stateParams.id!==undefined && $scope.pageTitle !== undefined && $scope.cmsPageContent !== null && $scope.cmsPageContent !== undefined) {
                    $scope.pageTitleError = false;
                    $scope.pageContentError = false;
                    $scope.disablePageUpdateBtn = true;
                    $scope.pageLoader = true;
                    $scope.data = {page_id: $stateParams.id,page_content:$scope.cmsPageContent};
                    CmsService.saveCmsPage($scope.data, function(response) {
                        if (response.success) {
                             UtilityService.showToast('success', Message.getSuccessMessage("cms_page_update_success"));  
                        }else{
                             UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                        }  
                       $scope.disablePageUpdateBtn = false;
                       $scope.pageLoader = false;
                    }, function(error) {
                        $scope.disablePageUpdateBtn = false;
                        $scope.pageLoader = false;
                        UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                    });

                } else {
                    $scope.pageTitleError = ($scope.pageTitle === '' || $scope.pageTitle === undefined) ? true : false;
                    $scope.pageContentError = ($scope.cmsPageContent === null || $scope.cmsPageContent === undefined) ? true : false;
                }
            };

            /* Get Image List */
            $scope.getImage = function() {
                $scope.cmsImageListLoader = true;
                $scope.cmsImageListPagination = false;
                $scope.imageData = [];
                CmsService.getImageList({page: $scope.cmsImageCurrentPage, search: $scope.searchValue}, function(response) {
                    if (response.success && response.data.items.length > 0) {
                        $scope.noCmsImageFound = false;
                        $scope.imageData = response.data.items;
                        $scope.cmsImageMaxSize = response.data.page;
                        $scope.cmsImageTotalItems = response.data.totalItems;
                        $scope.cmsImageListPagination = (response.data.page > 1) ? true : false;
                    } else {
                        $scope.noCmsImageFound = true;
                    }
                    $scope.cmsImageListLoader = false;
                }, function(error) {
                    $scope.cmsImageListLoader = false;
                });
            };

            /* Get page Detail */
            $scope.getPageDetail = function() {
                CmsService.getCmsPageDetail({id: $stateParams.id}, function(response) {
                    if (response.success) {
                        $scope.pageTitle = response.data.page_title;
                        $scope.cmsPageContent = response.data.page_content;
                    } else {
                        $state.go('admin.cmspage');
                    }
                  angular.element( document.querySelector( '#pageLoaderDiv' ) ).removeClass('overlay');
                  $scope.hidePageLoader = true;
                }, function(error) {
                    angular.element( document.querySelector( '#pageLoaderDiv' ) ).removeClass('overlay');
                    $scope.hidePageLoader = true;
                    $state.go('admin.cmspage');
                });
            };
            
            if ($state.current.name === 'admin.updatecmspage') {
                $scope.getPageDetail();
                 setTimeout(function(){
                   angular.element(document.querySelector( '.leftTab')).removeClass('active');
                   angular.element(document.querySelector( '#cmsManage')).addClass('active');    
                },200);
            }
            
            /* Get Page List */
            $scope.getCmsPage = function() {
                $scope.cmsPageListLoader = true;
                $scope.pageData = [];
                CmsService.getCmsPageList({page: $scope.cmsPageCurrentPage, search: $scope.searchValue}, function(response) {
                    if (response.success && response.data.items.length > 0) {
                        $scope.noCmsPageFound = false;
                        $scope.pageData = response.data.items;
                        $scope.cmsPageMaxSize = response.data.page;
                        $scope.cmsPageTotalItems = response.data.totalItems;
                        $scope.cmsPageListPagination = (response.data.page > 1) ? true : false;
                    } else {
                        $scope.noCmsPageFound = true;
                    }
                    $scope.cmsPageListLoader = false;
                }, function(error) {
                    $scope.cmsPageListLoader = false;
                });
            };

            if ($state.current.name === 'admin.cmspage') {
                $scope.getCmsPage();
            }

            
            /*File click Event*/
            $scope.fileClickEvent = function() {
                var fileElem = document.getElementById("categoryIcon");
                setTimeout(function() {
                    fileElem.click();
                }, 200);
            };



            /* Date Formate */
            $scope.getDate = function(date) {
                return UtilityService.getDate(date);
            };

            /*Delete category*/
            $scope.deleteImage = function(id, index) {
                $ngBootbox.hideAll();
                $ngBootbox.customDialog(
                    {
                        message: Message.getAlertMessage("cms_image_delete"),
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
                                    CmsService.deleteCmsImage({id: id}, function(response) {
                                        if (response.success) {
                                            $scope.imageData.splice(index, 1);
                                            if ($scope.imageData.length === 0) {
                                                $scope.noCmsImageFound = true;
                                            }
                                            UtilityService.showToast('success', Message.getSuccessMessage("image_delete"));
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


            /*Active left tab */
            if ($state.current.name === 'admin.addimage') {
                setTimeout(function() {
                    angular.element(document.querySelector('.leftTab')).removeClass('active');
                    angular.element(document.querySelector('#cmsManage')).addClass('active');
                }, 200);

            }
            
         $scope.searchResult = function(){
             if($scope.currentTab==='image')
                 $scope.getImage();
             else
                 $scope.getCmsPage();
         };   
        }]);
})();
