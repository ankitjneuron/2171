angular.module('bayaApp').service('UserProfileService', ['$http', 'UtilityService', function($http, UtilityService) {
        /* Listing form */
        var accessToken=UtilityService.getUserAccessToken();
        this.changePasswordForm = {
              "old_password": "",
              "new_password": "",
              "confirm_password": ""
        };
        
        this.userProfileForm = {  
            "first_name": "",
            "last_name": "",
            "email": "",
            "phone_number": "",
            "address": "",
            "state": "",
            "city": "",
            "user_image" : "",
            "_id" : "",
        };

        /*Get All Category Api*/
        this.getUsers = function(data, success, error) {
             var query = '';
            if(data.search!==undefined && data.search!==''){query+= '&search='+data.search;}
            return  $http.get(baseUrl + 'api/admin/getusers/'+data.page+'?access_token='+accessToken+'&user_type='+data.user_type+query).success(success).error(error);
        };
        
         /*Change password*/
        this.changePassword = function(data, success, error) {
            return  $http.post(baseUrl + 'api/users/change-password?access_token='+accessToken,data).success(success).error(error);
        };
        
        /*Update user profile Api*/
        this.updateProfile = function (data, success, error) {
            if(data.user_image !== '' && data.user_image !== undefined) {
                var imageObj = new FormData();
                imageObj.append('first_name', data.first_name);
                imageObj.append('last_name', data.last_name);
                imageObj.append('email', data.email);
                imageObj.append('image', data.user_image);
                imageObj.append('phone_number', data.phone_number);
                imageObj.append('state', data.state);
                imageObj.append('address', data.address);
                imageObj.append('city', data.city);
                return $http.post(baseUrl + "api/users/updateprofile?access_token=" + accessToken, imageObj, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(success).error(error);
            } else {
                return  $http.post(baseUrl + 'api/users/updateprofile/?access_token='+accessToken,data).success(success).error(error);
            }
        };
        
        /*Get admin profile Api*/
        this.getUserProfile = function (data, success, error) {
            return  $http.get(baseUrl + 'api/users/me/?access_token='+accessToken,data).success(success).error(error);
        };

    }]);