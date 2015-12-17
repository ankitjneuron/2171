/**
 * Created by hp on 27/10/2015.
 */
!(function () {
    'use strict'

    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , Schema = mongoose.Schema
        , availabilitySchema;
    var availabilityTimeSchema = new Schema({
        from: {type: String},
        to:  {type: String},
    });
    var scheduleSchema = new Schema({
        availability_day: {type: String},
        availability_status: {type: String, default: 'yes', enum: ['yes','no']},
        availability_time:[availabilityTimeSchema]
    });
    /*
     * Define Appointment Schema
     */
    availabilitySchema = new Schema({
        listing_id: {type: Schema.Types.ObjectId, ref: 'Listing', required: true},
        availability: [scheduleSchema],
        avalibility_slot: {type: Number, default: 30},
        status: {type: String, default: 'active', enum: ['inactive','active', 'deleted']}
    });

    availabilitySchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });


    availabilitySchema.plugin(mongoosePaginate);

    var Availability = mongoose.model('Availability', availabilitySchema);

    module.exports = Appointment;
})();