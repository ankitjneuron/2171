    angular.module('bayaApp').factory('ApiInterceptor', ['$q','$rootScope','UtilityService',  ApiInterceptor]);

    function ApiInterceptor($q,$rootScope,UtilityService) {
        return {
            request: function (config) {
                //var access_token="";
                //if(window.localStorage['user']!=="" && window.localStorage['user']!==undefined )
                //    access_token = JSON.parse(window.localStorage['user']).access_token;

                //if (access_token ) {
                //    if(!config.params && config.method==="GET"){
                //        config.params={};
                //        config.params.access_token = access_token;
                //    }
                //}
                 return config || $q.when(config);
            },
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.data.message==='Invalid access token') {
                    $rootScope.userLogOut();
                    UtilityService.removeLocalStorage('userInfo');
                    UtilityService.removeLocalStorage('myBusiness');                    
                }
                 return $q.reject(rejection);
            }
        };
    }
