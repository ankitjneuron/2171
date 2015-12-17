/**
 * Created by hp on 27/10/2015.
 */
!(function() {
    'use strict';

    angular.module('bayaApp').service('UtilityService', ['$localStorage', '$location', '$q', function($localStorage, $location, $q) {
            /* Set Local Storage */
            this.setLocalStorage = function(index, data) {
                $localStorage[index] = data;
            };

            /* Get Local Storage */
            this.getLocalStorage = function(index) {
                if ($localStorage[index]) {
                    return $localStorage[index];
                } else {
                    return false;
                }
            };

            /* Remove Local Storage */
            this.removeLocalStorage = function(index) {
                delete $localStorage[index];
            };

            /* Check User Login */
            this.checkUserLogin = function() {
                // Removes all local storage
                if (this.getLocalStorage('userInfo')) {
                    return true;
                } else {
                    return false;
                }
            };

            /* Get Login User Detail */
            this.getUserInfo = function() {
                return this.getLocalStorage('userInfo');
            };

            /* service to set toaster */
            this.showToast = function(type, message) {
                toastr.options = {
                    "closeButton": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": true,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                toastr.remove();
                toastr[type](message);

            };

            /* Get Login User Access Token*/
            this.getUserAccessToken = function() {
                var userInfo = false;
                if (this.getLocalStorage('userInfo')) {
                    userInfo = this.getLocalStorage('userInfo');
                    if (userInfo.hasOwnProperty('access_token')) {
                        return userInfo.access_token;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            };

            /* Get Login User Access Token*/
            this.getLoginUserId = function() {
                var userInfo = false;
                if (this.getLocalStorage('userInfo')) {
                    userInfo = this.getLocalStorage('userInfo');
                    if (userInfo.hasOwnProperty('access_token')) {
                        return userInfo._id;
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            };

            /* Common date formate */
            this.getDate = function(date) {
                date = new Date(date);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();

                if (month <= 9) {
                    month = '0' + month;
                }
                if (day <= 9) {
                    day = '0' + day;
                }

                return month + "/" + day + "/" + year;
            };

            this.convertDateObjToDate = function(date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();

                if (month <= 9) {
                    month = '0' + month;
                }
                if (day <= 9) {
                    day = '0' + day;
                }

                return year + "-" + month + "-" + day;
            };

            this.isImageExist = function(src) {
                src = baseUrl + src;
                var deferred = $q.defer();

                var image = new Image();
                image.onerror = function() {
                    deferred.resolve(false);
                };
                image.onload = function() {
                    deferred.resolve(true);
                };
                image.src = src;

                return deferred.promise;
            };

            /* Start Date object (09-Sep-2015) */
            this.getDateObj = function(date) {

                date = date.split("-");
                var startDateObject = new Date(date[0], date[1] - 1, date[2], 0, 0, 0);//Date object
                return startDateObject;
            };

            this.changeDateToTime = function(d, show) {
                // console.log(d);
                d = new Date(d);

                // console.log(d);
                var hh = d.getHours();
                var m = d.getMinutes();
                var month = ((d.getMonth() + 1).toString().length === 1) ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
                var day = ((d.getDate()).toString().length === 1) ? "0" + (d.getDate()) : (d.getDate());
                var dd = "AM";
                var h = hh;
                var mm = m;
                hh = ((hh).toString().length === 1) ? "0" + hh : hh;
                mm = ((mm).toString().length === 1) ? "0" + mm : mm;

                if (h >= 12) {
                    h = hh - 12;
                    dd = "PM";
                }
                if (h === 0) {
                    h = 12;
                }
                if (h.toString().length === 1)
                    h = "0" + h;
                if (m.toString().length === 1)
                    m = "0" + m;
                if (show) {
                    return d.getFullYear() + "-" + month + "-" + day + " " + hh + ":" + mm + ":00";
                }

                return h + ':' + m + ' ' + dd;
            };


            /* Convert date object to utc date object */
            this.getUtcDate = function(date) {
                var utcDate = date;
                var month = parseInt(utcDate.getMonth()) + 1;
                month = (month <= 9) ? '0' + month : month;
                var day = utcDate.getDate();
                day = (day <= 9) ? '0' + day : day;
                utcDate = utcDate.getFullYear() + '-' + month + '-' + day + 'T00:00:00.000Z';
                return utcDate;
            };
        }]);

})();