/**
 * Created by hp on 28/10/2015.
 */
angular.module('bayaApp').service('SiteService', ['$http', 'UtilityService', function ($http, UtilityService) {
    var accessToken = UtilityService.getUserAccessToken();
    
    /*Get All Business Listing Api*/
    this.getAllBusinessListing = function (data, success, error) {
        if (UtilityService.checkUserLogin()) {
            return  $http.post(baseUrl + 'api/users/get-user-business-listing/'+data.page+'?access_token='+accessToken,data).success(success).error(error);
        } else {
            return  $http.post(baseUrl + 'api/users/get-user-business-listing/'+data.page,data).success(success).error(error);
        }
    };
    
    /*Get Business Listing Api*/
    this.getBusinessListingDetail = function (data, success, error) {
        if (UtilityService.checkUserLogin()) {
            return  $http.get(baseUrl + 'api/users/get-business-detail-by-id/'+data+'?access_token='+accessToken).success(success).error(error);
        } else {
            return  $http.get(baseUrl + 'api/public/get-business-detail-by-id/'+data).success(success).error(error);
        }
    };
    
    /*Get Cms Page Detail Api*/
    this.getCmsPageDetail = function (data, success, error) {
            return  $http.get(baseUrl + 'api/public/getcmspagedetail/'+data.slug).success(success).error(error);
    };
    
    /*Claim On List*/
    this.claimOnList = function (data, success, error) {
        return  $http.post(baseUrl + 'api/users/claim-on-list?access_token='+accessToken,data).success(success).error(error);
        
    };
    
    /*Cancel Claim On List*/
    this.cancelClaimOnList = function (data, success, error) {
        return  $http.get(baseUrl + 'api/users/claim-cancel/'+data.claim_id+'/listing/'+data.listing_id+'?access_token='+accessToken,data).success(success).error(error);
        
    };

}]);