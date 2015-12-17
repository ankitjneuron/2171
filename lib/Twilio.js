/**
 * Created by hp on 10/12/2015.
 */
!(function() {
    'use strict'

    var BaseEmailer = require('./BaseEmailer')
        , dateFormat = require('dateformat')
        , config = require('../config/env/' + (process.env.NODE_ENV || 'production'))
        , client = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);
    var Twilio = {
        /*
         * Send appointment booking message
         */
        AppointmentMessage: function(data,callback) {
            client.sendMessage({
                to: config.twilio.country_code + data.listing.notification_number, // Any number Twilio can deliver to
                from: config.twilio.registered_number, // A number you bought from Twilio and can use for outbound communication
                body: 'Your Appointment for '+data.listing.business_name+' date '+dateFormat(data.appointment.appointment_date, "mm/dd/yyyy")+' has been '+data.appointment.appointment_status+' ' // body of the SMS message

            }, function(err, responseData) { //this function is executed when a response is received from Twilio
                if(err){
                    callback(err);
                }else{
                     callback(null,responseData);
                }
            });
        },
        
    }


    module.exports = Twilio;
})
    ();