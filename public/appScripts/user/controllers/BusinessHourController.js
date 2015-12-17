!(function() {
    'use strict';
    angular.module('bayaApp').controller('BusinessHourController', ['$scope', '$state', '$injector', '$location', '$rootScope', '$modal', '$ngBootbox', '$stateParams', 'ManageBusinessHourService', 'UtilityService', 'CommonUtility', function($scope, $state, $injector, $location, $rootScope, $modal, $ngBootbox, $stateParams, ManageBusinessHourService, UtilityService, CommonUtility) {
            $scope.myBusinessInfo = UtilityService.getLocalStorage('myBusiness');
            $scope.timeSlot = 30;
            $scope.availabilityData = [];
            /*Drop Down Options*/
            $scope.optionsData = CommonUtility.getBusinessHours();
            angular.element(document.querySelector('#businessHourLoaderDiv')).removeClass('overlay');
            $scope.hidePageLoader = false;
            $scope.mondayAvailabilityId = '';
            $scope.tuesdayAvailabilityId = '';
            $scope.wednesdayAvailabilityId = '';
            $scope.thursdayAvailabilityId = '';
            $scope.fridayAvailabilityId = '';
            $scope.saturdayAvailabilityId = '';
            $scope.sundayAvailabilityId = '';
            $scope.settings = {
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
            /*Moday From Dropdown*/
            $scope.mondayFrom = {};
            $scope.mondayFromText = {buttonDefaultText: 'Select Time'};
            $scope.mondayTo = {};
            $scope.mondayToText = {buttonDefaultText: 'Select Time'};
            $scope.mondayFromVal = '';
            $scope.mondayToVal = '';
            $scope.mondayError = false;
            $scope.mondayFromEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.mondayFromVal === '' && $scope.mondayFromVal !== item) {
                        $scope.mondayFromVal = item;
                        $scope.mondayFrom = item;
                    } else {
                        $scope.mondayFrom = {};
                        $scope.mondayFromVal = '';
                    }

                    if (($scope.mondayFrom.id !== undefined && $scope.mondayTo.id === undefined)
                        || ($scope.mondayFrom.id === undefined && $scope.mondayTo.id !== undefined)) {
                        $scope.mondayError = true;
                    }

                    if (($scope.mondayFrom.id === undefined && $scope.mondayTo.id === undefined) || ($scope.mondayFrom.id !== undefined && $scope.mondayTo.id !== undefined)) {
                        $scope.mondayError = false;
                    }

                }
            };


            $scope.mondayToEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.mondayToVal === '' && $scope.mondayToVal !== item) {
                        $scope.mondayToVal = item;
                        $scope.mondayTo = item;
                    } else {
                        $scope.mondayTo = {};
                        $scope.mondayToVal = '';
                    }

                    if (($scope.mondayFrom.id !== undefined && $scope.mondayTo.id === undefined)
                        || ($scope.mondayFrom.id === undefined && $scope.mondayTo.id !== undefined)) {
                        $scope.mondayError = true;
                    }

                    if (($scope.mondayFrom.id === undefined && $scope.mondayTo.id === undefined) || ($scope.mondayFrom.id !== undefined && $scope.mondayTo.id !== undefined)) {
                        $scope.mondayError = false;
                    }


                }
            };


            /*Tuesday From Dropdown*/
            $scope.tuesdayFrom = {};
            $scope.tuesdayFromText = {buttonDefaultText: 'Select Time'};
            $scope.tuesdayTo = {};
            $scope.tuesdayToText = {buttonDefaultText: 'Select Time'};
            $scope.tuesdayFromVal = '';
            $scope.tuesdayToVal = '';
            $scope.tuesdayError = false;
            $scope.tuesdayFromEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.tuesdayFromVal === '' && $scope.tuesdayFromVal !== item) {
                        $scope.tuesdayFromVal = item;
                        $scope.tuesdayFrom = item;
                    } else {
                        $scope.tuesdayFrom = {};
                        $scope.tuesdayFromVal = '';
                    }
                    if (($scope.tuesdayFrom.id !== undefined && $scope.tuesdayTo.id === undefined)
                        || ($scope.tuesdayFrom.id === undefined && $scope.tuesdayTo.id !== undefined)) {
                        $scope.tuesdayError = true;
                    }

                    if (($scope.tuesdayFrom.id === undefined && $scope.tuesdayTo.id === undefined) || ($scope.tuesdayFrom.id !== undefined && $scope.tuesdayTo.id !== undefined)) {
                        $scope.tuesdayError = false;
                    }
                }
            };


            $scope.tuesdayToEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.tuesdayToVal === '' && $scope.tuesdayToVal !== item) {
                        $scope.tuesdayToVal = item;
                        $scope.tuesdayTo = item;
                    } else {
                        $scope.tuesdayTo = {};
                        $scope.tuesdayToVal = '';
                    }

                    if (($scope.tuesdayFrom.id !== undefined && $scope.tuesdayTo.id === undefined)
                        || ($scope.tuesdayFrom.id === undefined && $scope.tuesdayTo.id !== undefined)) {
                        $scope.tuesdayError = true;
                    }

                    if (($scope.tuesdayFrom.id === undefined && $scope.tuesdayTo.id === undefined) || ($scope.tuesdayFrom.id !== undefined && $scope.tuesdayTo.id !== undefined)) {
                        $scope.tuesdayError = false;
                    }
                }
            };


            /*Wednesday From Settings*/
            $scope.wednesdayFrom = {};
            $scope.wednesdayFromText = {buttonDefaultText: 'Select Time'};
            $scope.wednesdayTo = {};
            $scope.wednesdayToText = {buttonDefaultText: 'Select Time'};
            $scope.wednesdayFromVal = '';
            $scope.wednesdayToVal = '';
            $scope.wednesdayError = false;
            $scope.wednesdayFromEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.wednesdayFromVal === '' && $scope.wednesdayFromVal !== item) {
                        $scope.wednesdayFromVal = item;
                        $scope.wednesdayFrom = item;
                    } else {
                        $scope.wednesdayFrom = {};
                        $scope.wednesdayFromVal = '';
                    }

                    if (($scope.wednesdayFrom.id !== undefined && $scope.wednesdayTo.id === undefined)
                        || ($scope.wednesdayFrom.id === undefined && $scope.wednesdayTo.id !== undefined)) {
                        $scope.wednesdayError = true;
                    }

                    if (($scope.wednesdayFrom.id === undefined && $scope.wednesdayTo.id === undefined) || ($scope.wednesdayFrom.id !== undefined && $scope.wednesdayTo.id !== undefined)) {
                        $scope.wednesdayError = false;
                    }
                }
            };

            $scope.wednesdayToEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.wednesdayToVal === '' && $scope.wednesdayToVal !== item) {
                        $scope.wednesdayToVal = item;
                        $scope.wednesdayTo = item;
                    } else {
                        $scope.wednesdayTo = {};
                        $scope.wednesdayToVal = '';
                    }

                    if (($scope.wednesdayFrom.id !== undefined && $scope.wednesdayTo.id === undefined)
                        || ($scope.wednesdayFrom.id === undefined && $scope.wednesdayTo.id !== undefined)) {
                        $scope.wednesdayError = true;
                    }

                    if (($scope.wednesdayFrom.id === undefined && $scope.wednesdayTo.id === undefined) || ($scope.wednesdayFrom.id !== undefined && $scope.wednesdayTo.id !== undefined)) {
                        $scope.wednesdayError = false;
                    }
                }
            };

            /*Thursday From Settings*/
            $scope.thursdayFrom = {};
            $scope.thursdayFromText = {buttonDefaultText: 'Select Time'};
            $scope.thursdayTo = {};
            $scope.thursdayToText = {buttonDefaultText: 'Select Time'};
            $scope.thursdayFromVal = '';
            $scope.thursdayToVal = '';
            $scope.thursdayError = false;
            $scope.thursdayFromEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.thursdayFromVal === '' && $scope.thursdayFromVal !== item) {
                        $scope.thursdayFromVal = item;
                        $scope.thursdayFrom = item;
                    } else {
                        $scope.thursdayFrom = {};
                        $scope.thursdayFromVal = '';
                    }

                    if (($scope.thursdayFrom.id !== undefined && $scope.thursdayTo.id === undefined)
                        || ($scope.thursdayFrom.id === undefined && $scope.thursdayTo.id !== undefined)) {
                        $scope.thursdayError = true;
                    }

                    if (($scope.thursdayFrom.id === undefined && $scope.thursdayTo.id === undefined) || ($scope.thursdayFrom.id !== undefined && $scope.thursdayTo.id !== undefined)) {
                        $scope.thursdayError = false;
                    }
                }
            };
            $scope.thursdayToEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.thursdayToVal === '' && $scope.thursdayToVal !== item) {
                        $scope.thursdayToVal = item;
                        $scope.thursdayTo = item;
                    } else {
                        $scope.thursdayTo = {};
                        $scope.thursdayToVal = '';
                    }

                    if (($scope.thursdayFrom.id !== undefined && $scope.thursdayTo.id === undefined)
                        || ($scope.thursdayFrom.id === undefined && $scope.thursdayTo.id !== undefined)) {
                        $scope.thursdayError = true;
                    }

                    if (($scope.thursdayFrom.id === undefined && $scope.thursdayTo.id === undefined) || ($scope.thursdayFrom.id !== undefined && $scope.thursdayTo.id !== undefined)) {
                        $scope.thursdayError = false;
                    }
                }
            };

            /*Friday From Settings*/
            $scope.fridayFrom = {};
            $scope.fridayFromText = {buttonDefaultText: 'Select Time'};
            $scope.fridayTo = {};
            $scope.fridayToText = {buttonDefaultText: 'Select Time'};
            $scope.fridayFromVal = '';
            $scope.fridayToVal = '';
            $scope.fridayError = false;
            $scope.fridayFromEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.fridayFromVal === '' && $scope.fridayFromVal !== item) {
                        $scope.fridayFromVal = item;
                        $scope.fridayFrom = item;
                    } else {
                        $scope.fridayFrom = {};
                        $scope.fridayFromVal = '';
                    }

                    if (($scope.fridayFrom.id !== undefined && $scope.fridayTo.id === undefined)
                        || ($scope.fridayFrom.id === undefined && $scope.fridayTo.id !== undefined)) {
                        $scope.fridayError = true;
                    }

                    if (($scope.fridayFrom.id === undefined && $scope.fridayTo.id === undefined) || ($scope.fridayFrom.id !== undefined && $scope.fridayTo.id !== undefined)) {
                        $scope.fridayError = false;
                    }

                }
            };


            $scope.fridayToEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.fridayToVal === '' && $scope.fridayToVal !== item) {
                        $scope.fridayToVal = item;
                        $scope.fridayTo = item;
                    } else {
                        $scope.fridayTo = {};
                        $scope.fridayToVal = '';
                    }

                    if (($scope.fridayFrom.id !== undefined && $scope.fridayTo.id === undefined)
                        || ($scope.fridayFrom.id === undefined && $scope.fridayTo.id !== undefined)) {
                        $scope.fridayError = true;
                    }

                    if (($scope.fridayFrom.id === undefined && $scope.fridayTo.id === undefined) || ($scope.fridayFrom.id !== undefined && $scope.fridayTo.id !== undefined)) {
                        $scope.fridayError = false;
                    }
                }
            };

            /*Saturday From Settings*/
            $scope.saturdayFrom = {};
            $scope.saturdayFromText = {buttonDefaultText: 'Select Time'};
            $scope.saturdayTo = {};
            $scope.saturdayToText = {buttonDefaultText: 'Select Time'};
            $scope.saturdayFromVal = '';
            $scope.saturdayToVal = '';
            $scope.saturdayError = false;
            $scope.saturdayFromEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.saturdayFromVal === '' && $scope.saturdayFromVal !== item) {
                        $scope.saturdayFromVal = item;
                        $scope.saturdayFrom = item;
                    } else {
                        $scope.saturdayFrom = {};
                        $scope.saturdayFromVal = '';
                    }

                    if (($scope.saturdayFrom.id !== undefined && $scope.saturdayTo.id === undefined)
                        || ($scope.saturdayFrom.id === undefined && $scope.saturdayTo.id !== undefined)) {
                        $scope.saturdayError = true;
                    }

                    if (($scope.saturdayFrom.id === undefined && $scope.saturdayTo.id === undefined) || ($scope.saturdayFrom.id !== undefined && $scope.saturdayTo.id !== undefined)) {
                        $scope.saturdayError = false;
                    }
                }
            };


            $scope.saturdayToEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.saturdayToVal === '' && $scope.saturdayToVal !== item) {
                        $scope.saturdayToVal = item;
                        $scope.saturdayTo = item;
                    } else {
                        $scope.saturdayTo = {};
                        $scope.saturdayToVal = '';
                    }

                    if (($scope.saturdayFrom.id !== undefined && $scope.saturdayTo.id === undefined)
                        || ($scope.saturdayFrom.id === undefined && $scope.saturdayTo.id !== undefined)) {
                        $scope.saturdayError = true;
                    }

                    if (($scope.saturdayFrom.id === undefined && $scope.saturdayTo.id === undefined) || ($scope.saturdayFrom.id !== undefined && $scope.saturdayTo.id !== undefined)) {
                        $scope.saturdayError = false;
                    }
                }
            };

            /*Sunday From Settings*/
            $scope.sundayFrom = {};
            $scope.sundayFromText = {buttonDefaultText: 'Select Time'};
            $scope.sundayTo = {};
            $scope.sundayToText = {buttonDefaultText: 'Select Time'};
            $scope.sundayFromVal = '';
            $scope.sundayToVal = '';
            $scope.sundayError = false;
            $scope.sundayFromEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.sundayFromVal === '' && $scope.sundayFromVal !== item) {
                        $scope.sundayFromVal = item;
                        $scope.sundayFrom = item;
                    } else {
                        $scope.sundayFrom = {};
                        $scope.sundayFromVal = '';
                    }

                    if (($scope.sundayFrom.id !== undefined && $scope.sundayTo.id === undefined)
                        || ($scope.sundayFrom.id === undefined && $scope.sundayTo.id !== undefined)) {
                        $scope.sundayError = true;
                    }

                    if (($scope.sundayFrom.id === undefined && $scope.sundayTo.id === undefined) || ($scope.sundayFrom.id !== undefined && $scope.sundayTo.id !== undefined)) {
                        $scope.sundayError = false;
                    }
                }
            };
            $scope.sundayToEvents = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {
                    if ($scope.sundayToVal === '' && $scope.sundayToVal !== item) {
                        $scope.sundayToVal = item;
                        $scope.sundayTo = item;
                    } else {
                        $scope.sundayTo = {};
                        $scope.sundayToVal = '';
                    }

                    if (($scope.sundayFrom.id !== undefined && $scope.sundayTo.id === undefined)
                        || ($scope.sundayFrom.id === undefined && $scope.sundayTo.id !== undefined)) {
                        $scope.sundayError = true;
                    }

                    if (($scope.sundayFrom.id === undefined && $scope.sundayTo.id === undefined) || ($scope.sundayFrom.id !== undefined && $scope.sundayTo.id !== undefined)) {
                        $scope.sundayError = false;
                    }
                }
            };
            $scope.mondayEnabled = false;
            $scope.tuesdayEnabled = false;
            $scope.wednesdayEnabled = false;
            $scope.thursdayEnabled = false;
            $scope.fridayEnabled = false;
            $scope.saturdayEnabled = false;
            $scope.sundayEnabled = false;
            /* Save and Update Business Hours*/
            $scope.saveBusinessHour = function() {
                $scope.availabilityArray = {};
                $scope.availabilityArray = {"availability_slot": $scope.timeSlot, "listing_id": $scope.myBusinessInfo._id};
                $scope.availabilityArray.availability = [];

                /*Check monday*/
                if ($scope.mondayFrom.id !== undefined && $scope.mondayTo.id !== undefined) {
                    $scope.mondayObj = {"availability_day": "Monday", "availability_status": ($scope.mondayEnabled) ? "yes" : "no", "availability_from": $scope.mondayFrom.id, "availability_to": $scope.mondayTo.id, "availability_schedule_from": "AM", "availability_schedule_to": "PM"};
                    if ($scope.mondayAvailabilityId !== '') {
                        $scope.mondayObj._id = $scope.mondayAvailabilityId;
                    }
                    ;
                    $scope.availabilityArray.availability.push($scope.mondayObj);
                }

                /*Check tuesday*/
                if ($scope.tuesdayFrom.id !== undefined && $scope.tuesdayTo.id !== undefined) {
                    $scope.tuesdayObj = {"availability_day": "Tuesday", "availability_status": ($scope.tuesdayEnabled) ? "yes" : "no", "availability_from": $scope.tuesdayFrom.id, "availability_to": $scope.tuesdayTo.id, "availability_schedule_from": "AM", "availability_schedule_to": "PM"};
                    if ($scope.tuesdayAvailabilityId !== '') {
                        $scope.tuesdayObj._id = $scope.tuesdayAvailabilityId;
                    }
                    ;
                    $scope.availabilityArray.availability.push($scope.tuesdayObj);
                }

                /*Check wednesday*/
                if ($scope.wednesdayFrom.id !== undefined && $scope.wednesdayTo.id !== undefined) {
                    $scope.wednesdayObj = {"availability_day": "Wednesday", "availability_status": ($scope.wednesdayEnabled) ? "yes" : "no", "availability_from": $scope.wednesdayFrom.id, "availability_to": $scope.wednesdayTo.id, "availability_schedule_from": "AM", "availability_schedule_to": "PM"};
                    if ($scope.wednesdayAvailabilityId !== '') {
                        $scope.wednesdayObj._id = $scope.wednesdayAvailabilityId;
                    }
                    ;
                    $scope.availabilityArray.availability.push($scope.wednesdayObj);
                }

                /*Check thursday*/
                if ($scope.thursdayFrom.id !== undefined && $scope.thursdayTo.id !== undefined) {
                    $scope.thursdayObj = {"availability_day": "Thursday", "availability_status": ($scope.thursdayEnabled) ? "yes" : "no", "availability_from": $scope.thursdayFrom.id, "availability_to": $scope.thursdayTo.id, "availability_schedule_from": "AM", "availability_schedule_to": "PM"};
                    if ($scope.thursdayAvailabilityId !== '') {
                        $scope.thursdayObj._id = $scope.thursdayAvailabilityId;
                    }
                    ;
                    $scope.availabilityArray.availability.push($scope.thursdayObj);
                }

                /*Check friday*/
                if ($scope.fridayFrom.id !== undefined && $scope.fridayTo.id !== undefined) {
                    $scope.fridayObj = {"availability_day": "Friday", "availability_status": ($scope.fridayEnabled) ? "yes" : "no", "availability_from": $scope.fridayFrom.id, "availability_to": $scope.fridayTo.id, "availability_schedule_from": "AM", "availability_schedule_to": "PM"};
                    if ($scope.fridayAvailabilityId !== '') {
                        $scope.fridayObj._id = $scope.fridayAvailabilityId;
                    }
                    ;
                    $scope.availabilityArray.availability.push($scope.fridayObj);
                }

                /*Check saturday*/
                if ($scope.saturdayFrom.id !== undefined && $scope.saturdayTo.id !== undefined) {
                    $scope.saturdayObj = {"availability_day": "Saturday", "availability_status": ($scope.saturdayEnabled) ? "yes" : "no", "availability_from": $scope.saturdayFrom.id, "availability_to": $scope.saturdayTo.id, "availability_schedule_from": "AM", "availability_schedule_to": "PM"};
                    if ($scope.saturdayAvailabilityId !== '') {
                        $scope.saturdayObj._id = $scope.saturdayAvailabilityId;
                    }
                    ;
                    $scope.availabilityArray.availability.push($scope.saturdayObj);
                }

                /*Check sunday*/
                if ($scope.sundayFrom.id !== undefined && $scope.sundayTo.id !== undefined) {
                    $scope.sundayObj = {"availability_day": "Sunday", "availability_status": ($scope.sundayEnabled) ? "yes" : "no", "availability_from": $scope.sundayFrom.id, "availability_to": $scope.sundayTo.id, "availability_schedule_from": "AM", "availability_schedule_to": "PM"};
                    if ($scope.sundayAvailabilityId !== '') {
                        $scope.sundayObj._id = $scope.sundayAvailabilityId;
                    }
                    ;
                    $scope.availabilityArray.availability.push($scope.sundayObj);
                }

               
                if (!$scope.mondayError && !$scope.tuesdayError && !$scope.wednesdayError && !$scope.thursdayError && !$scope.fridayError && !$scope.saturdayError && !$scope.sundayError
                    && $scope.mondayFrom.id!==undefined && $scope.mondayTo.id!==undefined && $scope.tuesdayFrom.id!==undefined && $scope.tuesdayTo.id!==undefined && $scope.wednesdayFrom.id!==undefined && $scope.wednesdayTo.id!==undefined
                     && $scope.thursdayFrom.id!==undefined && $scope.thursdayTo.id!==undefined && $scope.fridayFrom.id!==undefined && $scope.fridayTo.id!==undefined && $scope.saturdayFrom.id!==undefined && $scope.saturdayTo.id!==undefined && $scope.sundayFrom.id!==undefined && $scope.sundayTo.id!==undefined) {
                    $scope.addBusinessHoursLoader = true;
                     $scope.businessHoursBtnDisable = true;
                    ManageBusinessHourService.addBusinessHours($scope.availabilityArray, function(response) {
                        if (response.success) {
                            $rootScope.userDashboard();
                            UtilityService.showToast('success', Message.getSuccessMessage("submit_availability"));
                        } else {
                            UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                        }
                        $scope.businessHoursBtnDisable = false;
                        $scope.addBusinessHoursLoader = false;
                    }, function(error) {
                         $scope.businessHoursBtnDisable = false;
                         $scope.addBusinessHoursLoader = false;
                        UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                    });
                }else{
                    $ngBootbox.alert('Please select business hours.')
                            .then(function() {
                                
                            });
                }

            };

            $scope.getBusinessHours = function() {
                angular.element(document.querySelector('#businessHourLoaderDiv')).addClass('overlay');
                $scope.hidePageLoader = true;
                $scope.mondayAvailabilityId = '';
                $scope.tuesdayAvailabilityId = '';
                $scope.wednesdayAvailabilityId = '';
                $scope.thursdayAvailabilityId = '';
                $scope.fridayAvailabilityId = '';
                $scope.saturdayAvailabilityId = '';
                $scope.sundayAvailabilityId = '';
                ManageBusinessHourService.getBusinessHours($scope.myBusinessInfo._id, function(response) {
                    if (response.success && response.data.listing_detail) {
                        if (response.data.listing_detail.availability) {
                            $scope.timeSlot = response.data.listing_detail.availability.availability_slot;
                            if (response.data.listing_detail.availability.availability.length) {
                                angular.forEach(response.data.listing_detail.availability.availability, function(data) {
                                    switch (data.availability_day) {
                                        case "Monday":
                                            $scope.mondayAvailabilityId = data._id;
                                            $scope.mondayFrom = {"id": data.availability_from};
                                            $scope.mondayTo = {"id": data.availability_to};
                                            $scope.mondayFromVal = {"id": data.availability_from};
                                            $scope.mondayToVal = {"id": data.availability_to};
                                            $scope.mondayEnabled = (data.availability_status === "yes") ? true : false;
                                            break;
                                        case "Tuesday":
                                            $scope.tuesdayAvailabilityId = data._id;
                                            $scope.tuesdayFrom = {"id": data.availability_from};
                                            $scope.tuesdayTo = {"id": data.availability_to};
                                            $scope.tuesdayFromVal = {"id": data.availability_from};
                                            $scope.tuesdayToVal = {"id": data.availability_to};
                                            $scope.tuesdayEnabled = (data.availability_status === "yes") ? true : false;
                                            break;
                                        case "Wednesday":
                                            $scope.wednesdayAvailabilityId = data._id;
                                            $scope.wednesdayFrom = {"id": data.availability_from};
                                            $scope.wednesdayTo = {"id": data.availability_to};
                                            $scope.wednesdayFromVal = {"id": data.availability_from};
                                            $scope.wednesdayToVal = {"id": data.availability_to};
                                            $scope.wednesdayEnabled = (data.availability_status === "yes") ? true : false;
                                            break;
                                        case "Thursday":
                                            $scope.thursdayAvailabilityId = data._id;
                                            $scope.thursdayFrom = {"id": data.availability_from};
                                            $scope.thursdayTo = {"id": data.availability_to};
                                            $scope.thursdayFromVal = {"id": data.availability_from};
                                            $scope.thursdayToVal = {"id": data.availability_to};
                                            $scope.thursdayEnabled = (data.availability_status === "yes") ? true : false;
                                            break;
                                        case "Friday":
                                            $scope.fridayAvailabilityId = data._id;
                                            $scope.fridayFrom = {"id": data.availability_from};
                                            $scope.fridayTo = {"id": data.availability_to};
                                            $scope.fridayFromVal = {"id": data.availability_from};
                                            $scope.fridayToVal = {"id": data.availability_to};
                                            $scope.fridayEnabled = (data.availability_status === "yes") ? true : false;
                                            break;
                                        case "Saturday":
                                            $scope.saturdayAvailabilityId = data._id;
                                            $scope.saturdayFrom = {"id": data.availability_from};
                                            $scope.saturdayTo = {"id": data.availability_to};
                                            $scope.saturdayFromVal = {"id": data.availability_from};
                                            $scope.saturdayToVal = {"id": data.availability_to};
                                            $scope.saturdayEnabled = (data.availability_status === "yes") ? true : false;
                                            break;
                                        case "Sunday":
                                            $scope.sundayAvailabilityId = data._id;
                                            $scope.sundayFrom = {"id": data.availability_from};
                                            $scope.sundayTo = {"id": data.availability_to};
                                            $scope.sundayFromVal = {"id": data.availability_from};
                                            $scope.sundayToVal = {"id": data.availability_to};
                                            $scope.sundayEnabled = (data.availability_status === "yes") ? true : false;
                                            break;
                                    }

                                });
                            }

                        }
                    } else {
                        $state.go('user.dashboard');
                    }
                    angular.element(document.querySelector('#businessHourLoaderDiv')).removeClass('overlay');
                    $scope.hidePageLoader = false;
                }, function(error) {
                    angular.element(document.querySelector('#businessHourLoaderDiv')).removeClass('overlay');
                    $scope.hidePageLoader = false;
                    $state.go('user.dashboard');
                    UtilityService.showToast('error', Message.getErrorMessage("api_error"));
                });
            };

            $scope.getBusinessHours();


        }]);
})();
