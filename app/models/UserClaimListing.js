/**
 * Created by hp on 27/10/2015.
 */
!(function () {
    'use strict'

    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
         ,Listing = require('../models/Listing')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , Schema = mongoose.Schema
        , userClaimListingSchema;
         
    /*
     * Define User Claim Schema
     */
    userClaimListingSchema = new Schema({
        listing_id: {type: Schema.Types.ObjectId, ref: 'Listing', required: true},
        user_id:{type: Schema.Types.ObjectId, ref: 'User'},
        status: {type: String, default: 'pending', enum: ['pending', 'deleted', 'approved','accepted','rejected']}
    });

    userClaimListingSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    
     userClaimListingSchema.statics.claimOnListing = function(req, callback) {
        if (req.body.listing_id !== undefined && req.body.listing_id !== '') {
             
           UserClaimListing.findOne({listing_id:req.body.listing_id,user_id:req.user._id}, function(err, cliamListing) {
                if (err) {
                    callback(err);
                } else {
                    if(cliamListing)
                    {
                        callback('Already Claimed!!!!!',false);
                    }
                    else {
                         UserClaimListing.create({listing_id:req.body.listing_id,user_id:req.user._id}, function(err, cliamListing) {
                            if (err) {
                                callback(err);
                            } else {
                                cliamListing.save(function(err) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback(null, cliamListing);
                                    }
                                });

                            }
                        });
                    }
                   

                }
            });
        } else {
             callback('List id not recognoize!!!!',false);
        }
    }; 
       
        userClaimListingSchema.statics.getUserListing = function(id, callback) {
          
        if (id !== undefined && id !== '') {
             
           UserClaimListing.find({user_id:id}, function(err, cliamListing) {
                if (err) {
                    callback(err);
                } else {
                  
                   callback(null, cliamListing);
                }
            });
        } else {
             callback('User id not recognoize!!!!',false);
        }
    };

      
    
     /*
     * Get Claimed Listing
     */
    userClaimListingSchema.statics.getClaimedListing = function(req, callback) {
        UserClaimListing.find({status: 'pending',listing_id: req.params.id}).populate('user_id',{first_name: 1 ,last_name: 1,email: 1,phone_number: 1, address: 1,state:1, city: 1, zipcode: 1, image: 1}).sort('created_at').exec(callback);
    };
    
     /*
     * Accept or reject claim listing
     */
    userClaimListingSchema.statics.acceptClaim = function(req, callback) {
        UserClaimListing.update({_id: req.params.id}, {status: req.params.status}).exec(callback);
    };
    userClaimListingSchema.plugin(mongoosePaginate);
    
    var UserClaimListing = mongoose.model('UserClaimListing', userClaimListingSchema);

    module.exports = UserClaimListing;
})();