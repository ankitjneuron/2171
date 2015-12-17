!(function() {
    'use strict';
    angular.module('bayaApp').controller('ManageDoctorsController', ['$scope', '$state', '$injector', '$location', '$rootScope', '$modal', '$ngBootbox','$stateParams', 'ManageDoctorsService', 'UtilityService', function($scope, $state, $injector, $location, $rootScope, $modal, $ngBootbox,$stateParams, ManageDoctorsService, UtilityService) {
            $scope.doctorForm = ManageDoctorsService.DoctorFormForm;
            $scope.doctorForm = {};
            $scope.speciality = [];
            $scope.specialityData = [];
            $scope.specialityArray = [];
            $scope.specialityText = {buttonDefaultText: 'Select Speciality:'};
            $scope.doctorForm.specialityHddn = '';
            $scope.doctorForm.speciality = [];
            $scope.myBusinessInfo = UtilityService.getLocalStorage('myBusiness');
            $scope.doctorProfileImageSrc = baseUrl + 'images/default-profileimage.jpg';
            $scope.myBusinessInfo = UtilityService.getLocalStorage('myBusiness');
            $scope.doctorData = [];
           
            setTimeout(function() {
                angular.element(document.querySelector('.leftTab')).removeClass('active');
                angular.element(document.querySelector('#doctorlist')).addClass('active');
            }, 200);

            if ($state.current.name === 'user.adddoctor' || $state.current.name === 'user.updatedoctor') {
                /* Get category list */
                ManageDoctorsService.getCategoryList('', function(response) {
                    angular.forEach(response.data, function(value, key) {
                        $scope.specialityData.push({id: value._id, label: value.category_name});
                    });
                }, function(error) {
                    UtilityService.showToast('error', error.message);
                });

                $scope.specialityEvents = {
                    onItemDeselect: function(item) {
                        $scope.setSpeciality();
                        if ($scope.doctorForm.speciality.length === 0) {
                            $scope.doctorForm.specialityHddn = '';
                        }
                    },
                    onItemSelect: function(item) {
                        $scope.setSpeciality();
                        $scope.doctorForm.specialityHddn = 'check';
                    }
                };

                 $scope.multiSelectSettings = {selectionLimit: 0, scrollable: true ,scrollableHeight: '150px', smartButtonMaxItems: 3,closeOnSelect: true, closeOnDeselect: true,showCheckAll: false, showUncheckAll: false, smartButtonTextConverter: function(itemText, originalItem) {
                    return itemText;
                }};
                $scope.setSpeciality = function() {
                    $scope.specialityArray = [];
                    angular.forEach($scope.speciality, function(cat) {
                        $scope.specialityArray.push(cat.id);
                    });
                    $scope.doctorForm.speciality = $scope.specialityArray;
                };

                /*File onchange event*/
                document.getElementById('doctorProfileImgId').onchange = function() {
                    $scope.file = this.value.split('.')[1];
                    $scope.file = $scope.file.toLowerCase();
                    if ($scope.file === 'gif' || $scope.file === 'png' || $scope.file === 'jpg' || $scope.file === 'jpeg') {
                        $scope.doctorProfileImageSrc = URL.createObjectURL(this.files[0]);
                    } else {
                        UtilityService.showToast('error', Message.getErrorMessage("invalid_file_formate"));
                    }
                };
            }

            /* File click event */
            $scope.fileClickEvent = function() {
                var fileElem = document.getElementById("doctorProfileImgId");
                setTimeout(function() {
                    fileElem.click();
                }, 200);
            };

            /* Save doctor */
            $scope.saveDoctor = function() {
                if ($scope.form.$valid) {
                    $scope.doctorForm.listing_id = $scope.myBusinessInfo._id;
                    $scope.doctorForm.image = ($scope.doctorImage !== undefined) ? $scope.doctorImage : '';
                    $scope.doctorForm.doctor_id = ($stateParams.id!=='' && $stateParams.id!==undefined) ? $stateParams.id : '';
                     if($state.current.name==='user.updatedoctor'){
                         $scope.setSpeciality();
                     }
                    ManageDoctorsService.saveDoctors($scope.doctorForm, function(response) {
                        if (response.success) {
                            $scope.doctorForm = {};
                            $scope.doctorProfileImageSrc = '';
                            UtilityService.showToast('success', Message.getSuccessMessage('doctor_save_success'));
                            $state.go('user.doctorlist');
                        } else {
                            UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                        }
                    }, function(error) {
                        UtilityService.showToast('error', error.message);
                    });
                }
            };


            /* Save doctor */
            $scope.getDoctorList = function() {
                $scope.doctorListLoader = true;
                $scope.noDoctorListFound = false;
                $scope.doctorData = [];
                ManageDoctorsService.getDoctorList({id: $scope.myBusinessInfo._id, search: $scope.searchVal}, function(response) {
                    if (response.success && response.data.length) {
                        $scope.doctorData = response.data;
                    } else {
                        $scope.noDoctorListFound = true;
                    }
                    $scope.doctorListLoader = false;

                }, function(error) {
                    $scope.doctorListLoader = false;
                    $scope.noDoctorListFound = true;
                });
            };


            if ($state.current.name === 'user.doctorlist' && $scope.myBusinessInfo !== '' && $scope.myBusinessInfo !== undefined && $scope.myBusinessInfo !== false) {
                $scope.hideDoctorAddBtn = false;
                $scope.getDoctorList();
            } else {
                $scope.hideDoctorAddBtn = true;
            }

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

            /*Delete doctor*/
            $scope.deleteDoctor = function(id, index) {
                $ngBootbox.hideAll();
                $ngBootbox.customDialog(
                    {
                        message: Message.getAlertMessage("doctor_delete"),
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
                                    ManageDoctorsService.deleteDoctor({doctor_id: id, listing_id: $scope.myBusinessInfo._id}, function(response) {
                                        if (response.success) {
                                            $scope.doctorData.splice(index, 1);
                                            if ($scope.doctorData.length === 0) {
                                                $scope.noDoctorListFound = true;
                                            }
                                            UtilityService.showToast('success', Message.getSuccessMessage("doctor_delete"));
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
            
            if($state.current.name==='user.updatedoctor'){
                $scope.specialityArray = [];
                angular.element(document.querySelector('#doctorProfileLoaderDiv')).addClass('overlay');
                $scope.hidePageLoader = true;
                ManageDoctorsService.getDoctorDetail({listing_id: $scope.myBusinessInfo._id, doctor_id: $stateParams.id}, function(response) {
                    if (response.success && response.data) {
                            $scope.doctorForm = response.data;
                            $scope.doctorProfileImageSrc = 'uploads/profile/'+response.data.image;
                             angular.forEach(response.data.speciality, function(cat) {
                                $scope.specialityArray.push({id: cat.cat_id});
                            });
                            $scope.speciality = $scope.specialityArray;
                            $scope.doctorForm.specialityHddn = "check";
                    }else{
                        $state.go('user.doctorlist');
                    }
                    angular.element(document.querySelector('#doctorProfileLoaderDiv')).removeClass('overlay');
                    $scope.hidePageLoader = false;
           
                }, function(error) {
                     $state.go('user.doctorlist');
                   angular.element(document.querySelector('#doctorProfileLoaderDiv')).removeClass('overlay');
                   $scope.hidePageLoader = false;
                });
            }

        }]);
})();
