angular.module('bayaApp').service('UserCalendarService', ['$http', 'UtilityService', function($http, UtilityService) {
         var accessToken = UtilityService.getUserAccessToken();
        /*Get Appointment list Api*/
        this.getAppointments = function (data, success, error) {
            return  $http.get(baseUrl + 'api/users/get-list-appointments/'+data.listing_id+'?access_token='+accessToken,data).success(success).error(error);
        };
        
        
        /*Get Appointment list Api*/
        this.getAppointmentDetail = function (id, success, error) {
            return  $http.get(baseUrl + 'api/users/get-appointment-detail-by-id/'+id+'?access_token='+accessToken).success(success).error(error);
        };
         /*Get Appointment by date Api*/
        this.getListingAppointmentByDate = function (data, success, error) {
            var page =data.page || 1;
            return  $http.post(baseUrl + 'api/users/get-listing-appointments-by-date/'+page+'?access_token='+accessToken,data).success(success).error(error);
        };
        
         /*Change appointment status accepted/rejected*/
        this.changeAppointmentStatus = function (data, success, error) {
            return  $http.get(baseUrl + 'api/users/change-appointment-status/'+data.id+'/status/'+data.status+'?access_token='+accessToken).success(success).error(error);
        };
        
         /*Change appointment status accepted/rejected*/
        this.rescheduleAppointment = function (data, success, error) {
            return  $http.post(baseUrl + 'api/users/appointment?access_token='+accessToken,data).success(success).error(error);
        };

    }]);