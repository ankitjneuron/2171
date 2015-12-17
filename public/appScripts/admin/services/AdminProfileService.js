/**
 * Created by hp on 02/11/2015.
 */
!(function () {
    'use strict';
    
angular.module('bayaApp').service('AdminProfileService', ['$http', 'UtilityService', function ($http, UtilityService) {
        var accessToken = UtilityService.getUserAccessToken();
        this.userProfileForm = {
            "first_name": "",
            "last_name": "",
            "email": "",
            "admin_image" : "",
            "phone" : "",
            "address" : "",
            "city" : "",
            "state" : "",
            "zipcode" : "",
            "_id" : "",
        };
        
        this.changePasswordForm = {
            "old_password": "",
            "new_password": "",
            "confirm_password": ""
        };
        
        /*Update admin profile Api*/
        this.updateProfile = function (data, success, error) {
            if(data.admin_image !== '' && data.admin_image !== undefined) {
                var imageObj = new FormData();
                imageObj.append('first_name', data.first_name);
                imageObj.append('last_name', data.last_name);
                imageObj.append('email', data.email);
                imageObj.append('image', data.admin_image);
                return $http.post(baseUrl + "api/users/updateprofile?access_token=" + accessToken, imageObj, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(success).error(error);
            } else {
                return  $http.post(baseUrl + 'api/users/updateprofile/?access_token='+accessToken,data).success(success).error(error);
            }
        };
        
        /*Get admin profile Api*/
        this.getAdminProfile = function (data, success, error) {
            return  $http.get(baseUrl + 'api/users/me/?access_token='+accessToken,data).success(success).error(error);
        };
        
        /*Change password*/
        this.changePassword = function(data, success, error) {
            return  $http.post(baseUrl + 'api/users/change-password?access_token='+accessToken,data).success(success).error(error);
        };

    }]);
})();