angular.module('bayaApp').service('CmsService', ['$http', 'UtilityService', function($http, UtilityService) {
       var accessToken = UtilityService.getUserAccessToken();
        /*Save Category Api*/
        this.cmsImage = function(data, success, error) {

                var imageObj = new FormData();
                imageObj.append('image', data.image);
                imageObj.append('image_title', data.title);
                return $http.post(baseUrl + "api/admin/savecmsimage?access_token=" + accessToken, imageObj, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(success).error(error);
         }; 
         
         /* Cms Image List Api*/
        this.getImageList = function(data, success, error) {
            var query = '';
            if(data.search!==undefined && data.search!==''){query+= '&search='+data.search;}
             return  $http.get(baseUrl + 'api/admin/getcmsimage/' + data.page + '?access_token=' + accessToken+query).success(success).error(error);
        };
        
         /*Api for delete image*/
        this.deleteCmsImage = function(data, success, error) {
            return  $http.delete(baseUrl + 'api/admin/deletecmsimage/'+data.id+'?access_token='+accessToken).success(success).error(error);
        };
        
         /* Cms Image List Api*/
        this.getCmsPageList = function(data, success, error) {
            var query = '';
            if(data.search!==undefined && data.search!==''){query+= '&search='+data.search;}
             return  $http.get(baseUrl + 'api/admin/getcmspage/' + data.page + '?access_token=' + accessToken+query).success(success).error(error);
        };
        
         /* Cms Page Detail Api*/
        this.getCmsPageDetail = function(data, success, error) {
             return  $http.get(baseUrl + 'api/admin/pagedetail/'+data.id+'?access_token=' + accessToken).success(success).error(error);
        };
        
        /* Create and update cms page Api*/
        this.saveCmsPage = function(data, success, error) {
             return  $http.post(baseUrl + 'api/admin/cmspage?access_token=' + accessToken,data).success(success).error(error);
        };
    }]);