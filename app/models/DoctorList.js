/**
 * Created by hp on 26/10/2015.
 */
!(function () {
    'use strict'

    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , Schema = mongoose.Schema
        , doctorListSchema;

    var specialitySchema = new Schema({
        cat_id: {type: Schema.Types.ObjectId, ref: 'MasterCategory'}
    });
    /*
     * Define Doctor List Schema
     */
    doctorListSchema = new Schema({
        listing_id: {type: Schema.Types.ObjectId, ref: 'Listing', required: true},
        name: {type: String},
        speciality: [specialitySchema],
        description: {type: String},
    });

    doctorListSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
   

    doctorListSchema.plugin(mongoosePaginate);

    var DoctorList = mongoose.model('DoctorList', doctorListSchema);

    module.exports = DoctorList;
})();