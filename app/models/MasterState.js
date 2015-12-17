/**
 * Created by hp on 7/8/2015.
 */
!(function () {
    'use strict'


    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , Schema = mongoose.Schema
        , masterStateSchema;
        
    /*
     * Define Master Category Schema
     */
    masterStateSchema = new Schema({
        state_name: {type: String},
        state_code: {type: String},
        country_id: {type: Schema.Types.ObjectId, ref: 'MasterCountry', required: true},
        status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']}
    });

    masterStateSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
   
   /* Get all states */
   masterStateSchema.statics.getStates = function (req,callback){
       MasterState.find({status: 'active'}).select('state_name state_code').exec(callback);
   };

    masterStateSchema.plugin(mongoosePaginate);

    var MasterState = mongoose.model('MasterState', masterStateSchema);

    module.exports = MasterState;
})();