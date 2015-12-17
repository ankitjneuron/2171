angular.module('bayaApp').service('ListingService', ['$http', 'UtilityService', function($http, UtilityService) {
       var accessToken = UtilityService.getUserAccessToken();
        /* Listing form */
        this.ListingForm = {
              "business_name": "",
              "category": [],
              "neighbour": "",
              "phone_number": "",
              "address": "",
              "state": "",
              "city": "",
              "zipcode": "",
              "listing_id": "",
              "website_name": ""
        };
        /* Listing form */
        this.acceptClaimForm = {
            "listing_id": "",
            "user_id": "",
            "claim_id": "",
            "status": ""
          };

        /*Get All Category Api*/
        this.getCategoryList = function(data, success, error) {
            return  $http.get(baseUrl + 'api/admin/getcategory/?access_token='+accessToken).success(success).error(error);
        };

        /*Api for create listing*/
        this.saveListing = function (data, success, error) {
            return  $http.post(baseUrl + 'api/admin/savelisting/?access_token='+accessToken,data).success(success).error(error);
        };
        
          /*Api for cancel listing*/
        this.cancelListing = function (data, success, error) {
            return  $http.post(baseUrl + 'api/admin/cancellisting/?access_token='+accessToken,data).success(success).error(error);
        };
        
         /*Api for listing*/
        this.getListing = function(data, success, error) {
             var query = {"user_type":"admin"};
              if(data.claim_status.id!==undefined && data.claim_status!==""){
                  query.claim_status =data.claim_status.id;
              }
            if(data.search!==undefined && data.search!==''){query.business_name = data.search;}
            return  $http.post(baseUrl + 'api/admin/getlisting/'+data.page+'?access_token='+accessToken+'&is_verified='+data.is_verified,query).success(success).error(error);
        };
        
        /*Api for listing*/
        this.getBusinessPageListing = function(data, success, error) {
             var query = '';
            if(data.search!==undefined && data.search!==''){query+= '&search='+data.search;}
            return  $http.get(baseUrl + 'api/admin/get-patient-business-list/'+data.page+'?access_token='+accessToken+query).success(success).error(error);
        };

         /*Api for listing*/
        this.getListingDetail = function(data, success, error) {
            return  $http.get(baseUrl + 'api/admin/listingdetail/'+data+'?access_token='+accessToken).success(success).error(error);
        };
        
         /*Api for delete listing*/
        this.deleteListing = function(data, success, error) {
            return  $http.delete(baseUrl + 'api/admin/deleteListing/'+data.id+'?access_token='+accessToken).success(success).error(error);
        };
        
         /*Api for delete listing*/
        this.acceptBusinessListing = function(data, success, error) {
            return  $http.post(baseUrl + 'api/admin/accept-business-page?access_token='+accessToken,data).success(success).error(error);
        };
        
         /*Api for listing*/
        this.getAdminDashboardDetail = function(data, success, error) {
            return  $http.get(baseUrl + 'api/admin/admindashboard?access_token='+accessToken).success(success).error(error);
        };
         /*Api for claimed listing*/
        this.getClaimedListing = function(data, success, error) {
            return  $http.get(baseUrl + 'api/admin/getclaimedlisting/'+data+'?access_token='+accessToken).success(success).error(error);
        };
        /*Api for create listing*/
        this.acceptClaim = function (data, success, error) {
            return  $http.post(baseUrl + 'api/admin/acceptclaim/?access_token='+accessToken,data).success(success).error(error);
        };
        
         /*Api for change listing status*/
        this.changeListingStatus = function (data, success, error) {
            return  $http.get(baseUrl + 'api/admin/listing/'+data.listing_id+'/status/'+data.status+'?access_token='+accessToken,data).success(success).error(error);
        };
        
    }]);