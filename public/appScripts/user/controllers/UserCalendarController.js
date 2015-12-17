!(function() {
    'use strict';
    angular.module('bayaApp').controller('UserCalendarController', ['$scope', '$state', '$injector', '$location', '$rootScope', '$modal', '$ngBootbox', '$filter', '$timeout', 'UserCalendarService', 'UtilityService', function($scope, $state, $injector, $location, $rootScope, $modal, $ngBootbox, $filter, $timeout, UserCalendarService, UtilityService) {
            var currentYear = new Date().getFullYear();
            var currentMonth = new Date().getMonth();
            $scope.myBusinessInfo = UtilityService.getLocalStorage('myBusiness');
            $scope.events = [];
            $scope.viewAppointment = [];
            $scope.viewAllAppointmentByDate = [];
            $scope.viewAppointmentData = {};
            $scope.appointmentCurrentPage = 1;
            $rootScope.clickDate = '';
            $scope.date = '';
            $scope.timeArray = [];
            $scope.scheduleTime = '';
            /*Get admin profile data*/
            $scope.getAppointments = function() {
                $scope.events = [];
                UserCalendarService.getAppointments({listing_id: $scope.myBusinessInfo._id}, function(response) {
                    if (response.success) {
                        angular.forEach(response.data, function(val) {
                            $scope.events.push({title: ((val.patient_info.first_name === undefined) ? '-' : val.patient_info.first_name) + ' ' + ((val.patient_info.last_name === undefined) ? '-' : val.patient_info.last_name), type: '', starts_at: UtilityService.changeDateToTime(val.appointment_date, true), ends_at: UtilityService.changeDateToTime(val.appointment_date, true)});
                        });

                    }
                }, function(error) {
                    UtilityService.showToast('error', error.message);
                });
            };

            if ($scope.myBusinessInfo !== '' && $scope.myBusinessInfo !== undefined && $scope.myBusinessInfo !== false) {
                if ($scope.myBusinessInfo._id !== undefined) {
                    $scope.getAppointments();
                }
            }
//            $scope.events = [
//                {
//                    title: 'Event 1',
//                    type: 'warning',
//                    starts_at: new Date(currentYear, currentMonth, 25, 8, 30),
//                    ends_at: new Date(currentYear, currentMonth, 25, 8, 30),
//                },
//                {
//                    title: 'Event 2',
//                    type: 'info',
//                    starts_at: new Date(currentYear, currentMonth, 19, 7, 30),
//                    ends_at: new Date(currentYear, currentMonth, 19, 7, 30),
//                },
//                {
//                    title: 'Event 3',
//                    type: 'important',
//                    starts_at: new Date(currentYear, currentMonth, 25, 6, 30),
//                    ends_at: new Date(currentYear, currentMonth, 25, 6, 30)
//                },
//            ];

            $scope.calendarView = 'month';
            $scope.calendarDay = new Date();

            $scope.eventClicked = function(event) {
                var date = event.date.toDate();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var dayId = year + '-' + month + '-' + day;
                var checkDisableDay = $('#' + dayId).parent().find('.cal-day-outmonth').length;
                var clickDateFormat = UtilityService.convertDateObjToDate(event.date.toDate());
                if (!checkDisableDay) {
                    $rootScope.clickDate = clickDateFormat;
                    $('.cal-month-day').removeClass('cal-selected-date');
                    $('#' + dayId).addClass('cal-selected-date');
                    if ($scope.myBusinessInfo !== '' && $scope.myBusinessInfo !== undefined && $scope.myBusinessInfo !== false) {
                        $scope.getPatientAppointmentByDate();
                    }
                }
            };

            $scope.eventEdited = function(event) {
                showModal('Edited', event);
            };

            $scope.eventDeleted = function(event) {
                showModal('Deleted', event);
            };

            $scope.setCalendarToToday = function() {
                $scope.calendarDay = new Date();
            };

            $scope.toggle = function($event, field, event) {
                $event.preventDefault();
                $event.stopPropagation();
                event[field] = !event[field];
            };

            /*====-Get Appointment-====*/
            $scope.getPatientAppointmentByDate = function() {
                $scope.showViewAllBtn = false;
                var dateObject = UtilityService.getDateObj($rootScope.clickDate);//Date object
                var converUtcDate = UtilityService.getUtcDate(dateObject);
                var eventDate = {appointment_date: converUtcDate, listing_id: $scope.myBusinessInfo._id};
                $scope.viewAppointment = [];
                $scope.showSelectDateMsg = true;
                $scope.viewAppointmentLoader = true;
                $scope.noAppointmentFound = false;
                UserCalendarService.getListingAppointmentByDate(eventDate, function(response) {
                    if (response.success && response.data.items.length) {
                        $scope.viewAppointment = response.data.items;
                        $scope.showViewAllBtn = (response.data.items.length) ? true : false;

                    } else {
                        $scope.noAppointmentFound = true;
                    }
                    $scope.viewAppointmentLoader = false;
                }, function(error) {
                    $scope.noAppointmentFound = false;
                    $scope.viewAppointmentLoader = false;
                    UtilityService.showToast('error', error.message);
                });
            };

            /*====-Get Appointment-====*/
            $scope.getAppointmentDetail = function(id) {
                $scope.viewAppointmentData = {};
                UserCalendarService.getAppointmentDetail(id, function(response) {
                    if (response.success) {
                        $scope.scheduleTime = response.data.appointment_time;
                        $('#viewdetail').modal('show');

                        var date = new Date();
                        date.setHours(0, 0, 0, 0);
                        var currentTime = date.getTime();

                        var dateNew = new Date(response.data.appointment_date);
                        dateNew.setHours(0, 0, 0, 0);
                        var appointmentTime = dateNew.getTime();

                        if (currentTime === appointmentTime || date < dateNew)
                            var dateChk = true;
                        else
                            var dateChk = false;

                        $scope.afterDate = false;
                        $scope.backDate = false;
                        $scope.date = new Date(response.data.appointment_date);
                        switch (response.data.appointment_status) {
                            case "pending":
                                if(response.data.rescheduled_by === '' || 
                                        response.data.rescheduled_by === undefined || 
                                        response.data.rescheduled_by === 'patient') {
                                    if (dateChk) {
                                        $scope.afterDate = true;
                                        $scope.backDate = false;
                                        $scope.hideAcceptBtn = true;
    //                                    $scope.appointmentAccepted = false;
    //                                    $scope.appointmentRejected = false;
                                    } else {
                                        $scope.afterDate = false;
                                        $scope.backDate = true;
                                        $scope.hideVisitedBtn = true;
                                    }
                                } else {
                                    $('#pendingTxt').html('Pending..');
                                }
                                break;
                            case "accepted":
                                $scope.afterDate = true;
                                $scope.hideAcceptBtn = false;
                                $scope.appointmentAccepted = true;
                                $scope.appointmentRejected = false;
                                break;
                            case "rejected":
                                $scope.afterDate = true;
                                $scope.hideAcceptBtn = false;
                                $scope.appointmentAccepted = false;
                                $scope.appointmentRejected = true;
                                break;
                            case "visited":
                                $scope.afterDate = false;
                                $scope.backDate = true;
                                $scope.hideVisitedBtn = false;
                                $scope.appointmentVisited = true;
                                $scope.appointmentMissed = false;
                                break;
                            case "missed":
                                $scope.afterDate = false;
                                $scope.backDate = true;
                                $scope.hideVisitedBtn = false;
                                $scope.appointmentMissed = true;
                                $scope.appointmentVisited = false;
                                break;
                        }
                        $scope.viewAppointmentData = response.data;
                    }
                    $scope.viewAppointmentLoader = false;
                }, function(error) {
                    $scope.viewAppointmentLoader = false;
                    UtilityService.showToast('error', error.message);
                });
            };

            /* Date Formate */
            $scope.getDate = function(date) {
                return UtilityService.getDate(date);
            };
            /*Reload user dashboard*/
            $scope.getDetail = function() {
                $rootScope.userDashboard();
            };

            /*Delete doctor*/
            $scope.acceptAppointment = function(id, status) {
                $ngBootbox.hideAll();
                var msg = "";
                switch (status) {
                    case "pending":
                        msg = "pending";
                        break;
                    case "accepted":
                        msg = "accept";
                        break;
                    case "rejected":
                        msg = "reject";
                        break;
                    case "visited":
                        msg = "visit";
                        break;
                    case "missed":
                        msg = "miss";
                        break;
                }


                $ngBootbox.customDialog(
                    {
                        message: "Are you sure you want to " + msg + " this appointment ?",
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
                                    UserCalendarService.changeAppointmentStatus({id: id, status: status}, function(response) {
                                        if (response.success) {
                                            $scope.getAppointmentDetail(id);
//                                            angular.element(document.querySelector('#acceptRejectBtn_' + id)).text((status === 'accepted') ? 'Accepted' : 'Rejected');
//                                            //$scope.hideAcceptBtn = true;
//                                            if (status === 'accepted') {
//                                                $scope.hideAcceptBtn = false;
//                                                $scope.appointmentAccepted = true;
//                                                $scope.appointmentRejected = false;
//                                                $('#acceptNonClickBtn_' + id).show();
//                                                $('#acceptClickBtn_' + id).hide();
//                                                $('#acceptBtn_' + id).show();
//                                                $('#rejectBtn_' + id).hide();
//                                            } else if (status === 'rejected') {
//                                                $scope.hideAcceptBtn = false;
//                                                $scope.appointmentRejected = true;
//                                                $scope.appointmentAccepted = false;
//                                                $('#acceptNonClickBtn_' + id).show();
//                                                $('#acceptClickBtn_' + id).hide();
//                                                $('#acceptBtn_' + id).hide();
//                                                $('#rejectBtn_' + id).show();
//                                            } else if (status === 'visited') {
//                                                $scope.hideVisitedBtn = false;
//                                                $scope.appointmentVisited = true;
//                                                $scope.appointmentMissed = false;
//                                                $('#visitNonClickBtn_' + id).show();
//                                                $('#visitClickBtn_' + id).hide();
//                                                $('#visitedBtn_' + id).show();
//                                                $('#missedBtn_' + id).hide();
//                                            } else if (status === 'missed') {
//                                                $scope.hideVisitedBtn = false;
//                                                $scope.appointmentMissed = true;
//                                                $scope.appointmentVisited = false;
//                                                $('#visitNonClickBtn_' + id).show();
//                                                $('#visitClickBtn_' + id).hide();
//                                                $('#missedBtn_' + id).show();
//                                                $('#visitedBtn_' + id).hide();
//                                            }
                                            var message = 'Appointment successfully ' + status + '.';
                                            UtilityService.showToast('success', message);
                                            $scope.getDetail();
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

            $scope.getAppointmentHistory = function() {

                var dateObject = UtilityService.getDateObj($rootScope.clickDate);//Date object
                var converUtcDate = UtilityService.getUtcDate(dateObject);
                $scope.viewAllAppointmentByDate = [];
                $scope.viewAppointmentHistoryLoader = true;
                $scope.noAppointmentHistoryFound = false;
                UserCalendarService.getListingAppointmentByDate({page: $scope.appointmentCurrentPage, appointment_date: converUtcDate, listing_id: $scope.myBusinessInfo._id}, function(response) {
                    if (response.success && response.data.items.length) {
                        $scope.viewAllAppointmentByDate = response.data.items;
                        $scope.appointmentListMaxSize = response.data.page;
                        $scope.appointmentListTotalItems = response.data.totalItems;
                        $scope.appointmentListPagination = (response.data.page > 1) ? true : false;

                    } else {
                        $scope.noAppointmentHistoryFound = true;
                    }
                    $scope.viewAppointmentHistoryLoader = false;
                }, function(error) {
                    $scope.noAppointmentHistoryFound = false;
                    $scope.viewAppointmentHistoryLoader = false;
                    UtilityService.showToast('error', error.message);
                });
            };

            /*Get doctor name*/
            $scope.getDoctorName = function(doctorArray, doctor_id) {
                //var   doctor_Object = $filter('filter')(doctorArray, function (d) {return d._id === doctor_id;})[0]; 
                // return (doctor_Object.name!==undefined && doctor_Object.name!=='') ? doctor_Object.name : '';
                var doctorName = '-';
                if (doctorArray.length && doctor_id !== undefined) {
                    angular.forEach(doctorArray, function(data) {
                        if (data._id === doctor_id) {
                            doctorName = data.name;
                        }
                    });
                }
                return doctorName;
            };

            $scope.appointmentstatusChk = function(status, appointmentDate, id) {
                var date = new Date();
                date.setHours(0, 0, 0, 0);
                var currentTime = date.getTime();

                var dateNew = new Date(appointmentDate);
                dateNew.setHours(0, 0, 0, 0);
                var appointmentTime = dateNew.getTime();

                if (currentTime === appointmentTime || currentTime < appointmentTime)
                    var dateChk = true;
                else
                    var dateChk = false;

                switch (status) {
                    case "pending":
                        if (dateChk) {
                            setTimeout(function() {
                                $('#afterDate_' + id).show();
                                $('#backDate_' + id).hide();
                                $('#acceptClickBtn_' + id).show();
                                $('#acceptNonClickBtn_' + id).hide();
                            }, 200);
                        } else {
                            setTimeout(function() {
                                $('#afterDate_' + id).hide();
                                $('#backDate_' + id).show();
                                $('#visitClickBtn_' + id).show();
                                $('#visitNonClickBtn_' + id).hide();
                            }, 200);
                        }
                        break;
                    case "accepted":
                        setTimeout(function() {
                            $('#afterDate_' + id).show();
                            $('#backDate_' + id).hide();
                            $('#acceptNonClickBtn_' + id).show();
                            $('#acceptClickBtn_' + id).hide();
                            $('#acceptBtn_' + id).show();
                            $('#rejectBtn_' + id).hide();

                        }, 200);
                        break;
                    case "rejected":
                        setTimeout(function() {
                            $('#afterDate_' + id).show();
                            $('#backDate_' + id).hide();
                            $('#acceptNonClickBtn_' + id).show();
                            $('#acceptClickBtn_' + id).hide();
                            $('#acceptBtn_' + id).hide();
                            $('#rejectBtn_' + id).show();
                        }, 200);
                        break;
                    case "visited":
                        setTimeout(function() {
                            $('#afterDate_' + id).hide();
                            $('#backDate_' + id).show();
                            $('#visitNonClickBtn_' + id).show();
                            $('#visitClickBtn_' + id).hide();
                            $('#visitedBtn_' + id).show();
                            $('#missedBtn_' + id).hide();
                        }, 200);
                        break;
                    case "missed":
                        setTimeout(function() {
                            $('#afterDate_' + id).hide();
                            $('#backDate_' + id).show();
                            $('#visitNonClickBtn_' + id).show();
                            $('#visitClickBtn_' + id).hide();
                            $('#missedBtn_' + id).show();
                            $('#visitedBtn_' + id).hide();
                        }, 200);
                        break;
                }

            };

            $scope.today = function() {
                $scope.calendarDate = new Date();
            };
            $scope.today();



            $scope.open = function($event) {
                $scope.status.opened = true;
            };

            $scope.opened = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                if ($scope.fromDate !== undefined) {
                    $scope.toMinDate = $scope.fromDate;
                }
                $scope.toOpened = !$scope.toOpened;
            };

            $scope.dateOptions = {
                showWeeks: false,
                showClose: false
            };

            $scope.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];

            $scope.selectDate = function(date) {

                var clickDateFormat = UtilityService.convertDateObjToDate(date);

                setTimeout(function() {
                    $scope.$apply(function() {
                        $rootScope.clickDate = clickDateFormat;
                        $(".main-container").addClass("in");
                    });
                }, 1000);

                setTimeout(function() {
                    angular.element('#viewall').trigger('click');
                }, 2000);

            };

            /*Appointment Rescedule*/
            $scope.rescheduleAppointment = function(id, status) {

                $scope.appointment_day = moment($scope.viewAppointmentData).format('dddd');
                $scope.changeDate($scope.viewAppointmentData.appointment_date);
                setTimeout(function() {
                    $scope.$apply();
                }, 200);
                angular.element(document.querySelector("#viewdetail")).modal('hide');
                angular.element(document.querySelector("#updateAppointment")).modal('show');

            };

            function convertTime24to12(time24) {
                var tmpArr = time24.split(':'), time12;
                if (+tmpArr[0] === 12) {
                    time12 = tmpArr[0] + ':' + tmpArr[1] + ' PM';
                } else {
                    if (+tmpArr[0] === "00") {
                        time12 = '12:' + tmpArr[1] + ' AM';
                    } else {
                        if (+tmpArr[0] > 12) {
                            time12 = (((+tmpArr[0] - 12) <= 9) ? '0' + (+tmpArr[0] - 12) : (+tmpArr[0] - 12)) + ':' + tmpArr[1] + ' PM';
                        } else {
                            time12 = (((+tmpArr[0]) <= 9) ? '0' + (+tmpArr[0]) : (+tmpArr[0])) + ':' + tmpArr[1] + ' AM';
                        }
                    }
                }
                return time12;
            }

            /* Change appointment date */
            $scope.changeDate = function(date) {
                $scope.appointment_day = moment(date).format('dddd');
                $scope.dayObject = {};
                $scope.timeArray = [];
                angular.forEach($scope.viewAppointmentData.listing_id.availability.availability, function(data) {
                    if ($scope.appointment_day === data.availability_day) {
                        $scope.dayObject = data;
                    }
                });
                $scope.time_slot = $scope.viewAppointmentData.listing_id.availability.availability_slot;
                $scope.schedule_from_time = $scope.dayObject.availability_from;
                $scope.schedule_to_time = $scope.dayObject.availability_to;
                $scope.appointment_from_schedule = $scope.dayObject.availability_schedule_from;
                $scope.appointment_to_schedule = $scope.dayObject.availability_schedule_to;
                $scope.appointment_date = $scope.viewAppointmentData.appointment_date;

                if ($scope.time_slot === 30) {
                    if ($scope.schedule_from_time === "12:00") {
                        $scope.schedule_from_time = "01:00";
                        $scope.timeArray = ["12:00 AM", "12:30 AM"];
                    }
                    $scope.appointmentFromDateTime = UtilityService.getDate($scope.appointment_date);
                    $scope.appointmentFromDateTime = new Date('' + $scope.appointmentFromDateTime + ' ' + $scope.schedule_from_time + ' ' + $scope.appointment_from_schedule + '');
                    $scope.appointmentToDateTime = UtilityService.getDate($scope.appointment_date);
                    $scope.appointmentToDateTime = new Date('' + $scope.appointmentToDateTime + ' ' + $scope.schedule_to_time + ' ' + $scope.appointment_to_schedule + '');

                    var diff = Math.abs($scope.appointmentFromDateTime - $scope.appointmentToDateTime);
                    var minutes = Math.floor((diff / 1000) / 60);
                    var timeSlot = minutes / 30;
                    var start_time = $scope.schedule_from_time.split(':');
                    var end_time = $scope.schedule_to_time.split(':');
                    start_time = parseInt(start_time);
                    end_time = parseInt(end_time);
                    var miniute = "00";
                    for (var i = 0; i < timeSlot + 1; i++) {
                        $scope.schedule = convertTime24to12(((miniute === "30") ? (start_time++) : start_time) + ':' + miniute);
                        $scope.timeArray.push($scope.schedule);
                        miniute = ((miniute === "00") ? "30" : "00");
                    }


                }

                if ($scope.time_slot === 15) {
                    if ($scope.schedule_from_time === "12:00") {
                        $scope.schedule_from_time = "01:00";
                        $scope.timeArray = ["12:00 AM", "12:15 AM", "12:30 AM"];
                    }
                    $scope.appointmentFromDateTime = UtilityService.getDate($scope.appointment_date);
                    $scope.appointmentFromDateTime = new Date('' + $scope.appointmentFromDateTime + ' ' + $scope.schedule_from_time + ' ' + $scope.appointment_from_schedule + '');
                    $scope.appointmentToDateTime = UtilityService.getDate($scope.appointment_date);
                    $scope.appointmentToDateTime = new Date('' + $scope.appointmentToDateTime + ' ' + $scope.schedule_to_time + ' ' + $scope.appointment_to_schedule + '');

                    var diff = Math.abs($scope.appointmentFromDateTime - $scope.appointmentToDateTime);
                    var minutes = Math.floor((diff / 1000) / 60);
                    var timeSlot = minutes / 15;
                    var start_time = $scope.schedule_from_time.split(':');
                    var end_time = $scope.schedule_to_time.split(':');
                    start_time = parseInt(start_time);
                    end_time = parseInt(end_time);
                    var miniute = 0;
                    for (var i = 0; i < timeSlot + 1; i++) {
                        var timSchedule = ((miniute === 45) ? (start_time++) : start_time) + ':' + miniute;
                        $scope.schedule = convertTime24to12(timSchedule);
                        $scope.schedule = $scope.schedule.split(':');
                        $scope.scheduleMiniute = $scope.schedule[0];
                        $scope.scheduleSecond = $scope.schedule[1].split(' ');
                        $scope.scheduleSlot = $scope.scheduleSecond[1];
                        $scope.scheduleSecond = ($scope.scheduleSecond[0] === "0") ? "00" : $scope.scheduleSecond[0];
                        $scope.scheduleSecond = ($scope.scheduleSecond === "60") ? "00" : $scope.scheduleSecond;
                        $scope.timeArray.push($scope.scheduleMiniute + ":" + $scope.scheduleSecond + ' ' + $scope.scheduleSlot);
                        miniute = (miniute === 60) ? 0 : miniute;
                        miniute = miniute + 15;
                    }


                }

                if ($scope.time_slot === 60) {
                    if ($scope.schedule_from_time === "12:00") {
                        $scope.schedule_from_time = "01:00";
                        $scope.timeArray = ["12:00 AM"];
                    }
                    $scope.appointmentFromDateTime = UtilityService.getDate($scope.appointment_date);
                    $scope.appointmentFromDateTime = new Date('' + $scope.appointmentFromDateTime + ' ' + $scope.schedule_from_time + ' ' + $scope.appointment_from_schedule + '');
                    $scope.appointmentToDateTime = UtilityService.getDate($scope.appointment_date);
                    $scope.appointmentToDateTime = new Date('' + $scope.appointmentToDateTime + ' ' + $scope.schedule_to_time + ' ' + $scope.appointment_to_schedule + '');

                    var diff = Math.abs($scope.appointmentFromDateTime - $scope.appointmentToDateTime);
                    var minutes = Math.floor((diff / 1000) / 60);
                    var timeSlot = minutes / 60;
                    var start_time = $scope.schedule_from_time.split(':');
                    var end_time = $scope.schedule_to_time.split(':');
                    start_time = parseInt(start_time);
                    end_time = parseInt(end_time);
                    var miniute = "00";
                    for (var i = 0; i < timeSlot + 1; i++) {
                        $scope.schedule = convertTime24to12(start_time + ':' + '00');
                        $scope.timeArray.push($scope.schedule);
                        start_time++;
                    }
                }

                if ($scope.time_slot === 45) {
                    if ($scope.schedule_from_time === "12:00") {
                        $scope.schedule_from_time = "01:00";
                        $scope.timeArray = ["12:45 AM"];
                    }
                    $scope.appointmentFromDateTime = UtilityService.getDate($scope.appointment_date);
                    $scope.appointmentFromDateTime = new Date('' + $scope.appointmentFromDateTime + ' ' + $scope.schedule_from_time + ' ' + $scope.appointment_from_schedule + '');
                    $scope.appointmentToDateTime = UtilityService.getDate($scope.appointment_date);
                    $scope.appointmentToDateTime = new Date('' + $scope.appointmentToDateTime + ' ' + $scope.schedule_to_time + ' ' + $scope.appointment_to_schedule + '');

                    var diff = Math.abs($scope.appointmentFromDateTime - $scope.appointmentToDateTime);
                    var minutes = Math.floor((diff / 1000) / 60);
                    var timeSlot = minutes / 60;
                    var start_time = $scope.schedule_from_time.split(':');
                    var end_time = $scope.schedule_to_time.split(':');
                    start_time = parseInt(start_time);
                    end_time = parseInt(end_time);
                    for (var i = 0; i < timeSlot; i++) {
                        $scope.schedule = convertTime24to12(start_time + ':' + '45');
                        $scope.timeArray.push($scope.schedule);
                        start_time++;
                    }
                }

                $scope.timeArray = $scope.timeArray.filter(function(elem, pos, arr) {
                    return arr.indexOf(elem) == pos;
                });

                $scope.scheduleTime = $scope.viewAppointmentData.appointment_time;
                setTimeout(function() {
                    $scope.$apply();
                }, 200);

            };

            /* Reschedule appointment*/
            $scope.appointmentReschedule = function() {
                var checkListTab = $( ".main-container" ).hasClass("in");
                $scope.curruentAppointmentDetail = $scope.viewAppointmentData;
                $ngBootbox.hideAll();
                $ngBootbox.customDialog(
                    {
                        message: "Are you sure you want to reschedule this appointment ?",
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
                                    var converUtcDate = UtilityService.getUtcDate($scope.date);
                                     $scope.timeError = false;
                                     if ($.inArray($scope.scheduleTime, $scope.timeArray) >-1) {
                                        if ($scope.curruentAppointmentDetail.appointment_date !== converUtcDate || $scope.scheduleTime !== $scope.curruentAppointmentDetail.appointment_time) {
                                            $scope.resheduleData = {
                                                "appointment_id": $scope.curruentAppointmentDetail._id,
                                                "listing_id": $scope.curruentAppointmentDetail.listing_id,
                                                "appointment_date": converUtcDate,
                                                "appointment_time": $scope.scheduleTime,
                                                "appointment_reason": $scope.curruentAppointmentDetail.appointment_reason,
                                                "doctor_id": $scope.curruentAppointmentDetail.doctor_id,
                                                "is_new_customer": $scope.curruentAppointmentDetail.is_new_customer,
                                                "patient_info": $scope.curruentAppointmentDetail.patient_info,
                                                "rescheduled_by": "business_user"
                                            }

                                            $scope.appointmentBtnLoader = true;
                                            $scope.appointmentBtnDisable = true;
                                            UserCalendarService.rescheduleAppointment($scope.resheduleData, function(response) {
                                                if (response.success) {
                                                     $(".main-container").removeClass("in");
                                                    if ($scope.curruentAppointmentDetail.appointment_date !== converUtcDate) {
                                                        $scope.showSelectDateMsg = false;
                                                        $scope.noAppointmentFound = false;
                                                        $scope.showViewAllBtn = false;
                                                        $scope.viewAppointment = [];
                                                        
                                                        $scope.getAppointments();
                                                             
                                                    } else {
                                                        $scope.getPatientAppointmentByDate();
                                                    }
                                                    UtilityService.showToast('success', Message.getSuccessMessage("appoointmentReschedule"));
                                                }
                                                $scope.appointmentBtnLoader = false;
                                                $scope.appointmentBtnDisable = false;

                                                angular.element(document.querySelector("#updateAppointment")).modal('hide');
                                            }, function(error) {
                                                $scope.appointmentBtnLoader = false;
                                                $scope.appointmentBtnDisable = false;
                                                UtilityService.showToast('error', error.message);
                                            });

                                        } else {
                                            angular.element(document.querySelector("#updateAppointment")).modal('hide');
                                        }
                                    } else {
                                      $ngBootbox.alert('Please Select schedule time.')
                                                        .then(function() {
                                                       });
                                    }

                                }
                            }
                        }
                    });
            };
            $scope.selectTime = function(time) {
                //console.log(time);
                $scope.scheduleTime = time;
            }

        }]);
})();
