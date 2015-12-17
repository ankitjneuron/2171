/**
 * Created by hp on 7/8/2015.
 */
!(function() {
    'use strict'

    var UserModel = require('../models/User')
        , ListingModel = require('../models/Listing')
        , AppointmentModel = require('../models/Appointment')
        , MasterCategoryModel = require('../models/MasterCategory')
        , MasterStateModel = require('../models/MasterState')
        , UserModel = require('../models/User')
        , Emailer = require('../../lib/Emailer')
        , passport = require('passport')
        , async = require('async')
        , config = require('../../config/env/' + (process.env.NODE_ENV || 'production'))
        , fs      = require('fs')
        , request = require('request');
    var gcm = require('node-gcm');
    var UserController = {
        /*
         *Api for verify user account
         */
        verify: function(req, res, next) {
             UserModel.verifyUser(req, function(err, exists) {
                if (err) {
                    res.redirect("/#login/failed");
                } else {
                    res.redirect("/#login/success");
                }
            });
           
        },
        /*
         *Api for check Email exists or not
         */
        checkEmail: function(req, res, next) {
            UserModel.checkEmailExists(req, function(err, exists) {
                if (err) {
                    return next(err);
                } else {
                    res.json(res, {success: true, data: exists, message: ''});
                }
            });
        },
        /*Api for facebook login
         */
        facebookLogin: function(req, res, next) {
           if(req.body.email !==undefined && req.body.email !=='' && req.body.facebook_id !==undefined && req.body.facebook_id !=='' && req.body.device_type !==undefined && req.body.device_type !=='' && req.body.device_id !==undefined && req.body.device_id !==''){ 
                UserModel.facebookLogin(req, function(err, data) {
                    if (err) {
                         res.json({success: false, data: [], message: err});
                    } else {
                        res.json({success: true, data: data, message: '',basePath: config.app.siteurl+'uploads/profile/'});
                    }
                });
           } else{
               res.json({success: false, data: [], message: 'Required field missing.'});
           }
        },
        /*
         *Api for Change Password
         */
        changePassword: function(req, res, next) {
             UserModel.changePassword(req, function(err, user) {
                if (err) {
                    res.json({success: false, data: user, message: err});
                } else {
                    res.json({
                        success: true,
                        data: user,
                        message: 'Password successfully changed.'
                    });
                }
            });
        },
        /*
         *Api for Update User Profile
         */
        updateProfile: function(req, res, next) {
           UserModel.updateUser(req, function(err, user) {
                if (err) {
                    res.json({success: false, data: [], message: err});
                } else {
                    res.json({
                        success: true,
                        data: user,
                        message: '',
                        basePath: config.app.siteurl+'uploads/profile/'
                    });
                }
            });
        },
        /*
         *Api for User signup
         */
        signup: function(req, res, next) {
            if (req.body.user_type && (req.body.user_type === 'business_user' || req.body.user_type === 'patient')) {
                var error = false;
                var errorObject = {
                    "message": "Validation failed",
                    "name": "ValidationError",
                    "errors": {}
                };

                if (!req.body.email || !req.body.email.trim()) {
                    errorObject.errors.email = {
                        "message": "Path `email` is required.",
                        "name": "ValidatorError",
                        "path": "email",
                        "type": "required"
                    };
                    error = true;
                }
                if (!req.body.password || !req.body.password.trim()) {
                    errorObject.errors.password = {
                        "message": "Path `password` is required.",
                        "name": "ValidatorError",
                        "path": "password",
                        "type": "required"
                    };
                    error = true;
                }

                if (error) {
                    res.json({success: true, data: errorObject, message: ''});
                } else {
                    passport.authenticate('signup', function(err, user, info) {
                        if (err) {
                            return next(err);
                        } else {
                            if (user) {
                                
                                // if (user.user_type === 'business_user') {
                                    
                                    Emailer.BusinessUserSignupEmail(user || '', function (err, response) {
                                        if (err) {
                                           // console.log(err);
                                        } else {
                                          //  console.log(response);
                                        }
                                    });
                                //}
                                res.json({success: true, data: user, message: ''});
                            } else {
                                res.status(200).json({success: true, data: user, message: 'User not created'});
                            }
                        }
                    })(req, res, next);
                }


            } else {
                var err = new Error('Invalid request');
                err.name = 'InvalidRequest';
                err.status = 400;
                next(err);
            }

        },
        create: function(req, res, next) {
           
            UserModel.create({user_type: "admin", email: "test1sdsdsadsadsad11sss@gmail.com", password: "tests123"}, function(err, data) {
                if (err)
                    return next(err);
                {

                    ListingModel.create({business_name: "Test", neighbour: "sadsa", phone_number: "123456", address: "dsadasdsa", business_category: [1, 2]}, function(err, data) {
                        if (err)
                            return next(err);
                        {
                            res.json({message: 'User created!'});
                        }
                    });
                    //  res.json({ message: 'User created!' });
                }
            });
        },
         /*
         *Api for states
         */
        states: function(req, res, next) {
           
            MasterStateModel.getStates(req,function(err,stateList){
                if(err){
                     res.json({success: false, data: err, message: ''});
                }else{
                    res.json({
                        success: true,
                        data: stateList,
                        message: ''
                    });
                }
            });
        },
        /*
         *Api for User Login
         */
        login: function(req, res, next) {
            passport.authenticate('login', function(err, user, info) {
                if (err) {
                    return next(err);
                } else {

                    req.logIn(user, function(err) {
                        if (err) {
                            return next(err);
                        } else {
                            res.json({success: true, data: user.fields(), message: '',basePath: config.app.siteurl+'uploads/profile/'});
                        }
                    });
                }
            })(req, res, next);
        },
         /*
         *Api for send reset password request
         */
        forgotPassword: function (req, res, next) {
            var err;
            UserModel.forgotPassword(req, function (err, user) {
                if (err) {
                     res.json({success: false, data: [], message: err});
                } else if (user) {
                    Emailer.ResetPasswordEmail(user.email || '', user.verify_token, function (err, data) {
                        if (err) {
                           // console.log(err);
                        }else{
                            //console.log(data);
                        }
                    });
                    res.json({success: true, data: true, message: 'Reset password link successfully sent on your email.'});
                } else {
//                    err = new Error('User doesn\'t exists');
//                    err.name = "UserNotExists";
//                    next(err);
                     res.json({success: false, data: err, message: 'User does not exist.'});
                }

            });

        },
         /*
         *Api for me
         */
        me: function (req, res, next) {
            res.json({success: true, data: req.user, message: '',basePath: config.app.siteurl+'uploads/profile/'});
        },
        /*
         *Api for check Email exists or not
         */
        adminDashboardDetail: function(req, res, next) {
             async.series([
                 function countBusinessOwner(callback){
                   UserModel.getUsersCount({user_type:'business_user'},function(err, total){
                       if(err){
                           callback(err);
                       }else{
                           callback(null,total)
                       }
                   });  
                 },
                 function countPatient(callback){
                   UserModel.getUsersCount({user_type:'patient'},function(err, total){
                       if(err){
                           callback(err);
                       }else{
                           callback(null,total)
                       }
                   });  
                 },
                 function countBusinessList(callback){
                   ListingModel.getBusinessListCount(req,function(err, total){
                       if(err){
                           callback(err);
                       }else{
                           callback(null,total)
                       }
                   });  
                 }
             ],
             function(err,results){
                  if (err) {
                        res.json({success: false, data: err, message: ''});
                    } else {
                         res.json({
                            success: true,
                            data: {
                                business_owner: results[0] || 0,
                                patient: results[1] || 0,
                                business_list: results[2] || 0
                            },
                            message: ''
                        });
                    }
             });
        },
        
        /*
         *Api for User Logout
         */
        logout: function(req, res, next) {
            req.logout();
            res.json({success: true, data: '', message: 'User logged out successfully'});
        }
        ,
         /*
         * Get User Listing with pagination
         */
       getUsers: function(req, res, next) {
            UserModel.getUsers(req, function (err, paginatedResults, pageCount, itemCount) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: {totalItems: itemCount, page: pageCount, items: paginatedResults},
                        message: ''
                    });
                }
            });
        },
        /*
         * Get User Listing with pagination
         */
       getAppointmentReport: function(req, res, next) {
            AppointmentModel.getAppointmentReport(req, function (err, paginatedResults, pageCount, itemCount) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: {totalItems: itemCount, page: pageCount, items: paginatedResults},
                        message: ''
                    });
                }
            });
        },
        
         /*
         * Get User Listing with pagination
         */
       getAppointmentCount: function(req, res, next) {
            AppointmentModel.getAppointmentCount(req, function (err,data) {
                if (err) {
                    res.json({success: false, data: err, message: 'No Appointment available.'});
                } else {
                    res.json({
                        success: true,
                        data: data,
                        message: "Appointment count."
                    });
                }
            });
        },
         /*
         * Get all appointment
         */
       getAllAppointment: function(req, res, next) {
            AppointmentModel.getAllAppointmentList(req, function (err,data) {
                if (err) {
                    res.json({success: false, data: err, message: 'No Appointment available.'});
                } else {
                    res.json({
                        success: true,
                        data: data,
                        message: "Appointment list."
                    });
                }
            });
        },
        /*
         * Get All Patient
         */
       getUsersByType: function(req, res, next) {
            UserModel.getUsersByType(req, function (err, patient) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: patient,
                        message: ''
                    });
                }
            });
        },
           /*
         * Change Status
         */
       changeUserStatus: function(req, res, next) {
            UserModel.changeStatus(req, function (err, user) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: user,
                        message: 'User Status Succesfully changed!!!!!!'
                    });
                }
            });
        },
        
         /*
         *Api for reset password
         */
        resetPassword: function (req, res, next) {
            if (req.body.token && req.body.password) {
                UserModel.resetPassword(req, function (err, isReset) {
                    if (err) {
                        return next(err);
                    } else {
                        res.json({success: true, data: isReset, message: ''});
                    }

                });
            } else {
                var err = new Error('Password and token required');
                err.name = 'EmptyFields';
                next(err);
            }
        },
          /*
         *Api for reset password
         */
        sendNotification: function (req, res, next) {
            if (req.body) {
                var message = new gcm.Message();

                message.addData('message_content', {"data":"test1", "listing_id":"1223","type":"patient"});

                var regTokens = ['APA91bGEyYeglkqmSRLU6F9t_oJaaxB_6O79yDK9XTpiiZlWnhEjdbG8oiLWOA-BydTgf7Xq-uEgne5FlrUu1eYc_4s7HyEpSfepkvYcAquAnLhZ7RTAcbw'];

                // Set up the sender with you API key
                var sender = new gcm.Sender(config.app.gcm_api_key);

                // Now the sender can be used to send messages
                sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                    if(err)     res.json({success: false, data: err, message: 'No'});
                  res.json({success: true, data: response, message: 'Yes'});
                });
            } else {
                res.json({success: false, data: req.body, message: ''});
            }
        },
        
         /*
         *Api for check Email exists or not
         */
        userDashboardDetail: function(req, res, next) {
             async.series([
                 function getMyListing(callback){
                   ListingModel.getMyListing(req, function(err, listing) {
                        if (err) {
                             callback(err);
                        } else {
                            callback(null,listing)
                        }
                   });
                 },
                 function getBusinessProfilePercent(callback){
                   ListingModel.getBusinessProfilePercent(req, function(err, profileData) {
                        if (err) {
                             callback(err);
                        } else {
                            callback(null,profileData);
                        }
                   });
                 },
                 function getPendingAppointment(callback){
                   ListingModel.getPendingAppointment(req, function(err, appointment) {
                        if (err) {
                             callback(err);
                        } else {
                            callback(null,appointment);
                        }
                   });
                 },
                  function getUserClaimDetail(callback){
                   ListingModel.getMyClaimDetail(req, function(err, myListing) {
                        if (err) {
                             callback(err);
                        } else {
                            callback(null,myListing);
                        }
                   });
                 } 
                ],
             function(err,results){
                  if (err) {
                        res.json({success: false, data: err, message: ''});
                    } else {
                         res.json({
                            success: true,
                            data: {
                                my_listing: results[0] || false,
                                profile_percentage: results[1] || {percent:0,total:4,percentVal:0},
                                pending_appointment: results[2] || [],
                                my_listing_claim : results[3] || false
                            },
                            message: ''
                        });
                    }
             });
        }
    }
    module.exports = UserController;
})
    ();