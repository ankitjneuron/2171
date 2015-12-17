/**
 * Created by hp on 7/8/2015.
 */
!(function() {
    'use strict'
    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , Schema = mongoose.Schema
        , listingSchema;
    var Appointment = require('./Appointment');
    var businessCatSchema = new Schema({
        cat_id: {type: Schema.Types.ObjectId, ref: 'MasterCategory'}
    });
    var geocoderProvider = 'google';
    var httpAdapter = 'http';
    var fs = require('fs');
    // optionnal 
    var extra = {
    };
    var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);
    var businessClaimSchema = new Schema({
        user_id: {type: Schema.Types.ObjectId, ref: 'User'},
        status: {type: String, default: 'pending', enum: ['pending', 'deleted', 'accepted', 'rejected', 'cancelled']}
    });
    var scheduleSchema = new Schema({
        availability_day: {type: String},
        availability_status: {type: String, default: 'yes', enum: ['yes', 'no']},
        availability_from: {type: String, default: '12'},
        availability_to: {type: String, default: '12'},
        availability_schedule_from: {type: String, default: 'AM', enum: ['PM', 'AM']},
        availability_schedule_to: {type: String, default: 'AM', enum: ['PM', 'AM']}

    });
    /*
     * Define Appointment Schema
     */
    var availabilitySchema = new Schema({
        availability: [scheduleSchema],
        availability_slot: {type: Number, default: 30, enum: [15, 30, 45, 60]},
        status: {type: String, default: 'active', enum: ['inactive', 'active', 'deleted']}
    });

    /*
     * Define Doctor List Schema
     */
    var doctorListSchema = new Schema({
        name: {type: String},
        image: {type: String, default: 'default-profileimage.jpg'},
        speciality: [businessCatSchema],
        description: {type: String},
    });

    /*
     * Define listing Schema
     */
    listingSchema = new Schema({
        business_name: {type: String},
        business_category: [businessCatSchema],
        business_claim: [businessClaimSchema],
        doctors: [doctorListSchema],
        availability: availabilitySchema,
        neighbour: {type: String},
        phone_number: {type: String},
        address: {type: String},
        loc: {
            type: [Number], // [<longitude>, <latitude>]
            index: '2d'      // create the geospatial index
        },
        country: {type: String, default: 'US'},
        state: {type: Schema.Types.ObjectId, ref: 'MasterState'},
        city: {type: String},
        zipcode: {type: String},
        website_name: {type: String},
        about_us: {type: String},
        notification_number: {type: String},
        notification_email: {type: String},
        is_notification_email: {type: Boolean, default: false},
        is_notification_sms: {type: Boolean, default: false},
        business_logo: {type: String},
        owner_id: {type: Schema.Types.ObjectId, ref: 'User'},
        who_added: {type: Schema.Types.ObjectId, ref: 'User'},
        who_added_role: {type: String, default: 'admin', enum: ['admin', 'business_user', 'patient']},
        is_verified: {type: String, default: 'pending', enum: ['verified', 'pending']},
        is_approved: {type: String, default: 'pending', enum: ['approved', 'disapproved', 'pending']},
        status: {type: String, default: 'inactive', enum: ['active', 'inactive', 'deleted']}
    });

    listingSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    /*
     * Save  Listing
     */
    listingSchema.statics.saveListing = function(req, callback) {

        var data = {},
            category = [],
            bodyData, coords = [];
        data = req.body;

        req.body.business_category.forEach(function(cat) {
            category.push({cat_id: cat});
        });
        data.business_category = category;
        if (req.body.listing_id !== undefined && req.body.listing_id !== '') {

            Listing.findOne({_id: req.body.listing_id}, function(err, listing) {
                if (err) {
                    callback(err);
                } else {

                    for (bodyData in req.body) {
                        listing[bodyData] = req.body[bodyData];
                    }
                    if (req.files.business_logo) {
                        listing.business_logo = req.files.business_logo[0].name;
                    }
                    geocoder.geocode({address: req.body.address, country: req.body.country, zipcode: req.body.zipcode}, function(err, res) {

                        if (err) {
                            callback(err);
                        } else {
                            coords[0] = (!res.length) ? 0 : (res[0].longitude || 0);
                            coords[1] = (!res.length) ? 0 : (res[0].latitude || 0);
                            listing.loc = coords;
                            listing.save(function(err) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, listing);
                                }
                            });

                        }

                    });


                }
            });
        } else {
            data.who_added = req.user._id;
            data.business_logo = 'default_logo.jpg';
            data.who_added_role = req.user.user_type;
            if (req.user.user_type === 'admin') {
                data.is_approved = 'approved';
                data.status = 'active';
            }
            Listing.create(data, function(err, listing) {
                if (err) {
                    callback(err);
                } else {

                    geocoder.geocode({address: req.body.address, country: req.body.country, zipcode: req.body.zipcode}, function(err, res) {

                        if (err) {
                            callback(err);
                        } else {
                            coords[0] = (!res.length) ? 0 : (res[0].longitude || 0);
                            coords[1] = (!res.length) ? 0 : (res[0].latitude || 0);
                            listing.loc = coords;
                            listing.availability = {"avalibility_slot": 30,
                                "availability": [{"availability_day": "Monday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                                    }, {"availability_day": "Tuesday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                                    }, {"availability_day": "Wednesday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                                    }, {"availability_day": "Thursday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                                    }, {"availability_day": "Friday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                                    }, {"availability_day": "Saturday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                                    }, {"availability_day": "Sunday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                                    }]}
                            listing.save(function(err) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, listing);
                                }
                            });

                        }

                    });

                }
            });
        }
    };

    /*
     * Get Business Listing
     */
    listingSchema.statics.getBusinessListing = function(req, callback) {
        var orWhere = []
            , coords = []
            , maxDistance = 10 / 6371
            , sortBy = {}
        , condition = {}
        , activeStatus = 'active';


        /*Add status according to user type*/
//        if (req.body.user_type === 'admin') {
//            activeStatus = {$ne: 'deleted'};
//        }

//        if (req.body.cat_id && req.body.cat_id.length) {
//            orWhere.push({'business_category.cat_id': {$in: req.body.cat_id}});
//        }

//        if (orWhere.length) {
//            condition = {$or: orWhere, 'status': activeStatus,'is_approved': 'approved', 'is_verified': req.query.is_verified};
//        } else {
//            /*For admin listing condition*/
//            if (req.query.is_verified) {
//                condition = (req.query.is_verified === 'pending') ? {'is_verified': req.query.is_verified, 'status': activeStatus} : {'is_approved': 'approved', 'is_verified': req.query.is_verified, 'status': activeStatus};
//            } else {
//                condition = {'status': activeStatus,'is_approved': 'approved'};
//            }
//        }



        /*For get the user listing condition*/
//        if (req.body.owner_id === "true") {
//            condition.owner_id = req.user._id;
//        }
//
//        if (req.body.business_name) {
//            condition.business_name = {"$regex": req.body.business_name, "$options": "i"};
//        }

//        if (req.body.address) {
//            condition.address = {"$regex": req.body.address, "$options": "i"};
//        }
//        if (req.body.longitude && req.body.latitude) {
//            coords[0] = req.body.longitude || 0;
//            coords[1] = req.body.latitude || 0;
//            condition.loc = {
//                $geoWithin: {$centerSphere: [coords, maxDistance]}
//            };
//        }
        if (req.body.cat_id && req.body.cat_id.length) {
            orWhere.push({'business_category.cat_id': {$in: req.body.cat_id}});

        }
        if (req.query.is_verified) {
            if (req.query.is_verified === 'pending') {
                condition = {'is_verified': req.query.is_verified, 'status': activeStatus};

            } else {
                condition = {'is_approved': 'approved', 'is_verified': req.query.is_verified, 'status': activeStatus};
                if (orWhere.length) {
                    condition = {$or: orWhere, 'is_approved': 'approved', 'is_verified': req.query.is_verified, 'status': activeStatus};
                }

                if (req.body.business_name) {
                    condition.business_name = {"$regex": req.body.business_name, "$options": "i"};
                }

                if (req.body.longitude && req.body.latitude) {
                    coords[0] = req.body.longitude || 0;
                    coords[1] = req.body.latitude || 0;
                    condition.loc = {
                        $geoWithin: {$centerSphere: [coords, maxDistance]}
                    };
                }
            }

        } else {
            condition = {'status': activeStatus, 'is_approved': 'approved'};
            if (req.body.address && !req.body.business_name) {
                orWhere.push({address: {"$regex": req.body.address, "$options": "i"}});
                orWhere.push({city: {"$regex": req.body.address, "$options": "i"}});
                orWhere.push({zipcode: {"$regex": req.body.address, "$options": "i"}});
                condition = {$or: orWhere, 'status': activeStatus, 'is_approved': 'approved'};
            }
            if (req.body.business_name && !req.body.address) {
                orWhere.push({business_name: {"$regex": req.body.business_name, "$options": "i"}});
                orWhere.push({doctors: {$elemMatch: {name: {"$regex": req.body.business_name, "$options": "i"}}}});
                // condition.business_name = {"$regex": req.body.business_name, "$options": "i"};
                condition = {$or: orWhere, 'status': activeStatus, 'is_approved': 'approved'};
            }

            if (req.body.business_name && req.body.address) {
                var addressWhere = [];
                var businessWhere = [];
                addressWhere.push({address: {"$regex": req.body.address, "$options": "i"}});
                addressWhere.push({city: {"$regex": req.body.address, "$options": "i"}});
                addressWhere.push({zipcode: {"$regex": req.body.address, "$options": "i"}});
                businessWhere.push({business_name: {"$regex": req.body.business_name, "$options": "i"}});
                businessWhere.push({doctors: {$elemMatch: {name: {"$regex": req.body.business_name, "$options": "i"}}}});
                condition = {$and: [{$or: addressWhere}, {$or: businessWhere}, {'status': activeStatus}, {'is_approved': 'approved'}]};
            }


        }

        /*For get the user listing condition*/
        if (req.body.owner_id === "true") {
            condition.owner_id = req.user._id;
        }

        sortBy.updated_at = -1;
        Listing.paginate(condition, {
            page: req.params.page,
            limit: 10,
            populate: [{path: 'doctors.speciality.cat_id', select: 'category_icon category_name'}, {path: 'state', select: 'state_name'}, {path: 'business_category.cat_id', select: 'category_icon category_name'}, {path: 'owner_id', select: 'first_name last_name'}],
            sortBy: sortBy,
        }, callback);

    };



    /*
     * Get admin  Listings
     */
    listingSchema.statics.getAllListing = function(req, callback) {
        var sortBy = {}
        , condition = {};
        condition = (req.query.is_verified === 'pending') ? {'is_approved': 'approved', 'is_verified': req.query.is_verified, 'status': {$ne: 'deleted'}} : {'is_approved': 'approved', 'is_verified': req.query.is_verified, 'status': {$ne: 'deleted'}};

        if (req.body.business_name) {
            condition.business_name = {"$regex": req.body.business_name, "$options": "i"};
        }

        if (req.body.claim_status !== "" && req.body.claim_status !== undefined) {
            if (req.body.claim_status === "waiting") {
                if (req.body.business_name) {
                    condition = {$or: [{business_claim: []}, {business_claim: {$elemMatch: {status: 'cancelled'}}}, {business_claim: {$elemMatch: {status: 'rejected'}}}], 'is_approved': 'approved', 'is_verified': 'pending', 'status': {$ne: 'deleted'}, business_name: {"$regex": req.body.business_name, "$options": "i"}};
                } else {
                    condition = {$or: [{business_claim: []}, {business_claim: {$elemMatch: {status: 'cancelled'}}}, {business_claim: {$elemMatch: {status: 'rejected'}}}], 'is_approved': 'approved', 'is_verified': 'pending', 'status': {$ne: 'deleted'}};
                }
            }
            if (req.body.claim_status === "pending") {
                condition.business_claim = {$elemMatch: {status: 'pending'}};
            }
            // condition.business_claim = (req.body.claim_status==="waiting") ? {$elemMatch: {status: {$ne:'pending'}}} : {$elemMatch: {status: 'pending'}};
        }

        sortBy.updated_at = -1;
        Listing.paginate(condition, {
            page: req.params.page,
            limit: 10,
            populate: [{path: 'doctors.speciality.cat_id', select: 'category_icon category_name'}, {path: 'state', select: 'state_name'}, {path: 'business_category.cat_id', select: 'category_icon category_name'}, {path: 'owner_id', select: 'first_name last_name'}],
            sortBy: sortBy,
        }, callback);

    };

    /*
     * Get Business Patient Listing
     */
    listingSchema.statics.getPatientBusinessList = function(req, callback) {
        var sortBy = {}
        , where = {is_approved: 'pending', 'who_added_role': 'patient'};
        if (req.query.search) {
            where.business_name = {"$regex": req.query.search, "$options": "i"};
        }
        sortBy.updated_at = -1;

        Listing.paginate(where, {
            page: req.params.page,
            limit: 10,
            populate: [{
                    path: 'who_added',
                    select: 'first_name last_name'
                }, {path: 'business_category.cat_id', select: 'category_icon category_name'}],
            sortBy: sortBy,
        }, callback);
    };

    /*
     * Delete Category
     */
    listingSchema.statics.deleteListing = function(req, callback) {

        Listing.findOne({_id: req.params.id}, function(err, listing) {
            if (err) {
                callback(err);
            } else {

                listing.is_approved = 'disapproved';
                listing.is_verified = 'pending';
                listing.status = 'deleted';
                listing.save(function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, listing);
                    }
                });

            }
        });
    };

    /*
     * Delete Listing and appointment
     */
    listingSchema.statics.deleteListingAndAppointment = function(listId, callback) {

        Listing.findOne({_id: listId}, function(err, listing) {
            if (err) {
                callback(err);
            } else {

                listing.is_approved = 'disapproved';
                listing.is_verified = 'pending';
                listing.status = 'deleted';
                listing.save(function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        Appointment.update({listing_id: listId}, {status: 'deleted'}, {multi: true}, function(err, numAffected) {
                            if (err) {
                                callback(err);
                            } else {
                                callback(null, listing);
                            }
                        });

                    }
                });

            }
        });
    };
    /*
     * Update status
     */
    listingSchema.statics.changeStatus = function(req, callback) {
        Listing.update({_id: req.params.id}, {status: req.params.status}).exec(callback);
    };

    /*
     * Update verify status
     */
    listingSchema.statics.changeVerifyStatus = function(req, callback) {
        Listing.update({_id: req.params.id}, {is_verified: req.params.status}).exec(callback);
    };
    /*
     * Update approved status
     */
    listingSchema.statics.changeApproveStatus = function(req, callback) {
        Listing.update({_id: req.params.id}, {is_approved: req.params.status}).exec(callback);
    };
    /*
     * Get listing Detail
     */
    listingSchema.statics.listingDetail = function(req, callback) {
        Listing.findOne({_id: req.params.id}).populate('doctors.speciality.cat_id', {category_name: 1}).populate('state', {state_name: 1}).populate('business_category.cat_id', {category_icon: 1, category_name: 1}).exec(callback);
    };
    /*
     * Get listing Detail by id
     */
    listingSchema.statics.listingDetailById = function(id, callback) {
        Listing.findOne({_id: id}).populate('owner_id', {first_name: 1, last_name: 1, email: 1}).populate('state', {state_name: 1}).populate('business_category.cat_id', {category_icon: 1, category_name: 1}).exec(callback);
    };


    /*
     * Count users
     */
    listingSchema.statics.getBusinessListCount = function(req, callback) {
        Listing.count({status: {$ne: 'deleted'}}).exec(callback);
    };
    /*
     * Api for save doctor
     */
    listingSchema.statics.addDoctorToList = function(req, callback) {

        var data = {},
            category = [];
        data = req.body;
        if (req.body.listing_id !== undefined && req.body.listing_id !== '') {
            if (req.body.speciality !== undefined) {
                req.body.speciality.forEach(function(cat) {
                    category.push({cat_id: cat});
                });
            }
            data.speciality = category;
            if (req.files.image) {
                data.image = req.files.image[0].name;
            }

            if (req.body.doctor_id === '' || req.body.doctor_id === undefined) {
                Listing.findByIdAndUpdate(req.body.listing_id,
                    {$push: {"doctors": data}}
                , function(err, listing) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, listing);
                    }
                });
            } else {
                var updateData = {'doctors.$.name': req.body.name, 'doctors.$.speciality': category, 'doctors.$.description': req.body.description};
                if (req.files.image) {
                    updateData = {'doctors.$.name': req.body.name, 'doctors.$.speciality': category, 'doctors.$.description': req.body.description, 'doctors.$.image': req.files.image[0].name};
                }

                Listing.update(
                    {'doctors._id': req.body.doctor_id, _id: req.body.listing_id},
                {$set: updateData}, function(err, numAffected) {
                    if (err) {
                        callback(err);
                    } else {
                        if (numAffected.n) {
                            callback(null, numAffected);
                        } else {
                            callback('Please try again !', false);
                        }
                    }
                });
            }
        }
        else {
            callback('Listing not found!!!!!', false);
        }
    };

    listingSchema.statics.addBusinessHoursToList = function(req, callback) {

        var data = {},
            avalibilityHoursArr = [],
            bodyData;
        data = req.body;

        if (req.body.listing_id !== undefined && req.body.listing_id !== '') {

            Listing.findOne({_id: req.body.listing_id}, function(err, listing) {
                if (err) {
                    callback(err);
                } else {
                    listing['availability'] = data;
                    listing.save(function(err) {
                        if (err) {
                            callback(err);
                        } else {

                            callback(null, listing);
                        }
                    });

                }
            });
        }

    };

    listingSchema.statics.claimOnListing = function(req, callback) {
          /*Check user already claim claim*/ 
        Listing.find({business_claim: {$elemMatch: {user_id: req.user._id, status: {$in: ['pending', 'accepted']}}}}, function(err, data) {
            if (err) {
                callback(err);
            } else {

                if (!data.length) {
                    if (req.body.listing_id !== undefined && req.body.listing_id !== '') {
                        /*Check other user claim*/
                        Listing.findOne({_id: req.body.listing_id, business_claim: {$elemMatch: {status: {$in: ['pending', 'accepted']}}}}, function(err, result) {
                            if (err) {
                                callback(err);
                            } else {

                                if (!result) {
                                      /*Check  user pending claim*/
                                    Listing.findOne({$and: [{_id: req.body.listing_id}, {business_claim: {$elemMatch: {user_id: req.user._id, status: 'pending'}}}]}, function(err, listing) {
                                        if (listing) {
                                            callback('Already Claimed!!!!!', false);
                                        } else {
                                            Listing.findByIdAndUpdate(req.body.listing_id,
                                                {$push: {"business_claim": {user_id: req.user._id}}}
                                            , function(err, cliamListing) {
                                                if (err) {
                                                    callback(err);
                                                } else {
                                                    callback(null, cliamListing);
                                                }
                                            });
                                        }

                                    });
                                } else {
                                    callback('Other user already claimed on this listing !', false);
                                }
                            }
                        });
                    } else {
                        callback('List id not recognoize!!!!', false);
                    }
                } else {
                    callback('You have already claimed on this listing !', false);
                }
            }
        });
    };

    /*
     * Accept or reject claim listing
     */
    listingSchema.statics.acceptClaim = function(req, callback) {
//        Listing.find({owner_id: req.body.user_id}, function(err, data) {
//            if (err) {
//                callback(err);
//            } else {
//
//                if (!data.length) {
        Listing.findOne({_id: req.body.listing_id}, function(err, listing) {
            if (err) {
                callback(err);
            } else {
                if (listing.owner_id === undefined || listing.owner_id === '') {
                    listing.business_claim = req.body.claimArray;
                    if (req.body.status === 'accepted') {
                        listing.owner_id = req.body.user_id;
                        listing.is_verified = 'verified';
                        listing.is_approved = 'approved';
                    }
                    listing.save(function(err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, listing);
                        }
                    });

                } else {
                    callback('This listing already assigned !', false);
                }

            }
        });
