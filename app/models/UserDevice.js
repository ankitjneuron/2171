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
        , userDeviceSchema;

    /*
     * Define Master Category Schema
     */
    userDeviceSchema = new Schema({
        user_id: {type: Schema.Types.ObjectId, ref: 'User'},
        device_type: {type: String, enum: ['ios', 'android']},
        certification_type: {type: String},
        device_id: {type: String},
        status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']}
    });

    userDeviceSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    /*
     * Save  Category
     */
    userDeviceSchema.statics.checkDevice = function(req, userId, callback) {
       
        var data = {};
        data = req.body;
        UserDevice.findOne({user_id: userId}, function(err, device) {
            if (err) {
                callback(err);
            } else {
                if (device) {
                    device.device_type = req.body.device_type;
                    device.device_id = req.body.device_id;
                    device.certification_type = req.body.certification_type;
                    device.save(function(err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, device);
                        }
                    });
                } else {
                    var deviceModel = new UserDevice;
                    deviceModel.user_id = userId;
                    deviceModel.device_type = req.body.device_type;
                    deviceModel.device_id = req.body.device_id;
                    deviceModel.certification_type = req.body.certification_type;
                     
                    deviceModel.save(function(err) {
                        if (err) {
                            callback(err);
                             
                        }else{
                        callback(null, true);
                      }
                    });
                }
            }
        });

    };
    
    /*
     * Get device Detail by id
     */
    userDeviceSchema.statics.deviceDetailByUserId = function(id, callback) {
        UserDevice.findOne({user_id: id}).populate('user_id', {}).exec(callback);
    };

    userDeviceSchema.plugin(mongoosePaginate);

    var UserDevice = mongoose.model('UserDevice', userDeviceSchema);

    module.exports = UserDevice;
})();