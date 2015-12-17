/**
 * Created by hp on 7/8/2015.
 */
!(function() {
    'use strict'

    var BaseEmailer = require('./BaseEmailer')
        , dateFormat = require('dateformat')
        , config = require('../config/env/' + (process.env.NODE_ENV || 'production'));
    var Emailer = {
        /*
         * Send broker signup email
         */
        BusinessUserSignupEmail: function(user, callback) {
            var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hi ' + user.first_name + ' ' + user.last_name + ',<p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Please <a href="' + config.app.siteurl + 'api/users/verify/' + user.verify_token + '" style="color:#9479FE">click here</a> to activate your account.</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
            var userSignupTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                '</table>';
            BaseEmailer.sendMail({
                to: user.email,
                subject: 'Registration',
                html: userSignupTemplate
            }, callback);
        },
        /*
         * Send reset password email
         */
        ResetPasswordEmail: function(to, token, callback) {
            var url = config.app.siteurl + '#/reset-password/' + token;
            var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hello,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">A password reset has been requested. If you want to change your password, please follow the following link: <a href="' + url + '" style="color:#9479FE">Reset Password.</a></p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
            var resetPasswordTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                '</table>';
            BaseEmailer.sendMail({
                to: to,
                subject: 'Password reset',
                html: resetPasswordTemplate
            }, callback);
        },
        /*
         * Send facebook password email
         */
        FacebookLoginEmail: function(data, link, callback) {
            var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hello,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Thank you for registration on baya.</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Your login Email: ' + data.email + '</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Password:  ' + data.password + '<p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
            var fbLoginTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                '</table>';

            BaseEmailer.sendMail({
                to: data.email,
                subject: 'Registration',
                html: fbLoginTemplate
            }, callback);
        },
        /*
         * Send booking request email
         */
        BookingRequestEmail: function(data, link, callback) {
            if (data.listing.owner_id !== undefined && data.listing.owner_id !== null) {

                var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hello ' + data.listing.owner_id.first_name + ' ' + data.listing.owner_id.last_name + ',</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment request.</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Patient Name: ' + data.appointment.patient_info.first_name + ' ' + data.appointment.patient_info.last_name + '</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment Date:  ' + dateFormat(data.appointment.appointment_date, "mm/dd/yyyy") + '<p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment Time: ' + data.appointment.appointment_time + '</p>'
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment Reason: ' + data.appointment.appointment_reason + '</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Please verify.<p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
                var bookingTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                    '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                    '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                    '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                    '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                    '</table>';
                BaseEmailer.sendMail({
                    to: data.listing.owner_id.email,
                    subject: 'Appointment Booking Request',
                    html: bookingTemplate
                }, callback);
            }
        },
        /*
         * Send approve booking email
         */
        ApproveBookingEmail: function(data, link, callback) {
            if (data.listing.owner_id !== undefined && data.listing.owner_id !== null) {

                var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hello ' + data.appointment.user_id.first_name + ' ' + data.appointment.user_id.last_name + ',</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Your appointment has been ' + data.appointment.appointment_status + '.</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Patient Name: ' + data.appointment.patient_info.first_name + ' ' + data.appointment.patient_info.last_name + '</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment Date:  ' + dateFormat(data.appointment.appointment_date, "mm/dd/yyyy") + '<p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment Time: ' + data.appointment.appointment_time + '</p>'
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment Reason: ' + data.appointment.appointment_reason + '</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,</p>';
                message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
                var bookingTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                    '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                    '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                    '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                    '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                    '</table>';

                BaseEmailer.sendMail({
                    to: [data.appointment.patient_info.email, data.appointment.user_id.email],
                    subject: 'Appointment Booking information',
                    html: bookingTemplate
                }, callback);
            }
        },
        /*
         * Send approve business listing email
         */
        ApproveBusinessEmail: function(data, link, callback) {

            var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hello ' + data.who_added.first_name + ' ' + data.who_added.last_name + ',</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Your business page ' + data.business_name + ' has been ' + data.is_approved + '.</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Thank you,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
            var businessPageTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                '</table>';

            BaseEmailer.sendMail({
                to: data.who_added.email,
                subject: 'Business Page verification information',
                html: businessPageTemplate
            }, callback);

        },
        /*
         * Send claim on listing email
         */
        ClaimOnListEmail: function(data, link, callback) {

            var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hello Admin,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Business user ' + data.name + ' claimed on ' + data.listing.business_name + ' please approved.</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Thank you,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
            var listingClaimTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                '</table>';

            BaseEmailer.sendMail({
                to: config.app.email,
                subject: 'Listing Claim information',
                html: listingClaimTemplate
            }, callback);

        },
         /*
         * Accept reject claim email
         */
        AcceptRejectClaimEmail: function(data, link, callback) {

            var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hello ' + data.userDetail.first_name+' '+data.userDetail.last_name + ',</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Your claim on ' + data.listing.business_name + ' listing has been '+data.status+'.</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Thank you,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
            var listingClaimTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                '</table>';

            BaseEmailer.sendMail({
                to: data.userDetail.email,
                subject: 'Listing Claim information',
                html: listingClaimTemplate
            }, callback);

        },
         /*
         * Send claim on listing email
         */
        ClaimOnListingOwnerEmail: function(data, link, callback) {

            var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hello ' + data.name + ',</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">You have successfull claimed on ' + data.listing.business_name + '.</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Thank you,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
            var listingClaimTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                '</table>';

            BaseEmailer.sendMail({
                to: data.email,
                subject: 'Listing Claim information',
                html: listingClaimTemplate
            }, callback);

        },
        /*
         * Send approve booking email
         */
        AppointmentCancelEmail: function(data, link, callback) {
            var message = '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Hello ' + data.user_id.first_name + ' ' + data.user_id.last_name + ',</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Your appointment for '+data.listing_id.business_name+' has been cancelled.</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Patient Name: ' + data.patient_info.first_name + ' ' + data.patient_info.last_name + '</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment Date:  ' + dateFormat(data.appointment_date, "mm/dd/yyyy") + '<p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment Time: ' + data.appointment_time + '</p>'
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Appointment Reason: ' + data.appointment_reason + '</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">Regards,</p>';
            message += '<p style="font-family:Tahoma, Geneva, sans-serif; font-size:14px;margin-bottom:10px">The Baya Team</p>';
            var bookingCancelTemplate = '<table align="center" width="730"  border="1" bordercolor="#0da0d3" style="border-collapse:collapse;padding:50px;">' +
                '<tr bgcolor="#F1F2EC" height="35px"><td valign="middle" align="center" style="border-bottom:2px solid #9479FE; padding:15px 0 10px 10px"><img src="' + config.app.siteurl + 'images/baya_logo.png" width="160"/></td></tr>' +
                '<td bordercolor="#0da0d3" style="padding:15px 20px">' + message + '</td></tr>' +
                '<tr bgcolor="#0da0d3" height="35px"><td style="padding:10px 20px">' +
                '<p style="font-family:Tahoma, Geneva, sans-serif;font-size:14px; text-align: center; margin: 0;color:#ffffff">© 2015 - baya.com</p></td></tr>' +
                '</table>';
            BaseEmailer.sendMail({
                to: data.user_id.email,
                subject: 'Appointment Cancelled',
                html: bookingCancelTemplate
            }, callback);

        },
    }


    module.exports = Emailer;
})
    ();