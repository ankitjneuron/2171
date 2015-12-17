angular.module('bayaApp').service('AuthService', ['$http', 'UtilityService', function ($http, UtilityService) {
    /* Login form */
    this.loginform = {
        email: "",
        password: "",
        rememberMe: false
    };
    this.login = function (data, success, error) {
        return  $http.post(baseUrl + 'api/users/login', data, {
            headers: {"Access-Token": utilityService.getUserAccessToken()}
        }).success(success).error(error);
    };

}]);