angular.module('bayaApp').service('AppointmentReportService', ['$http', 'UtilityService', function($http, UtilityService) {
        /* Listing form */
        var accessToken = UtilityService.getUserAccessToken();
        this.userProfileForm = {
            "first_name": "",
            "last_name": "",
            "email": "",
            "phone_number": "",
            "address": "",
            "state": "",
            "city": "",
            "user_image": "",
            "_id": "",
        };

        /*Get All Category Api*/
        this.getPatientList = function(data, success, error) {
            return  $http.get(baseUrl + 'api/users/get-users-by-type/' + data.type + '?access_token=' + accessToken).success(success).error(error);
        };

        /*Get Appointment Report Api*/
        this.getAppointmentReportList = function(data, success, error) {
            return  $http.post(baseUrl + 'api/users/get-appointment-report/' + data.page + '?access_token=' + accessToken,data).success(success).error(error);
        };


    }]);