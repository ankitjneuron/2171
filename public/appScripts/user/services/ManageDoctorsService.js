angular.module('bayaApp').service('ManageDoctorsService', ['$http', 'UtilityService', function($http, UtilityService) {
       var accessToken = UtilityService.getUserAccessToken();
        /* Listing form */
        this.DoctorFormForm = {
              "name": "",
              "speciality": [],
              "description": ""
        };
        /*Get All Category Api*/
        this.getCategoryList = function(data, success, error) {
            return  $http.get(baseUrl + 'api/admin/getcategory?access_token='+accessToken).success(success).error(error);
        };

        /*Api for create listing*/
        this.saveDoctors = function (data, success, error) {
             var imageObj = new FormData();
                imageObj.append('listing_id', data.listing_id);
                imageObj.append('name', data.name);  
                
                data.speciality.forEach(function(cat){
                    imageObj.append("speciality[]", cat);
                });
                imageObj.append('doctor_id', data.doctor_id); 
                imageObj.append('description', data.description);
                imageObj.append('image', data.image);
                return $http.post(baseUrl + "api/users/add-doctor-to-list?access_token=" + accessToken, imageObj, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(success).error(error);
        };
        
        /*Api for listing*/
        this.getDoctorList = function(data, success, error) {
            var search = (data.search!==undefined && data.search!=='') ? '&search='+data.search : '';
            return  $http.get(baseUrl + 'api/users/get-listing-doctors/'+data.id+'?access_token='+accessToken+search).success(success).error(error);
        };
        
         /*Api for doctor delete*/
        this.deleteDoctor = function(data, success, error) {
            return  $http.get(baseUrl + 'api/users/delete-doctor/'+data.doctor_id+'/listing/'+data.listing_id+'?access_token='+accessToken).success(success).error(error);
        };
        
        /*Api for doctor detail*/
        this.getDoctorDetail = function(data, success, error) {
            return  $http.get(baseUrl + 'api/users/get-doctor-detail/'+data.doctor_id+'/listing/'+data.listing_id+'?access_token='+accessToken).success(success).error(error);
        };
    }]);