/**
 * Created by hp on 27/10/2015.
 */
!(function() {
    'use strict'

    var CmsCategoryModel = require('../models/CmsCategory')
        , client = require('twilio')('AC0a2f968c172b47514f6f1ad61eb98932', '38065851db4d52a939a7233089a252a8')
        , CmsPageModel = require('../models/CmsPage');

    var SiteController = {
        /*
         *Api for get cms page
         */
        getCmsPage: function(req, res, next) {
            CmsPageModel.getCmsPageList(req, function(err, page) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({success: true, data: page, message: ''});
                }
            });
        },
        /*
         *Api for get cms page detail
         */
        pageDetail: function(req, res, next) {
            CmsPageModel.pageDetailBySlug(req, function(err, detail) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({success: true, data: detail, message: ''});
                }
            });
        },
        /*
         *Api for twilio test
         */
        twilioTest: function(req, res, next) {
            client.sendMessage({ 
                to: '+919428100338', // Any number Twilio can deliver to
                from: '+12015914087', // A number you bought from Twilio and can use for outbound communication
                body: 'hello .' // body of the SMS message

            }, function(err, responseData) { //this function is executed when a response is received from Twilio

                if (err) { // "err" is an error received during the request, if any

                    // "responseData" is a JavaScript object containing data received from Twilio.
                    // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                    // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                    console.log(err); // outputs "+14506667788"
                    //console.log(responseData.body); // outputs "word to your mother."
                   res.json({success: false, data: err, message: ''});
                }else{
                 res.json({success: true, data: responseData, message: ''});
             }
            });
        },
    }
    module.exports = SiteController;
})();