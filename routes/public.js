!(function() {
    'use strict'

    var express = require('express')
            , router = express.Router()
            , MasterCategoryController = require('../app/controllers/MasterCategoryController')
            , SiteController = require('../app/controllers/SiteController')
            , ListingController = require('../app/controllers/ListingController');


    var route = function(app) {

        router.get('/getcmspage', SiteController.getCmsPage);
        router.get('/getcategory', MasterCategoryController.category);
        router.get('/get-patient-category', MasterCategoryController.patientCategory);
        router.post('/getbusinesslisting/:page', ListingController.getAllBusinessListing);
        router.get('/get-business-detail-by-id/:id', ListingController.listingDetail);
        router.get('/getcmspagedetail/:slug', SiteController.pageDetail);
        router.get('/twilio', SiteController.twilioTest);
        app.use('/api/public', router);
    }
    module.exports = route;
})();
