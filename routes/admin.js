!(function() {
    'use strict'

    var express = require('express')
        , router = express.Router()
        , Auth = require('../lib/Auth')
        , path = require('path')
        , ListingController = require('../app/controllers/ListingController')
        , MasterCountryController = require('../app/controllers/MasterCountryController')
        , MasterCategoryController = require('../app/controllers/MasterCategoryController')
        , CmsController = require('../app/controllers/CmsController')
        , UserController = require('../app/controllers/UserController')
        , Upload = require('../lib/Upload');


    var route = function(app) {

         /*
         * Api for category save
         */
        router.post('/savelisting', Auth.isAdminAuthenticated
                   , Upload({
                        dest: path.join(app.get('rootDirectory'), "public/uploads/listing/"),
                        emptyFields: true,
                        thumb: true
                    }),
                  ListingController.saveListing);
         /*
         * Api for cancel listing
         */
        router.post('/cancellisting', Auth.isAdminAuthenticated
                   , Upload({
                        dest: path.join(app.get('rootDirectory'), "public/uploads/listing/"),
                        emptyFields: true,
                        thumb: true
                    }),
                  ListingController.cancelListing);        

          /*
         * Api for listing
         */
        router.post('/getlisting/:page', Auth.isAdminAuthenticated, ListingController.getAllListing);    

         /*
         * Api for delete listing
         */
        router.delete('/deletelisting/:id', Auth.isAdminAuthenticated, ListingController.deleteListing);
        
         /*
         * Api for change listing status
         */
        router.get('/listing/:id/status/:status', Auth.isAdminAuthenticated, ListingController.listingStatus);

        /*
         * Api for change listing verified
         */
        router.get('/listing/:id/verify/:status', Auth.isAdminAuthenticated, ListingController.listingVerify);
        
        /*
         * Api for change listing approve
         */
        router.get('/listing/:id/approve/:status', Auth.isAdminAuthenticated, ListingController.listingApprove);

         /*
         * Api for listing detail
         */
        router.get('/listingdetail/:id', Auth.isAdminAuthenticated, ListingController.listingDetail);
         /*
         * Api for save category
         */
        router.post('/savecategory', Auth.isAdminAuthenticated,
            Upload({
                dest: path.join(app.get('rootDirectory'), "public/uploads/category/"),
                emptyFields: true,
                thumb: true
            }), MasterCategoryController.saveCategory);

         /*
         * Api for  category list
         */
        router.get('/getcategory', Auth.isAuthenticated, MasterCategoryController.category);
        
         /*
         * Api for category list with pagination
         */
        router.get('/getcategorylist/:page', Auth.isAdminAuthenticated, MasterCategoryController.categoryList);
        
         /*
         * Api for category detail 
         */
        router.get('/categorydetail/:id', Auth.isAdminAuthenticated, MasterCategoryController.categoryDetail);
        
         /*
         * Api for delete master category
         */
        router.delete('/deletecategory/:id', Auth.isAdminAuthenticated, MasterCategoryController.deleteCategory);

         /*
         * Api for  create cms category
         */
        router.post('/cmscategory', Auth.isAdminAuthenticated, CmsController.cmsCategory);

         /*
         * Api for  get cms category
         */
        router.get('/getcmscategory', Auth.isAdminAuthenticated, CmsController.getCmsCategory);

         /*
         * Api for create cms page
         */
        router.post('/cmspage', Auth.isAdminAuthenticated, CmsController.cmsPage);

         /*
         * Api for get cms page list
         */
        router.get('/getcmspage/:page', Auth.isAdminAuthenticated, CmsController.getCmsPage);

         /*
         * Api for  get page detail
         */
        router.get('/pagedetail/:id', Auth.isAdminAuthenticated, CmsController.pageDetail);
        
         /*
         * Api for  get admin dashboard
         */
        router.get('/admindashboard', Auth.isAdminAuthenticated, UserController.adminDashboardDetail);


         /*
         * Api for  get admin dashboard
         */
        
        router.get('/changestatus/:id/status/:status', Auth.isAdminAuthenticated, UserController.changeUserStatus);
        /*
         * Save cms image
         */
        router.post('/savecmsimage', Auth.isAdminAuthenticated
            , Upload({
                dest: path.join(app.get('rootDirectory'), "public/uploads/cms/"),
                emptyFields: false,
                thumb: false
            })
            , CmsController.cmsImage);
        
        
         /*
         * Api for delete image
         */
        router.delete('/deletecmsimage/:id', Auth.isAdminAuthenticated, CmsController.deleteImage);

         /*
         * Api for get cms image list
         */
        router.get('/getcmsimage/:page', Auth.isAdminAuthenticated, CmsController.getImage);  
          /*
         * Api for get user listing
         */
        router.get('/getusers/:page', Auth.isAdminAuthenticated, UserController.getUsers);    

         /*
         * Api for  get claimed listing
         */
        router.get('/getclaimedlisting/:id', Auth.isAdminAuthenticated, ListingController.getClaimedListing);
        
         /*
         * Api for accept and reject claimed listing
         */
        router.post('/acceptclaim', Auth.isAdminAuthenticated, ListingController.acceptClaim);
 
 
        /*
         * Api for get patient added business listing
         */
        router.get('/get-patient-business-list/:page', Auth.isAdminAuthenticated, ListingController.getPatientBusinessList);
         
        /*
         * Api for get patient added business listing
         */
        
        router.post('/accept-business-page', Auth.isAdminAuthenticated, ListingController.acceptBusinessList);
        
        app.use('/api/admin', router);
    }
    module.exports = route;
})();
