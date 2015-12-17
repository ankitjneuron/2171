!(function() {
    'use strict';
    angular.module('bayaApp').controller('UserDashboardController', ['$scope', '$state', '$injector', '$location', '$rootScope', '$modal','$timeout','$ngBootbox', 'UserDashboardService', 'UtilityService', function($scope, $state, $injector, $location, $rootScope, $modal,$timeout,$ngBootbox, UserDashboardService, UtilityService) {
           $timeout(function(){
               $scope.business_name = $scope.myBusinessInfo.business_name;
               $scope.showCompleteProfile = ($scope.percentage===100) ? false  : true;
           },200);
            
            
            /* Percentage Progress Bar*/            
            $scope.offset =         0;
            $scope.timerCurrent =   0;
            $scope.uploadCurrent =  0;
            $scope.stroke =         25;
            $scope.radius =         120;
            $scope.isSemi =         false;
            $scope.rounded =        false;
            $scope.responsive =     false;
            $scope.clockwise =      true;
            $scope.currentColor =   '#9B59B2';
            $scope.bgColor =        '#eaeaea';
            $scope.duration =       800;
            $scope.currentAnimation = 'easeOutCubic';
             var userinfo = UtilityService.getUserInfo();
            $scope.userDashboardDetail = {};
            
            $scope.getColor = function(){
                return $scope.gradient ? 'url(#gradient)' : $scope.currentColor;
            };

            var getPadded = function(val){
                return val < 10 ? ('0' + val) : val;
            };
            
            $scope.getDoctorName = function(doctor_id){
                var doctorName = '-';
                if(doctor_id!=='' && doctor_id!==undefined && $scope.myBusinessInfo!=='' && $scope.myBusinessInfo!==false){
                   angular.forEach($scope.myBusinessInfo.doctors,function(data){
                      if(data._id===doctor_id){
                          doctorName = data.name;
                      }
                   });  
                }
               return doctorName;
            };
            
             $scope.getUserDashboardDetail = function() {
                $scope.claimProfile = false;
                $scope.pendingClaimProfile = false;
                $scope.confirmClaimProfile = false;
                //$scope.hideTab = true;
                $scope.businessAppointment = [];
                UserDashboardService.getUserDashboardDetail({}, function(response) {
                    if (response.success) {
                        UtilityService.setLocalStorage('myBusiness', response.data.my_listing);
                         $scope.myBusinessInfo = response.data.my_listing;
                        $scope.current = response.data.profile_percentage.percentVal;
                        $scope.max = response.data.profile_percentage.total;
                        $scope.percentage = response.data.profile_percentage.percent;
                        $scope.businessAppointment = response.data.pending_appointment;
                       
                          if (response.data.my_listing) {
                               if (response.data.my_listing_claim) {
                                 var claimStatusData = response.data.my_listing_claim;
                               $timeout(function(){
                                    $scope.hideTab = (claimStatusData.status === 'accepted' && claimStatusData.user_id === userinfo._id) ? false : true;
                                    if(claimStatusData.status === 'pending' && claimStatusData.user_id === userinfo._id){
                                       $scope.claimProfile = false;
                                       $scope.pendingClaimProfile = true;
                                       $scope.confirmClaimProfile = false; 
                                    }
                                    if(claimStatusData.status === 'accepted' && claimStatusData.user_id === userinfo._id){
                                       $scope.claimProfile = false;
                                       $scope.pendingClaimProfile = false;
                                       $scope.confirmClaimProfile = true; 
                                       $scope.business_name = response.data.my_listing.business_name;
                                    }
                               },200);
                                    
                                
                             } else {
                                $scope.claimProfile = true;
                            }

                        }else {
                                $scope.claimProfile = true;
                            }
                    }
                }, function(error) {
                });
            };
            
            $scope.getUserDashboardDetail();
             /*Delete doctor*/
            $scope.acceptAppointment = function(id, status) {
                $ngBootbox.hideAll();
                var msg = (status === 'accepted') ? 'accept' : 'reject';
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
                                    UserDashboardService.changeAppointmentStatus({id: id, status: status}, function(response) {
                                        if (response.success) {
                                            $scope.hideAcceptBtn = true;
                                            if (status === 'accepted') {
                                                $scope.appointmentAccepted = true;
                                            } else {
                                                $scope.appointmentRejected = true;
                                            }
                                            var message = 'Appointment successfully ' + status + '.';
                                            UtilityService.showToast('success', message);
                                            $scope.getUserDashboardDetail();
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
            //console.log(UtilityService.getLocalStorage('myBusiness'));
        }]);
})();
