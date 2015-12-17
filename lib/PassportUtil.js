/**
 * Created by hp on 7/8/2015.
 */
!(function() {
    'use strict'

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var User = require('../app/models/User');
    var UserDevice = require('../app/models/UserDevice');
    var _ = require("underscore");
    var util = require('util');


    passport.use('login', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
    function(req, email, password, done) {
        User.findOne({'email': email, 'status': {$ne:'deleted'}}).exec(
            function(err, user) {
                if (err)
                    return done(err);
                if (!user) {
                    var err = new Error('User does not exist.');
                    err.status = 200;
                    return done(err);
                }
                if (user.status === 'inactive') {
                    var err = new Error('Your account is not active, please contact to admin');
                    err.status = 200;
                    return done(err);
                }
                if (user.user_type !== 'patient' && req.body.device_type !== '' && req.body.device_type !== undefined) {
                    var err = new Error('Invalid email or password');
                    err.status = 200;
                    return done(err);
                }

                User.checkPassword(password, user.password, function(err, password) {
                    if (err) {
                        var err = new Error('Invalid email or password');
                        return done(err);
                    } else {
                        if (password) {
                            if (user.user_type === 'patient') {
                                if (req.body.device_type !== '' && req.body.device_type !== undefined && req.body.device_id !== '' && req.body.device_id !== undefined) {
                                    UserDevice.checkDevice(req, user._id, function(err, device) {
                                        if (err) {
                                            var err = new Error('Invalid parameter');
                                             err.status = 200;
                                            return done(err);
                                        } else {
                                          //  user.last_login = new Date();
                                          //  user.save();
                                            User.update({_id:user._id},{$set: { last_login: new Date() }},{},function(err,data){});
                                            return done(null, user);
                                        }
                                    });
                                } else {
                                     var err = new Error('Invalid email or password');
                                     err.status = 200;
                                     return done(err);
                                }
                            } else {
//                                user.last_login = new Date();
//                                user.save();
                                User.update({_id:user._id},{$set: { last_login: new Date() }},{},function(err,data){});
                                return done(null, user);
                            }
                        } else {
                            var err = new Error('Invalid email or password');
                             err.status = 200;
                            return done(err);
                        }
                    }
                });

//                if (user.password != password) {
//                    var err = new Error('Invalid email or password');
//                    return done(err);
//                } else {
//                    return done(null, user);
//                }
            }
        );
    }));


    passport.use('signup', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
    function(req, username, password, done) {
        var findOrCreateUser = function() {

            User.findOne({'email': username, status: {$ne: 'deleted'}}, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    var err = new Error('Email already exists');
                    err.name = "EmailExists";
                    err.status = 200;
                    return done(err);
                } else {
                    User.hashPassword(password, function(err, userPassword) {
                        if (err) {
                            return done(err);
                        } else {
                            var model = new User(_.extend(req.body, {email: username, password: userPassword}));
                            model.user_type = req.body.user_type;
                            model.verify_token = model.generateRandomNumber();
                            model.save(function(err) {
                                if (err) {
                                    return done(err);
                                } else {
                                    if ((req.body.device_type === 'android' || req.body.device_type === 'ios') && req.body.device_type !== '') {
                                        var deviceModel = new UserDevice;
                                        deviceModel.user_id = model._id;
                                        deviceModel.device_type = req.body.device_type;
                                        deviceModel.device_id = req.body.device_id;
                                        deviceModel.certification_type = req.body.certification_type;
                                        deviceModel.save(function(err) {
                                            if (err) {
                                                User.remove({_id: model._id}, function() {
                                                });
                                                return done(err);
                                            }
                                            return done(null, model);
                                        });
                                    } else {
                                        return done(null, model);
                                    }

                                }


                            })

                        }
                    });

                }
            });
        };
        process.nextTick(findOrCreateUser);
    }));


    passport.serializeUser(function(user, done) {
        var createAccessToken = function() {
            var token = user.generateRandomToken();
            User.findOne({access_token: token}, function(err, existingUser) {
                if (err) {
                    return done(err);
                }
                if (existingUser) {
                    createAccessToken();
                } else {

                    if (user.access_token == undefined || user.user_type == 'business_user' || user.user_type == 'patient' || user.user_type == 'admin') {
                        user.set('access_token', token);
                        user.save(function(err) {
                            if (err)
                                return done(err);
                            return done(null, user.get('access_token'));
                        })
                    }
                    else
                        return done(null, user.get('access_token'));
                }
            });
        };

        if (user._id) {
            createAccessToken();
        }
    });

    passport.deserializeUser(function(token, done) {
        User.findOne({access_token: token}, function(err, user) {
            done(err, user);
        });
    });
})();
