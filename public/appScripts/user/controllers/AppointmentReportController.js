!(function() {
    'use strict';
    angular.module('bayaApp').controller('AppointmentReportController', ['$scope', '$state', '$injector', '$location', '$rootScope', '$timeout', 'AppointmentReportService', 'UtilityService', 'CommonUtility', function($scope, $state, $injector, $location, $rootScope, $timeout, AppointmentReportService, UtilityService, CommonUtility) {
            $scope.patientData = [];
            $scope.patient = [];
            $scope.patientId = [];
            $scope.status = {};
            $scope.statusVal = '';
            $scope.reportData = [];
            $scope.reportCurrentPage = 1;
            $scope.usersText = {buttonDefaultText: 'Select Patient'};
            $scope.statusText = {buttonDefaultText: 'Select Status'};
            $scope.usersEvent = {
                onItemDeselect: function(item) {

                },
                onItemSelect: function(item) {

                }
            };
            $scope.multiSelectSettings = {selectionLimit: 0, scrollable: true, scrollableHeight: '150px', smartButtonMaxItems: 3, closeOnSelect: true, closeOnDeselect: true, showCheckAll: false, showUncheckAll: false, smartButtonTextConverter: function(itemText, originalItem) {
                    return itemText;
                }};
            /* Get category list */
            AppointmentReportService.getPatientList({type: "patient"}, function(response) {
                angular.forEach(response.data, function(value, key) {
                    $scope.patientData.push({id: value._id, label: value.first_name + ' ' + value.last_name});
                });
            }, function(error) {
                UtilityService.showToast('error', error.message);
            });

            $scope.statusData = CommonUtility.getReportStatus();
            $scope.statusEvents = {
                onItemDeselect: function(item) {
                    $scope.status = {};
                },
                onItemSelect: function(item) {
                    if ($scope.statusVal === '' && $scope.statusVal !== item) {
                        $scope.statusVal = item;
                        $scope.status = item;
                    } else {
                        $scope.status = {};
                        $scope.statusVal = '';
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
            /*Calendar*/
            $scope.today = function() {
                $scope.fromDate = new Date();
            };
            // $scope.today();

            $scope.clear = function() {
                $scope.fromDate = null;
            };



            $scope.toggleMin = function() {
                //  $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();

            $scope.fromOpen = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                if($scope.toDate !== undefined) {
                    $scope.fromMaxDate = $scope.toDate;
                }
                $scope.fromOpened = !$scope.fromOpened;
            };

            $scope.toOpen = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                if($scope.fromDate !== undefined) {
                    $scope.toMinDate = $scope.fromDate;
                }
                $scope.toOpened = !$scope.toOpened;
            };

            $scope.dateOptions = {
//            formatYear: 'yy',
//            startingDay: 1
                showWeeks: false,
                showClose: false
            };

            $scope.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];

            $scope.getAppointmentReportList = function() {
                $scope.reportListLoader = true;
                $scope.noReportListFound = false;
                $scope.reportData = [];
                $scope.patientId = [];
                angular.forEach($scope.patient, function(data) {
                    $scope.patientId.push(data.id);
                });
                $scope.appointment_from = ($scope.fromDate !== undefined) ? $scope.fromDate : "";
                $scope.appointment_to = ($scope.toDate !== undefined) ? $scope.toDate : "";
                $scope.appointment_status = ($scope.status.id !== undefined && $scope.status.id !== '') ? $scope.status.id : "";
                AppointmentReportService.getAppointmentReportList({page: $scope.reportCurrentPage, patient_id: $scope.patientId, appointment_status: $scope.appointment_status, appointment_from: $scope.appointment_from, appointment_to: $scope.appointment_to}, function(response) {
                    if (response.success && response.data.items.length) {
                        $scope.reportData = response.data.items;
                        $scope.reportListMaxSize = response.data.page;
                        $scope.reportListTotalItems = response.data.totalItems;
                        $scope.reportListPagination = (response.data.page > 1) ? true : false;
                    } else {
                        $scope.reportListPagination = false;
                        $scope.noReportListFound = true;
                    }
                    $scope.reportListLoader = false;

                }, function(error) {
                    $scope.reportListLoader = false;
                    $scope.noReportListFound = true;
                });
            };

            $scope.getAppointmentReportList();

            /* Date Formate */
            $scope.getDate = function(date) {
                return UtilityService.getDate(date);
            };
            
            /*Select from date*/
            $scope.selectFromDate = function(fromDate){
                console.log(fromDate);
                 //$scope.maxDate = new Date(2020, 5, 22);
            };
            
             /*Select to date*/
            $scope.selectToDate = function(toDate){
                
            };

        }]);
})();
