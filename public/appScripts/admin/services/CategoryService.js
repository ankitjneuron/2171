angular.module('bayaApp').service('CategoryService', ['$http', 'UtilityService', function($http, UtilityService) {
        var accessToken = UtilityService.getUserAccessToken();
        /* Login form */
        this.categoryForm = {
            "category_name": "",
            "category_icon": ""
        };

        /*Save Category Api*/
        this.category = function(data, success, error) {

            if (data.category_icon !== undefined && data.category_icon !== '') {
                var imageObj = new FormData();
                imageObj.append('image', data.category_icon);
                imageObj.append('category_name', data.category_name);
                imageObj.append('category_id', data.category_id);
                return $http.post(baseUrl + "api/admin/savecategory?access_token=" + accessToken, imageObj, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(success).error(error);
            } else {
                return  $http.post(baseUrl + 'api/admin/savecategory?access_token=' + accessToken, data).success(success).error(error);
            }
        };

        /* Category List Api*/
        this.categoryList = function(data, success, error) {
            var query = '';
            if(data.category_name!==undefined && data.category_name!==''){query+= '&category_name='+data.category_name;}
             return  $http.get(baseUrl + 'api/admin/getcategorylist/' + data.page + '?access_token=' + accessToken+query).success(success).error(error);
        };

        /* Category Detail Api*/
        this.categoryDetail = function(data, success, error) {
            return  $http.get(baseUrl + 'api/admin/categorydetail/' + data.id + '?access_token=' + accessToken, data).success(success).error(error);
        };
        
        /* Category Delete Api*/
        this.deleteCategory = function(data, success, error) {
            return  $http.delete(baseUrl + 'api/admin/deletecategory/' + data.id + '?access_token=' + accessToken, data).success(success).error(error);
        };
        
        /* Change category status*/
        this.changeStatus = function(data, success, error) {
            return  $http.get(baseUrl + 'api/admin/change-master-category-status/'+data.id+'/status/'+data.enabled+'?access_token='+accessToken).success(success).error(error);
        };
    }]);