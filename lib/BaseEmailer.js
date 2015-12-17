/**
 * Created by hp on 7/8/2015.
 */
!(function () {
    'use strict'

   // var config = require('../config/env/'+(process.env.NODE_ENV || 'production'));
   // var sendgrid = require('sendgrid')(config.mail.sendgrid.api_user, config.mail.sendgrid.api_password);


 // var BaseEmailer = {
        /*
         * Send email
         * @param {Object}options
         * options = {
         * smtpapi: new sendgrid.smtpapi(),
         * to: options.to,
         * toname: [],
         * from: config.site.adminEmail,
         * fromname: '',
         * subject: options.subject,
         * text: '',
         * html: options.html,
         * bcc: [],
         * cc: [],
         * replyto: '',
         * date: '',
         * files: [
         *  {
         *   filename: '',           // required only if file.content is used.
         *   contentType: '',           // optional
         *   cid: '',           // optional, used to specify cid for inline content
         *   path: '',           //
         *   url: '',           // == One of these three options is required
         *   content: ('' | Buffer) //
         *  }
         * ],
         *  file_data: {},
         *  headers: {}
         *  }
         */
//        sendMail: function (options, callback) {
//            var email
//                , params;
//
//            params = {
//                smtpapi: new sendgrid.smtpapi(),
//                to: options.to,
//                from: config.mail.from_email,
//                fromname: config.mail.from_name,
//                subject: options.subject,
//                html: options.html
//            };
//            email = new sendgrid.Email(params);
//            email.setFilters({
//                'templates': {
//                    'settings': {
//                        'enable': 1,
//                        'template_id' : options.template_id,
//                    }
//                }
//            });
//            sendgrid.send(email, function (err, json) {
//                if (err) {
//                    callback(err);
//                } else {
//                    callback(null, json);
//                }
//
//            });
//        }
//    };
//
//    module.exports = BaseEmailer;

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
//var config = require('../config');
var BaseEmailer = {
    sendMail: function(options, callback) {
        var transporter = nodemailer.createTransport(
                smtpTransport({
    host: 'mail.neuronsolutions.com',
    port: 26,
    
    auth: {
        user: 'rubedk@neuronsolutions.com',
        pass: 'neuron@7890'
    },
    ignoreTLS: true,
    //secure: false,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    //maxConnections: 10,
    debug: true
})
        );
        transporter.sendMail({
            from: 'user1@neuronsolutions.com',
            to: options.to,
            subject: options.subject,
            html: options.html
        }, callback);
    }
};

module.exports = BaseEmailer;
})();