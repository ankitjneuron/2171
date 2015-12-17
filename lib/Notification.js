/**
 * Created by hp on 10/12/2015.
 */
!(function() {
    'use strict'

    var BaseEmailer = require('./BaseEmailer')
        , dateFormat = require('dateformat')
        , config = require('../config/env/' + (process.env.NODE_ENV || 'production'))
        , gcm = require('node-gcm');
    var Notification = {
         /*
         * Send appointment booking message
         */
        AppointmentBooking: function(data, callback) {
            var msg = (data.statusType==="booking") ? 'Appointment successfully booked.' : 'Your appointment has been recheduled.';
            var message = new gcm.Message();
            message.addData('message_content', {
                "message": msg, 
                "appointment_id": data.appointment._id,
                "listing_id": data.appointment.listing_id,
                "appointment_date": dateFormat(data.appointment.appointment_date, "mm/dd/yyyy"),
                "appointment_time":  data.appointment.appointment_time,
                "appointment_reason": data.appointment.appointment_reason,
                "type": "appointment"});
            var regTokens = [data.userDetail.device_id];
            // Set up the sender with you API key
            var sender = new gcm.Sender(config.app.gcm_api_key);

            // Now the sender can be used to send messages
            sender.send(message, {registrationTokens: regTokens}, function(err, response)
            {
                if (err) {
                    callback(err);
                } else {
                    callback(null, response);
                }
            });

        },
        /*
         * Send appointment status change message
         */
        AppointmentStatusChange: function(data, callback) {
            var message = new gcm.Message();
            message.addData('message_content', {
                "message": 'Your Appointment for '+data.listing.business_name+' date '+dateFormat(data.appointment.appointment_date, "mm/dd/yyyy")+' has been '+data.appointment.appointment_status+' ', 
                "appointment_id": data.appointment._id,
                "listing_id": data.appointment.listing_id,
                "type": "appointment"});
            var regTokens = [data.userDetail.device_id];
            // Set up the sender with you API key
            var sender = new gcm.Sender(config.app.gcm_api_key);

            // Now the sender can be used to send messages
            sender.send(message, {registrationTokens: regTokens}, function(err, response)
            {
                if (err) {
                    callback(err);
                } else {
                    callback(null, response);
                }
            });

        },
        /*
         * Send business approved/disapproved message
         */
        ApproveBusiness: function(data, callback) {
            var message = new gcm.Message();
            message.addData('message_content', {
                "message": 'Your business '+data.listing.business_name+' hase been '+data.status+'', 
                "listing_id": data.listing._id,
                "type": "listing"});
            var regTokens = [data.userDetail.device_id];
            // Set up the sender with you API key
            var sender = new gcm.Sender(config.app.gcm_api_key);
            // Now the sender can be used to send messages
            sender.send(message, {registrationTokens: regTokens}, function(err, response)
            {
                if (err) {
                    callback(err);
                } else {
                    callback(null, response);
                }
            });

        },
    }


    module.exports = Notification;
})
    ();