angular.module('bayaApp').service('UserDashboardService', ['$http', 'UtilityService', function($http, UtilityService) {
        var accessToken = UtilityService.getUserAccessToken();
         /*Get user dashboard detail*/
        this.getUserDashboardDetail = function(data, success, error) {
            return  $http.get(baseUrl + 'api/users/dashboard?access_token='+accessToken).success(success).error(error);
        };
        
         /*Change appointment status accepted/rejected*/
        this.changeAppointmentStatus = function (data, success, error) {
            return  $http.get(baseUrl + 'api/users/change-appointment-status/'+data.id+'/status/'+data.status+'?access_token='+accessToken).success(success).error(error);
        };


    }]);