angular.module('bayaApp').service('ManageBusinessHourService', ['$http', 'UtilityService', function($http, UtilityService) {
       var accessToken = UtilityService.getUserAccessToken();
        /*Api save business hour*/
        this.addBusinessHours = function(data, success, error) {
            return  $http.post(baseUrl + 'api/users/add-business-hour-to-list?access_token='+accessToken,data).success(success).error(error);
        };
        
         /*Api for get Business hour*/
        this.getBusinessHours = function(data, success, error) {
            return  $http.get(baseUrl + 'api/users/listingdetail/'+data+'?access_token='+accessToken).success(success).error(error);
        };
    }]);