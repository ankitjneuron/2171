/**
 * Created by hp on 28/10/2015.
 */
angular.module('bayaApp').service('AuthService', ['$http', 'UtilityService', function ($http, UtilityService) {
    var accessToken = UtilityService.getUserAccessToken();
    /* Login form */
    this.loginForm = {
        "email": "",
        "password": ""
    };
    /* Signup form */
    this.signupForm = {
        "user_type": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "phone_number": "",
        "address": "",
        "state": "",
        "city": "",
        "device_type": "",
        "device_id": "",
        "certification_type": "",
        "lattitude": "",
        "longtitude": ""
    };
    /* Forgot password form */
    this.forgotPasswordForm = {
        "email": ""
    };
    
     /* Reset password form */
    this.resetPasswordForm = {
        "password": "",
        "confirm_password": "",
        "token": ""
    };
    /* Login Api */
    this.login = function (data, success, error) {
        return  $http.post(baseUrl + 'api/users/login',data).success(success).error(error);
    };
    
    /*State List*/
    this.getStateList = function(data, success, error) {
        return  $http.get(baseUrl + 'api/users/states').success(success).error(error);
    };
    
    /*Signup Api*/
    this.signup = function (data, success, error) {
        return  $http.post(baseUrl + 'api/users/signup',data).success(success).error(error);
    };
    /*Forgot Password Api*/
    this.forgotPassword = function (data, success, error) {
        return  $http.post(baseUrl + 'api/users/forgot-password',data).success(success).error(error);
    };
    
    /*Reset Password Api*/
    this.resetPassword = function (data, success, error) {
        return  $http.post(baseUrl + 'api/users/reset-password',data).success(success).error(error);
    };
    
    /*Logout Api*/
    this.logout = function (data, success, error) {
        return  $http.get(baseUrl + 'api/users/logout',{headers: {"Access-Token": data}}).success(success).error(error);
    };
     
    this.getUserDashboardDetail = function(data, success, error) {
            return  $http.get(baseUrl + 'api/users/dashboard?access_token='+accessToken).success(success).error(error);
        };

}]);