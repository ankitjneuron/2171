/**
 * Created by hp on 28/10/2015.
 */
!(function() {
    'use strict'

    var ListingModel = require('../models/Listing')
        , AppointmentModel = require('../models/Appointment')
        , UserModel = require('../models/User')
        , UserDeviceModel = require('../models/UserDevice')
        , config = require('../../config/env/' + (process.env.NODE_ENV || 'production'))
        , Emailer = require('../../lib/Emailer')
        , Notification = require('../../lib/Notification');
    var _ = require("underscore");
    var async = require('async');

    var ListingController = {
        /*
         * Save Listing
         */
        saveListing: function(req, res, next) {
            ListingModel.saveListing(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: listing,
                        message: ''
                    });
                }
            });
        },
        /*
         * Cancel Listing
         */
        cancelListing: function(req, res, next) {
            ListingModel.saveListing(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    if (listing) {

                        ListingModel.deleteListingAndAppointment(req.body.cancel_listing_id, function(err, listing) {
                            if (err) {
                                res.json({success: false, data: err, message: ''});
                            } else {
                                if (err) {
                                    res.json({success: false, data: err, message: ''});
                                } else {
                                    AppointmentModel.find({listing_id: req.body.cancel_listing_id}).populate('user_id', {last_name: 1, first_name: 1, email: 1}).populate('listing_id', {business_name: 1}).exec(function(err, data) {
                                        if (data) {
                                            data.forEach(function(object) {
                                                Emailer.AppointmentCancelEmail(object, function(err, data) {
                                                    if (err) {
                                                        // console.log(err);
                                                    } else {
                                                        //console.log(data);
                                                    }
                                                });
                                            });

                                        }

                                    });

                                    res.json({
                                        success: true,
                                        data: listing,
                                        message: ''
                                    });
                                }
                            }
                        });
                    }
                }
            });
        },
        claimOnListing: function(req, res, next) {
            ListingModel.claimOnListing(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: [], message: err});
                } else {
                    if (listing) {
                        
                        Emailer.ClaimOnListEmail({listing: listing, name: req.user.first_name + ' ' + req.user.last_name}, function(err, data) {
                            if (err) {
                                // console.log(err);
                            } else {
                                //console.log(data);
                            }
                        });
                        
                         Emailer.ClaimOnListingOwnerEmail({listing: listing, name: req.user.first_name + ' ' + req.user.last_name,email:req.user.email}, function(err, data) {
                            if (err) {
                                // console.log(err);
                            } else {
                                //console.log(data);
                            }
                        });

                    }
                    res.json({
                        success: true,
                        data: [],
                        message: 'Successfully claimed.'
                    });
                }
            });
        },
        /*
         * Cancel Listing Claim
         */
        claimCancel: function(req, res, next) {
            ListingModel.claimCancel(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: [], message: err});
                } else {
                    res.json({
                        success: true,
                        data: [],
                        message: 'Claim successfully cancelled.'
                    });
                }
            });
        },
        /*
         * Get Listing with pagination
         */
        getAllBusinessListing: function(req, res, next) {
            ListingModel.getBusinessListing(req, function(err, paginatedResults, pageCount, itemCount) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    var data = [];
                    _.each(paginatedResults, function(item, index) {

                        var obj = item.toObject();
                        var listingClaimArr = [];

                        _.each(obj.business_claim, function(item, index) {
                            listingClaimArr.push(item.user_id.toString());
                        });

                        if (req.user == null)
                        {
                            obj.isClaimed = false;
                        }
                        else {

                            if (listingClaimArr.indexOf(req.user._id.toString()) == -1)
                                obj.isClaimed = false;
                            else
                                obj.isClaimed = true;
                        }
                        data.push(obj);
                    });
                    res.json({
                        success: true,
                        data: {totalItems: itemCount, page: pageCount, items: data},
                        basePath: config.app.siteurl + 'uploads/',
                        message: ''
                    });


                }
            });
        },
        /*
         * Get All Listing with pagination on admin module
         */
        getAllListing: function(req, res, next) {
            ListingModel.getAllListing(req, function(err, paginatedResults, pageCount, itemCount) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: {totalItems: itemCount, page: pageCount, items: paginatedResults},
                        basePath: config.app.siteurl + 'uploads/',
                        message: ''
                    });


                }
            });
        },
        /*
         * Get Listing with pagination
         */
        getUserBusinessListing: function(req, res, next) {


            async.series([
                function getUserBusinessListing(callback) {
                    ListingModel.getBusinessListing(req, function(err, paginatedResults, pageCount, itemCount) {
                        if (err) {
                            callback(err);
                            res.json({success: false, data: err, message: ''});
                        } else {
                            callback(null, {pageCount: pageCount, itemCount: itemCount, data: paginatedResults});

                        }
                    });
                },
                function getUserClaimDetail(callback) {
                    ListingModel.getMyClaimDetail(req, function(err, myClaim) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, myClaim);
                        }
                    });
                }
            ],
                function(err, results) {
                    if (err) {
                        res.json({success: false, data: err, message: ''});
                    } else {
                        res.json({
                            success: true,
                            data: {
                                listing: results[0] || [],
                                my_listing_claim: results[1] || {},
                            },
                            message: ''
                        });
                    }
                });
        },
        /*
         * Get Listing with pagination
         */
        getPatientBusinessList: function(req, res, next) {
            ListingModel.getPatientBusinessList(req, function(err, paginatedResults, pageCount, itemCount) {
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
         * Delete Listing
         */
        deleteListing: function(req, res, next) {
            ListingModel.deleteListing(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: [],
                        message: 'Listing successfully deleted.'
                    });
                }
            });
        },
        /*
         * Change Listing status
         */
        listingStatus: function(req, res, next) {
            ListingModel.changeStatus(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: [],
                        message: 'Status successfully changed.'
                    });
                }
            });
        },
        /*
         * Verify Listing status
         */
        listingVerify: function(req, res, next) {
            ListingModel.changeVerifyStatus(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: [],
                        message: 'Status successfully changed.'
                    });
                }
            });
        },
        /*
         * Approve Listing status
         */
        listingApprove: function(req, res, next) {
            ListingModel.changeApproveStatus(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: [],
                        message: 'Status successfully changed.'
                    });
                }
            });
        },
        /*
         * Get listing Detail
         */
        listingDetail: function(req, res, next) {

            async.series([
                function getListingDetail(callback) {
                    ListingModel.listingDetail(req, function(err, listing) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, listing)
                        }
                    });
                },
                function getUserClaimDetail(callback) {
                    ListingModel.getMyClaimDetail(req, function(err, myListing) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, myListing);
                        }
                    });
                }
            ],
                function(err, results) {
                    if (err) {
                        res.json({success: false, data: err, message: ''});
                    } else {
                        res.json({
                            success: true,
                            data: {
                                listing_detail: results[0] || {},
                                my_listing_claim: results[1] || {},
                            },
                            message: '',
                            basePath: config.app.siteurl + 'uploads/'
                        });
                    }
                });


        },
        addDoctorToList: function(req, res, next) {
            ListingModel.addDoctorToList(req, function(err, doctorListing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: doctorListing,
                        message: ''
                    });
                }
            });
        },
        /*
         * Get Claimed Listing
         */
        getClaimedListing: function(req, res, next) {
            ListingModel.getClaimedListing(req, function(err, cliamedListing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: cliamedListing,
                        message: ''
                    });
                }
            });
        },
        /*
         * Accept or reject claim list
         */
        acceptClaim: function(req, res, next) {
            ListingModel.acceptClaim(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: '', message: err});
                } else {
                    if(listing){
                          UserModel.getUser({"type": "business_user","id":req.body.user_id}, function(err, userDetail) {
                             if (userDetail) {
                                        Emailer.AcceptRejectClaimEmail({listing: listing,userDetail:userDetail,status:req.body.status}, function(err, data) {
                                            if (err) {
                                                // console.log(err);
                                            } else {
                                                //console.log(data);
                                            }
                                       });
                                    }
                                });
         
                    }
                    res.json({
                        success: true,
                        data: [],
                        message: (req.body.status === 'accepted') ? 'Claim successfully accepted.' : 'Claim successfully rejected.'
                    });
                }
            });
        },
        /*
         * Accept or reject claim list
         */
        addBusinessHoursToList: function(req, res, next) {
            ListingModel.addBusinessHoursToList(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: listing,
                        message: ''
                    });
                }
            });
        },
        /*
         * Accept or reject claim list
         */
        acceptBusinessList: function(req, res, next) {
            ListingModel.acceptBusinessList(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: '', message: err});
                } else {
                    if (listing) {

                        Emailer.ApproveBusinessEmail(listing, function(err, data) {
                            if (err) {
                                // console.log(err);
                            } else {
                                //console.log(data);
                            }
                        });
                        UserDeviceModel.deviceDetailByUserId(listing.who_added._id, function(err, deviceDetail) {
                            if (deviceDetail) {
                                Notification.ApproveBusiness({"listing": listing, "userDetail": deviceDetail, "status": req.body.status}, function(err, result) {
                                    if (err) {
                                        //console.log(err);
                                    } else {
                                        //console.log(result);
                                    }
                                });
                            }
                        });

                    }
                    res.json({
                        success: true,
                        data: [],
                        message: (req.body.status === 'approved') ? 'Listing successfully approved.' : 'Listing successfully disapproved.'
                    });
                }
            });
        },
        /*
         * Get My Listing
         */
        getMyListing: function(req, res, next) {
            ListingModel.getMyListing(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: '', message: err});
                } else {
                    res.json({
                        success: true,
                        data: listing,
                        message: 'Listing Details'
                    });
                }
            });
        },
        /*
         * Get My Listing
         */
        getListingDoctors: function(req, res, next) {
            ListingModel.getListingDoctors(req, function(err, doctors) {
                if (err) {
                    res.json({success: false, data: '', message: err});
                } else {
                    res.json({
                        success: true,
                        data: doctors,
                        message: 'Listing Doctors'
                    });
                }
            });
        },
        /*
         *Api for doctor delete
         */
        deleteDoctor: function(req, res, next) {
            ListingModel.deleteDoctor(req, function(err, isReset) {
                if (err) {
                    res.json({success: false, data: '', message: err});
                } else {
                    res.json({success: true, data: isReset, message: ''});
                }
            });
        },
        /*
         *Api for doctor detail
         */
        getListingDoctorDetail: function(req, res, next) {
            ListingModel.getListingDoctorDetail(req, function(err, data) {
                if (err) {
                    res.json({success: false, data: '', message: err});
                } else {
                    res.json({success: true, data: data, message: ''});
                }
            });
        }

    }
    module.exports = ListingController;
})();