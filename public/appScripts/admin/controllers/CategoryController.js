!(function() {
    'use strict';

    angular.module('bayaApp').controller('CategoryController', ['$scope', '$state', '$location', '$rootScope', '$stateParams', '$ngBootbox', 'CategoryService', 'UtilityService', function($scope, $state, $location, $rootScope, $stateParams, $ngBootbox, CategoryService, UtilityService) {
            $scope.category = CategoryService.categoryForm;
            $scope.category.category_name = '';
            $scope.category.category_id = '';
            $scope.category_icon_path = "images/defult_icon.png";
            $scope.currentState = $state.current.name;
            $scope.catagoryData = [];
            $scope.categoryCurrentPage = 1;
             setTimeout(function() {
                    angular.element(document.querySelector('.leftTab')).removeClass('active');
                    angular.element(document.querySelector('#categoryEdit')).addClass('active');
                }, 200); 
            /* Create Category */
            $scope.saveCategory = function() {
                if ($scope.category.category_name !== '') {
                    $scope.categoryError = false;
                    $scope.categoryBtnDisable = true;
                    $scope.categoryBtnLoader = true;
                    $scope.category.category_icon = ($scope.categoryFile !== undefined) ? $scope.categoryFile : '';

                    CategoryService.category($scope.category, function(response) {
                        if (response.success) {
                            $scope.categoryFile = '';
                            UtilityService.showToast('success', ($scope.category.category_id === undefined || $scope.category.category_id === '') ? Message.getSuccessMessage("category_success") : Message.getSuccessMessage("category_update"));
                            $scope.category = {};
                            $state.go('admin.category');
                        } else {
                            UtilityService.showToast('error', response.message);
                        }
                        $scope.categoryBtnDisable = false;
                        $scope.categoryBtnLoader = false;
                    }, function(error) {
                        $scope.categoryBtnDisable = false;
                        $scope.categoryBtnLoader = false;
                        UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                    });
                } else {
                    $scope.categoryError = true;
                }
            };

            /* Category List */
            $scope.categoryList = function() {
                $scope.categoryListLoader = true;
                $scope.categoryListPagination = false;
                $scope.catagoryData = [];
                CategoryService.categoryList({page: $scope.categoryCurrentPage, category_name: $scope.searchCategory}, function(response) {
                    if (response.success && response.data.items.length > 0) {
                        $scope.noCategoryFound = false;
                        $scope.catagoryData = response.data.items;
                        $scope.categoryMaxSize = response.data.page;
                        $scope.categoryTotalItems = response.data.totalItems;
                        $scope.categoryListPagination = (response.data.page > 1) ? true : false;
                    } else {
                        $scope.noCategoryFound = true;
                    }
                    $scope.categoryListLoader = false;
                }, function(error) {
                    $scope.categoryListLoader = false;
                });
            };
            if ($state.current.name === 'admin.category') {
                $scope.categoryList();
            }


            /* Edit Category */
            $scope.editCategory = function() {
                
                CategoryService.categoryDetail({id: $stateParams.id}, function(response) {
                    if (response.success) {
                        //$scope.category = response.data;
                        if (response.data.category_icon !== undefined && response.data.category_icon !== '') {
                            $scope.category_icon_path = "uploads/category/" + response.data.category_icon;
                        }
                        $scope.category.category_name = response.data.category_name;
                        $scope.category.category_id = response.data._id;
                    } else {
                    }
                }, function(error) {
                    UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                });
            };

            if ($state.current.name === 'admin.editcategory') {
                $scope.editCategory();
            }
            /*File click Event*/
            $scope.fileClickEvent = function() {
                var fileElem = document.getElementById("categoryIcon");
                setTimeout(function() {
                    fileElem.click();
                }, 200);
            };

            /*File onchange event*/
            document.getElementById('categoryIcon').onchange = function() {
                $scope.categoryFile = this.value.split('.')[1];
                $scope.categoryFile = $scope.categoryFile.toLowerCase();
                if ($scope.categoryFile === 'gif' || $scope.categoryFile === 'png' || $scope.categoryFile === 'jpg' || $scope.categoryFile === 'jpeg') {
                    $scope.category_icon_path = URL.createObjectURL(this.files[0]);
                } else {
                    UtilityService.showToast('error', Message.getErrorMessage("invalid_file_formate"));
                }
            };

            /* Date Formate */
            $scope.getDate = function(date) {
                return UtilityService.getDate(date);
            };

            /*Delete category*/
            $scope.deleteCategory = function(id, index) {
                $ngBootbox.hideAll();
                $ngBootbox.customDialog(
                    {
                        message: Message.getAlertMessage("category_delete"),
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
                                    CategoryService.deleteCategory({id: id}, function(response) {
                                        if (response.success) {
                                            $scope.catagoryData.splice(index, 1);
                                            if ($scope.catagoryData.length === 0) {
                                                $scope.noCategoryFound = true;
                                            }
                                            UtilityService.showToast('success',Message.getSuccessMessage("category_delete"));
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
            
            /* Change  status for category */
             $scope.changeCategoryStatus = function(enabled,id) {
                CategoryService.changeStatus({enabled: (enabled) ? 'active' : 'inactive',id:id }, function(response) {
                    if (response.success) {
                        UtilityService.showToast('success', Message.getSuccessMessage("updateCategoryStatus"));
                      
                    } else {
                        UtilityService.showToast('error',Message.getErrorMessage("api_error"));
                    }
                 
                }, function(error) {
                });
            };

        }]);
})();
