angular.module('bayaApp').service('ManageListingService', ['$http', 'UtilityService', function($http, UtilityService) {
       var accessToken = UtilityService.getUserAccessToken();
        /* Listing form */
        this.ListingForm = {
              "business_name": "",
              "category": [],
              "neighbour": "",
              "phone_number": "",
              "address": "",
              "state": {},
              "city": "",
              "zipcode": "",
              "notification_number": "",
              "notification_email": "",
              "is_notification_email": false,
              "is_notification_sms": false,
              "listing_id": "",
              "website_name": "",
              "about_us": ""
        };
         
        /*Api for create listing*/
        this.saveListing = function (data, success, error) {
            return  $http.post(baseUrl + 'api/admin/savelisting/?access_token='+accessToken,data).success(success).error(error);
        };
        
         /*Api for listing*/
        this.getListing = function(data, success, error) {
             var query = '';
            if(data.search!==undefined && data.search!==''){query+= '&search='+data.search;}
            return  $http.get(baseUrl + 'api/users/get-user-listing/'+data.page+'?access_token='+accessToken+query,data).success(success).error(error);
        };
        
        /*Api for listing*/
        this.getBusinessPageListing = function(data, success, error) {
             var query = '';
            if(data.search!==undefined && data.search!==''){query+= '&search='+data.search;}
            return  $http.get(baseUrl + 'api/admin/get-patient-business-list/'+data.page+'?access_token='+accessToken+query).success(success).error(error);
        };

         /*Api for listing*/
        this.getListingDetail = function(data, success, error) {
            return  $http.get(baseUrl + 'api/users/listingdetail/'+data+'?access_token='+accessToken).success(success).error(error);
        };
        
         /*Api for delete listing*/
        this.deleteListing = function(data, success, error) {
            return  $http.delete(baseUrl + 'api/admin/deleteListing/'+data.id+'?access_token='+accessToken).success(success).error(error);
        };
        
        
        /*Api for get my listing*/
        this.getMyBusinessListing = function(data, success, error) {
            return  $http.get(baseUrl + 'api/users/get-my-listing?access_token='+accessToken).success(success).error(error);
        };
        
         /*Get All Category Api*/
        this.getCategoryList = function(data, success, error) {
            return  $http.get(baseUrl + 'api/public/getcategory?access_token='+accessToken).success(success).error(error);
        };

         /*Api for create listing*/
        this.updateListing = function (data,businessLogo, success, error) {
             
            if(businessLogo !== '' && businessLogo !== undefined) {
                var imageObj = new FormData();
                imageObj.append('listing_id', data.listing_id);
                imageObj.append('business_name', data.business_name);             
                data.business_category.forEach(function(cat){
                    imageObj.append("business_category[]", cat);
                });
                 
                imageObj.append('neighbour', data.neighbour);
                imageObj.append('phone_number', data.phone_number);
                imageObj.append('address', data.address);
                imageObj.append('website_name',(data.website_name!==undefined && data.website_name!=="") ? data.website_name : "");
                imageObj.append('state', data.state._id);
                imageObj.append('city', data.city);
                imageObj.append('zipcode', data.zipcode);
                imageObj.append('notification_number', data.notification_number);
                imageObj.append('notification_email', data.notification_email);
                imageObj.append('is_notification_email', data.is_notification_email);
                imageObj.append('is_notification_sms', data.is_notification_sms);
                imageObj.append('about_us', (data.about_us!==undefined && data.about_us!=="") ? data.about_us : "");
                imageObj.append('business_logo', businessLogo);
                return $http.post(baseUrl + "api/users/updatelisting?access_token=" + accessToken, imageObj, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(success).error(error);
            } else {
                var listingData = {listing_id:data._id
                        ,business_name:data.business_name
                        ,business_category:data.business_category
                        ,neighbour:data.neighbour,phone_number:data.phone_number,address:data.address
                        ,website_name:data.website_name,state:data.state,city:data.city
                        ,zipcode:data.zipcode,notification_number:data.notification_number,notification_email:data.notification_email,
                        is_notification_email:data.is_notification_email,is_notification_sms:data.is_notification_sms,about_us:data.about_us};
                 return  $http.post(baseUrl + 'api/users/updatelisting?access_token='+accessToken,listingData).success(success).error(error);
            }
          };
        
    }]);