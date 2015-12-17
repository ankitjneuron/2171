angular.module('bayaApp').service('UsersService', ['$http', 'UtilityService', function($http, UtilityService) {
        /* Listing form */
        var accessToken=UtilityService.getUserAccessToken();
        this.UserForm = {
             
        };

        /*Get All Category Api*/
        this.getUsers = function(data, success, error) {
             var query = '';
            if(data.search!==undefined && data.search!==''){query+= '&search='+data.search;}
            return  $http.get(baseUrl + 'api/admin/getusers/'+data.page+'?access_token='+accessToken+'&user_type='+data.user_type+query).success(success).error(error);
        };
        
        
          this.changeStatus = function(data, success, error) {
            return  $http.get(baseUrl + 'api/admin/changestatus/'+data.id+'/status/'+data.enabled+'?access_token='+accessToken).success(success).error(error);
        };

    }]);