//                } else {
//                    callback('Listing already assigned for this user !', false);
//                }
        // }
        //});
    };

    /*
     * Accept or reject claim listing
     */
    listingSchema.statics.claimCancel = function(req, callback) {
        Listing.update(
            {'business_claim._id': req.params.claimid, _id: req.params.listingid},
        {$set: {
                'business_claim.$.status': "cancelled"
            }}, function(err, numAffected) {
            if (err) {
                callback(err);
            } else {
                if (numAffected.n) {
                    callback(null, numAffected);
                } else {
                    callback('Please try again !', false);
                }
            }
        });
    };

    /*
     * Get Claimed Listing
     */
    listingSchema.statics.getClaimedListing = function(req, callback) {
        Listing.findOne({_id: req.params.id}).populate('business_claim.user_id', {first_name: 1, last_name: 1, email: 1, phone_number: 1, address: 1, state: 1, city: 1, zipcode: 1, image: 1}).sort('created_at').exec(callback);
    };


    /*
     * Accept or reject  listing from patient
     */
    listingSchema.statics.acceptBusinessList = function(req, callback) {

        Listing.findOne({_id: req.body.listing_id}).populate('who_added', {last_name: 1, first_name: 1, email: 1}).exec(function(err, listing) {

            if (err) {
                callback(err);
            } else {

                listing.is_approved = req.body.status;
                listing.status = "active";
                listing.save();
                callback(null, listing);
            }

        });
    };

    /*
     * Get User listing
     */
    listingSchema.statics.getMyListing = function(req, callback) {
        Listing.findOne({business_claim: {$elemMatch: {user_id: req.user._id, status: {$in: ['pending', 'accepted']}}}, status: {$ne: "deleted"}}).populate('doctors.speciality.cat_id', {category_name: 1}).populate('state', {state_name: 1}).populate('business_category.cat_id', {category_icon: 1, category_name: 1}).exec(function(err, listing) {
            if (err) {
                callback(err);
            } else {
                callback(null, listing);
            }
        });
    };

    /*
     * Get my claim detail
     */
    listingSchema.statics.getMyClaimDetail = function(req, callback) {

        if (req.user === undefined || !req.user) {
            callback(null, {});
        } else {

            Listing.findOne({business_claim: {$elemMatch: {user_id: req.user._id, status: {$in: ['pending', 'accepted']}}}, status: {$ne: "deleted"}}).populate('doctors.speciality.cat_id', {category_name: 1}).populate('state', {state_name: 1}).populate('business_category.cat_id', {category_icon: 1, category_name: 1}).exec(function(err, listing) {
                if (err) {
                    callback(err);
                } else {

                    if (listing) {
                        if (listing.business_claim) {
                            var count = 1;
                            var claimLength = listing.business_claim.length;
                            var claimData = {};
                            listing.business_claim.forEach(function(data) {
                                if (data.user_id.toString() === req.user._id.toString() && (data.status === 'pending' || data.status === 'accepted')) {
                                    claimData = {"listing_id": listing._id, "claim_id": data._id, "status": data.status, user_id: data.user_id};
                                }
                                if (count === claimLength) {
                                    callback(null, claimData);
                                }
                                count++;
                            });
                        } else {
                            callback(null, {});
                        }

                    } else {
                        callback(null, {});
                    }
                }
            });
        }
    };

    /*
     * Get User listing
     */
    listingSchema.statics.getPendingAppointment = function(req, callback) {
        Listing.findOne({business_claim: {$elemMatch: {user_id: req.user._id, status: {$in: ['pending', 'accepted']}}}}).populate('doctors.speciality.cat_id', {category_name: 1}).populate('state', {state_name: 1}).populate('business_category.cat_id', {category_icon: 1, category_name: 1}).exec(function(err, listing) {
            if (err) {
                callback(err);
            } else {
                if (listing) {
                    Appointment.find({listing_id: listing._id, appointment_status: {$in: ['pending']}}).populate('listing_id', {business_name: 1, business_logo: 1}).limit(5).sort({updated_at: 'desc'}).exec(function(err, appointment) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, appointment);
                        }
                    });
                } else {
                    callback(null, []);
                }
            }
        });
    };

    /*
     * Get Profile Comletion percentage
     */
    listingSchema.statics.getBusinessProfilePercent = function(req, callback) {
        Listing.findOne({business_claim: {$elemMatch: {user_id: req.user._id, status: {$in: ['pending', 'accepted']}}}}).populate('doctors.speciality.cat_id', {category_name: 1}).populate('state', {state_name: 1}).populate('business_category.cat_id', {category_icon: 1, category_name: 1}).exec(function(err, listing) {
            if (err) {
                callback(err);
            } else {
                var percentVal = 0;
                var profilePercent = 0;
                if (listing) {
                    if (listing.neighbour !== undefined && listing.neighbour !== '') {
                        percentVal += 1;
                    }
                    if (listing.website_name !== undefined && listing.website_name !== '') {
                        percentVal += 1;
                    }
                    if (listing.business_logo !== undefined && listing.business_logo !== '') {
                        percentVal += 1;
                    }
                    if (listing.about_us !== undefined && listing.about_us !== '') {
                        percentVal += 1;
                    }

                    if (listing.availability) {
                        percentVal += listing.availability.availability.length;
                    }
                }
                profilePercent = (percentVal / 11) * 100;
                profilePercent = profilePercent.toFixed(2);
                profilePercent = (profilePercent > 100 || profilePercent === "100.00") ? 100 : profilePercent;
                callback(null, {percent: profilePercent, total: 11, percentVal: percentVal});
            }
        });
    };

    /*
     * Get listing doctors
     */
    listingSchema.statics.getListingDoctors = function(req, callback) {
        var where = {_id: req.params.id};
        if (req.query.search) {
            where.doctors = {$elemMatch: {name: req.query.search}};
        }
        Listing.findOne(where).populate('doctors.speciality.cat_id', {category_name: 1}).populate('state', {state_name: 1}).populate('business_category.cat_id', {category_icon: 1, category_name: 1}).exec(function(err, listing) {
            if (err) {
                callback(err);
            } else {

                if (listing) {
                    callback(null, listing.doctors);
                } else {
                    callback(null, []);
                }
            }
        });
    };

    /*
     * Delete doctor
     */
    listingSchema.statics.deleteDoctor = function(req, callback) {
        Listing.update({'_id': req.params.listing_id},
        {$pull: {"doctors": {_id: req.params.doctor_id}}},
        function(err, numAffect) {
            if (err) {
                callback(err);
            } else {
                callback(null, [])
            }
        });
    };
    /*
     * Get doctor detail
     */
    listingSchema.statics.getListingDoctorDetail = function(req, callback) {
        var where = {_id: req.params.listing_id, doctors: {$elemMatch: {_id: req.params.doctor_id}}};
        Listing.findOne(where).exec(function(err, listing) {
            if (err) {
                callback(err);
            } else {

                if (listing) {

                    var count = 1;
                    var length = listing.doctors;
                    var doctor = {};
                    listing.doctors.forEach(function(data) {
                        if (data._id.toString() === req.params.doctor_id.toString()) {
                            doctor = data;
                        }
                    });
                    callback(null, doctor || {});
                } else {
                    callback(null, {});
                }
            }
        });
    };
    listingSchema.plugin(mongoosePaginate);

    var Listing = mongoose.model('Listing', listingSchema);

    module.exports = Listing;
})();