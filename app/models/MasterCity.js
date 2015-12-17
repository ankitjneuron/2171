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
        , masterCitySchema;
        
    /*
     * Define Master Category Schema
     */
    masterCitySchema = new Schema({
        city_name: {type: String},
        state_id: {type: Schema.Types.ObjectId, ref: 'MasterState', required: true},
        status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']}
    });

    masterCitySchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
   

    masterCitySchema.plugin(mongoosePaginate);

    var MasterCity = mongoose.model('MasterCity', masterCitySchema);

    module.exports = MasterCity;
})();