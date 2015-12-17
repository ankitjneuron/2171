/**
 * Created by hp on 7/8/2015.
 */
!(function() {
    'use strict'

    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , _ = require("underscore")
        , UserDevice = require('./UserDevice')
        , bcrypt = require('bcrypt-nodejs')
        , request = require('request')
        , Emailer = require('../../lib/Emailer')
        , fs = require('fs')
        , Schema = mongoose.Schema
        , userSchema;

    /*
     * Define User Schema
     */
    userSchema = new Schema({
        user_type: {type: String, enum: ['admin', 'business_user', 'patient']},
        facebook_id: {type: String},
        email: {type: String, required: true},
        password: {type: String, required: true},
        image: {type: String},
        first_name: {type: String},
        dob: {type: String},
        last_name: {type: String},
        username: {type: String},
        gender: {type: String, enum: ['male', 'female', 'other']},
        phone_number: {type: String},
        zipcode: {type: String},
        country: {type: String, default: 'US'},
        state: {type: String},
        city: {type: String},
        address: {type: String},
        last_login: {type: Date},
        loc: {
            type: [Number], // [<longitude>, <latitude>]
            index: '2d'      // create the geospatial index
        },
        status: {type: String, default: 'inactive', enum: ['active', 'inactive', 'deleted']},
        is_approved: {type: Boolean, default: false},
        access_token: {type: String},
        verify_token: {type: String},
        unique_code: {type: String},
        is_receive_email: {type: Boolean, default: false}
    });

    userSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    userSchema.plugin(passportLocalMongoose, {
        usernameField: 'email'
    });



    /*
     * Generate hash password
     */
    userSchema.statics.hashPassword = function(password, callback) {
        bcrypt.hash(password, null, null, callback);
    };
    /*
     * compare hash password
     */
    userSchema.statics.checkPassword = function(password, passwordHash, callback) {
        bcrypt.compare(password, passwordHash, callback);
    };

    /*
     * Generate  random token
     */
    userSchema.methods.generateRandomToken = function() {
        var chars
            , token;
        chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            token = new Date().getTime() + '_';
        for (var x = 0; x < 16; x++) {
            var i = Math.floor(Math.random() * 62);
            token += chars.charAt(i);
        }
        return token;
    };

    /*
     * Generate  random token
     */
    userSchema.static.generateRandomTokenString = function() {
        var chars
            , token;
        chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            token = new Date().getTime() + '_';
        for (var x = 0; x < 16; x++) {
            var i = Math.floor(Math.random() * 62);
            token += chars.charAt(i);
        }
        return token;
    };
    /*
     * Generate  random number
     */
    userSchema.methods.generateRandomNumber = function() {
        var chars
            , token;
        chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            token = '';
        for (var x = 0; x < 16; x++) {
            var i = Math.floor(Math.random() * 62);
            token += chars.charAt(i);
        }
        return token;
    };

    /*
     * Generate alphanumeric random number
     */
    userSchema.methods.generateRandomCode = function() {
        var chars
            , token;
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            token = '';
        for (var x = 0; x < 5; x++) {
            var i = Math.floor(Math.random() * 62);
            token += chars.charAt(i);
        }
        return token;
    };

    var loadBase64Image = function(url, callback) {
        request({url: url, encoding: null}, function(err, res, body) {
            if (!err && res.statusCode === 200) {
                // So as encoding set to null then request body became Buffer object
                var base64prefix = 'data:' + res.headers['content-type'] + ';base64,'
                    , image = body.toString('base64');
                if (typeof callback == 'function') {
                    callback(true, {image: image, base64prefix: base64prefix});
                } else {
                    var err = Error('Can not download image');
                    callback(false, err);
                }
            } else {
                var err = Error('Can not download image');
                callback(false, err);
            }
        });
    };

    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            var err = Error('Invalid input string');
            callback(false, err);
        }
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        return response;
    }

    /*
     * Check email already exists
     */
    userSchema.statics.checkEmailExists = function(req, callback) {
        var where = {'email': req.body.email, status: {$ne: 'deleted'}};
        if (req.user) {
            where._id = {$ne: req.user._id};
        }
        User.findOne(where, function(err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                return callback(null, false);
            } else {
                return callback(null, true);
            }
        });
    };

    /*
     * Save user settings
     */
    userSchema.statics.updateUser = function(req, callback) {
        var bodyData;
        User.findOne({_id: {$ne: req.user._id}, status: {$ne: 'deleted'}, email: req.body.email}, function(err, userData) {
            if (err) {
                callback(err);
            } else {
                if (userData === null) {
                    User.findOne({_id: req.user._id}, function(err, userObject) {
                        if (err) {
                            callback(err);
                        } else {
                            for (bodyData in req.body) {
                                userObject[bodyData] = req.body[bodyData];
                            }
                            if (req.files.image) {
                                userObject.image = req.files.image[0].name;
                            }
                            userObject.save(function(err) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, userObject);
                                }
                            });

                        }
                    });
                } else {
                    var err = 'Email already exist.';
                    callback(err, []);
                }
            }
        });
    };

    /*
     * Send forgot password request
     */
    userSchema.statics.forgotPassword = function(req, callback) {
        var email = req.body.email || '';
        var where = {'email': email};

        User.findOne(where, function(err, user) {
            if (err) {
                callback(err);
            } else if (!user) {
                callback(null, false);
            } else {
                if (user.user_type === req.body.user_type) {
                    if (user.status === 'active') {
                        user.verify_token = user.generateRandomToken();
                        user.save(function(err) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, user);
                            }
                        });
                    } else {
                        callback("Your account is not active, please contact to admin.", false);
                    }
                } else {
                    callback("Invalid user access.", false);
                }
            }
        });
    };
    /*
     * Verify User account
     */
    userSchema.statics.verifyUser = function(req, callback) {
        User.findOne({'verify_token': req.params.token}, function(err, user) {
            if (err) {
                callback(err);
            }
            if (!user) {
                callback('Activation failed !', false);
            } else {
                user.status = "active";
                user.verify_token = user.generateRandomNumber();
                user.save(function(err) {
                    if (err) {
                        callback(err);
                    }
                    callback(null, user);
                });
            }
        });
    };
    /*
     * Api for facebook login and signup
     */
    userSchema.statics.facebookLogin = function(req, callback) {
        var data = req.body;
        var where = {'email': req.body.email, status: 'active'};

        User.findOne(where, function(err, user) {
            if (err) {
                callback(err);
            } else if (user) {
                if(user.user_type==='business_user'){
                      callback('Invalid user access.', false);
                }
                if (user.status !== "active") {
                    callback('Your account is not active, please contact to admin', false);
                } 
                
//                if (req.body.facebook_id === user.facebook_id) {
//                    callback(null, user);
//                } else {
//                    callback('Email already exist', false);
//                }
                callback(null, user);

            } else {



                var password = Math.random().toString(36).slice(2);
                User.hashPassword(password, function(err, userPassword) {
                    if (err) {
                        return done(err);
                    } else {
                        var model = new User(_.extend(req.body, {email: req.body.email, password: userPassword}));
                        model.user_type = req.body.user_type;
                        model.verify_token = model.generateRandomNumber();
                        model.access_token = model.generateRandomToken();
                        model.user_type = 'patient';
                        model.status = 'active';
                        if (req.body.image === '' || req.body.image === undefined) {
                            model.image = 'default-profileimage.jpg';
                            model.save(function(err) {
                                if (err) {
                                    callback(err);
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
                                                callback(err);
                                            }
                                            Emailer.FacebookLoginEmail({email: data.email, password: password}, function(err, data) {
                                                if (err) {
                                                    //console.log(err);
                                                } else {
                                                    //console.log(data);
                                                }
                                            });
                                            callback(null, model);
                                        });
                                    } else {
                                        User.remove({_id: model._id}, function() {
                                        });
                                        callback('Invalid information!', false);
                                    }
                                }
                            });
                        } else {
                            loadBase64Image(req.body.image, function(err, data) {
                                if (err) {
                                    var data = data.base64prefix + ',' + data.image;
                                    var imageBuffer = decodeBase64Image(data);
                                    var imageName = 'profile' + Date.now() + '.jpg';
                                    fs.writeFile('./public/uploads/profile/thumb/' + imageName, imageBuffer.data, function(err) {
                                    });
                                    fs.writeFile('./public/uploads/profile/' + imageName, imageBuffer.data, function(err) {
                                        model.image = imageName;
                                        model.user_type = 'patient';
                                        model.save(function(err) {
                                            if (err) {
                                                callback(err);
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
                                                            callback(err);
                                                        }
                                                        Emailer.FacebookLoginEmail({email: data.email, password: password}, function(err, data) {
                                                            if (err) {
                                                                console.log(err);
                                                            } else {
                                                                console.log(data);
                                                            }
                                                        });
                                                        callback(null, model);
                                                    });
                                                } else {
                                                    User.remove({_id: model._id}, function() {
                                                    });
                                                    callback('Invalid information!', false);
                                                }
                                            }
                                        });
                                    });
                                } else {
                                    callback('Please try again', false);
                                }

                            });

                        }

                    }
                });

            }
        });

    };

    /*
     * Change password request
     */
    userSchema.statics.changePassword = function(req, callback) {
        var where = {'_id': req.user._id};

        User.findOne(where, function(err, user) {
            if (err) {
                callback(err);
            } else if (!user) {
                var err = 'Invalid old password';
                callback(err, false);
            } else {

                User.checkPassword(req.body.old_password, user.password, function(err, password) {
                    if (err) {
                        var err = 'Invalid old password.';
                        callback(err);
                    } else {

                        if (password) {

                            User.hashPassword(req.body.new_password, function(err, userPassword) {
                                if (err) {
                                    callback(err);
                                } else {

                                    user.password = userPassword;
                                    user.save(function(err) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            callback(null, []);
                                        }
                                    })

                                }
                            });
                        } else {

                            var err = 'Invalid old password';
                            callback(err, []);
                        }
                    }
                });
            }
        });
    };

    /*
     * Get  user
     */
    userSchema.statics.getUser = function(data, callback) {
        User.findOne({
            user_type: data.type,
            _id: data.id
        }).exec(function(err, user) {
            if (err) {
                return callback(err);
            } else {
                callback(null, user);

            }
        });
    };

    /*
     * Get  user
     */
    userSchema.statics.getUsersByType = function(req, callback) {
        User.find({
            user_type: req.params.type,
            status: {$ne: "deleted"}
        }).select('first_name last_name email user_type image phone_number address city').exec(function(err, user) {
            if (err) {
                return callback(err);
            } else {
                callback(null, user);

            }
        });
    };

    userSchema.methods.fields = function() {
        var object = this.toObject();
        delete object.password;
        return object;
    };

    /*
     * Get User Listing
     */
    userSchema.statics.getUsers = function(req, callback) {

        var sortBy = {}
        , where = {};
        if (req.query.search) {
            where = {$or: [{'first_name': {"$regex": req.query.search, "$options": "i"}}, {'last_name': {"$regex": req.query.search, "$options": "i"}}, {'email': {"$regex": req.query.search, "$options": "i"}}]};
        }
        where.status = {$ne: 'deleted'};
        where.user_type = req.query.user_type;
        sortBy.updated_at = -1;
        return User.paginate(where, {
            page: req.params.page,
            limit: 10,
            // populate: [{path:'business_category.cat_id',select:'category_icon category_name'}],
            sortBy: sortBy,
        }, callback);
    };

    /*
     * Reset password
     */
    userSchema.statics.resetPassword = function(req, callback) {
        var where = {'verify_token': req.body.token || ''};

        User.findOne(where, function(err, user) {
            if (err) {
                callback(err);
            } else if (!user) {
                callback('Invalid verify token', false);
            } else {

                user.verify_token = '';
                User.hashPassword(req.body.password, function(err, userPassword) {
                    if (err) {
                        callback(err);
                    } else {
                        user.password = userPassword
                        user.save(function(err) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, true);
                            }
                        });

                    }
                });


            }
        });
    };



    userSchema.plugin(mongoosePaginate);


    /*
     * Count users
     */
    userSchema.statics.getUsersCount = function(req, callback) {
        User.count({user_type: req.user_type, status: {$ne: 'deleted'}}).exec(callback);
    };

    userSchema.statics.changeStatus = function(req, callback) {
        User.update({_id: req.params.id}, {status: req.params.status}).exec(callback);
    };
    var User = mongoose.model('User', userSchema);

    User.findOne({user_type: 'admin'}, function(err, user) {
        if (!user) {
            User.create({
                first_name: 'admin',
                last_name: 'user',
                email: 'admin@baya.com',
                password: '$2a$10$58S5hLyD7gJngKo.17wfJOukZsOBH96njrRoEwiSUEtb431LH7uvm',
                user_type: 'admin',
                is_approved: true,
                is_receive_email: true,
                status: 'active'
            }, function(err, model) {

            })
        }
    });

    module.exports = User;
})();