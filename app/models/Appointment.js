/**
 * Created by hp on 27/10/2015.
 */
!(function() {
    'use strict'

    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , mongoosePaginate = require('mongoose-paginate')
        , mongoose = require('mongoose')
        //, DateHelper = require('../../lib/DateHelpers') 
        , Schema = mongoose.Schema
        , patientInfo
        , appointmentSchema;

    patientInfo = new Schema({
        first_name: {type: String},
        last_name: {type: String},
        email: {type: String},
        dob: {type: String},
        gender: {type: String, enum: ['male', 'female', 'other']},
        address: {type: String},
        phone_number: {type: String},
    });

    /*
     * Define Appointment Schema
     */
    appointmentSchema = new Schema({
        listing_id: {type: Schema.Types.ObjectId, ref: 'Listing', required: true},
        doctor_id: {type: String},
        user_id: {type: Schema.Types.ObjectId, ref: 'User'},
        is_new_customer: {type: Boolean, default: true, enum: [true, false]},
        patient_info: patientInfo,
        appointment_date: {type: Date},
        appointment_temp_date: {type: Date},
        appointment_time: {type: String},
        appointment_reason: {type: String},
        insurance: {type: String},
        rescheduled_by: {type: String},
        reffrence_reschedule: {type: Schema.Types.ObjectId, ref: 'Appointment'},
        appointment_status: {type: String, default: 'pending', enum: ['pending', 'visited', 'missed', 'accepted', 'rejected', 'cancelled', 'rescheduled', 'request']},
        status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']}
    });

    appointmentSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    /*
     * Book Appointment
     */
    appointmentSchema.statics.bookAppointment = function(req, callback) {

        var data = {},
            bodyData,
            data = req.body;
        if (data.listing_id !== undefined && data.listing_id !== '') {
           if(data.appointment_id==='' || data.appointment_id===undefined){ 
            data.user_id = req.user._id;
            //data.appointment_date = data.appointment_date;
            //data.appointment_temp_date = data.appointment_date;
            Appointment.create(data, function(err, appointment) {
                if (err) {
                    callback(err);
                } else {
                    if (req.body.reffrence_reschedule !== undefined && req.body.reffrence_reschedule !== '') {
                        appointment.reffrence_reschedule = req.body.reffrence_reschedule;
                    }
                    appointment.save(function(err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, appointment);
                        }
                    });
                }
            });
        }else{
               Appointment.findOne({_id: data.appointment_id}, function(err, appointment) {
                if (err) {
                    callback(err);
                } else {
                       for (bodyData in req.body) {
                        appointment[bodyData] = req.body[bodyData];
                        }
                        appointment.save(function(err) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, appointment);
                                }
                            });
                        }
               });
          }
        } else {
            callback('Listing not found !', false);
        }
    };


    appointmentSchema.statics.getAppointmentByDate = function(req, callback) {
        var data = {},
            data = req.body;

        if (data.appointment_date !== undefined && data.appointment_date !== '') {
            Appointment.find({appointment_date: data.appointment_date, user_id: req.user._id, status: {$ne: "deleted"}}, function(err, appointments) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, appointments);
                }
            }).sort({updated_at: -1}).populate('listing_id', {business_name: 1, business_logo: 1, doctors: 1, business_category: 1, state: 1, city: 1, address: 1, zipcode: 1});
        }
        else {
            callback('Listing not found !', false);
        }
    };
    /*
     * Get listing appointment by date
     */
    appointmentSchema.statics.getListingAppointmentByDate = function(req, callback) {
        var data = {},
            data = req.body,
            sortBy = {};
        var page = req.params.page || 1;
        if (data.appointment_date !== undefined && data.appointment_date !== '') {
//             var start = new Date(data.appointment_date);
//                var end = new Date(data.appointment_date);
//                 end.setHours(23, 59, 59, 999);
//                start.setDate(start.getDate()-1);
//                start.setHours(23, 59, 59, 999);
            sortBy.updated_at = -1;
            //appointment_date: data.appointment_date
            return Appointment.paginate({listing_id: req.body.listing_id, appointment_date: data.appointment_date, appointment_status: {$nin: ["rescheduled"]}, status: {$ne: "deleted"}}, {
                page: page,
                limit: 10,
                populate: [{path: 'listing_id'}],
                sortBy: sortBy,
            }, callback);
        }
        else {
            callback('Listing not found !', false);
        }
    };

    /*
     * Get appointment report
     */
    appointmentSchema.statics.getAppointmentReport = function(req, callback) {
        var data = {},
            data = req.body,
            sortBy = {};

        var condition = {status: {$ne: "deleted"}};
        if (data.patient_id.length) {
            condition.user_id = {$in: data.patient_id};
        }

        if (data.appointment_from && !data.appointment_to) {
            condition.appointment_date = {$gte: new Date(data.appointment_from)};
        }

        if (data.appointment_to && !data.appointment_from) {
            condition.appointment_date = {$lte: new Date(data.appointment_to)};
        }

        if (data.appointment_to && data.appointment_from) {
            condition.appointment_date = {$gte: new Date(data.appointment_from), $lte: new Date(data.appointment_to)};
        }

        if (data.appointment_status) {
            condition.appointment_status = data.appointment_status;
        }


        var page = req.params.page || 1;
        sortBy.updated_at = -1;
        return Appointment.paginate(condition, {
            page: page,
            limit: 10,
            populate: [{path: 'listing_id', select: 'business_name doctors business_logo state city address who_added owner_id'}, {path: 'user_id', select: 'first_name last_name image user_type gender'}],
            sortBy: sortBy
        }, callback);

    };

    appointmentSchema.statics.getAppointmentDetailById = function(req, callback) {

        var data = {},
            data = req.body;

        if (data.appointment_date !== undefined && data.appointment_date !== '') {
            Appointment.find({appointment_date: data.appointment_date, status: {$ne: "deleted"}}, function(err, appointments) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, appointments);
                }
            }).sort({updated_at: -1}).populate('listing_id', {business_name: 1});
        }
        else {
            callback('Listing not found !', false);
        }
    };


    /*
     * Get listing Detail
     */
    appointmentSchema.statics.appointmentDetail = function(req, callback) {
        Appointment.findOne({_id: req.params.id})
            .populate('listing_id', {}).populate('listing_id.business_category.cat_id', {category_icon: 1, category_name: 1})
            .exec(callback);
    };

    /*
     *  Get Listing of favourites appointments
     */
    appointmentSchema.statics.favouritesAppointment = function(req, callback) {
        var sortBy = {}
        , where = {appointment_status: 'visited', user_id: req.user._id};
        sortBy.updated_at = -1;

//        Appointment.paginate(where, {
//            page: req.params.page,
//            limit: 10,
//            populate: [{path: 'listing_id'}, {path: 'listing_id.business_category.cat_id'}],
//            sortBy: sortBy,
//        }, callback);
        
         Appointment.aggregate([
            {$match: {user_id: mongoose.Types.ObjectId(req.user._id), "status": {$ne: "deleted"}}},
            {$group: {
                    "_id": '$listing_id'
                }
            },
            {$sort: {appointment_date: -1}}
        ], function(err, appointments) {
            if (err) {
                callback(err);
            } else {
                  callback(null, appointments);
            }
        });
    };

    /*
     *  Get Listing of upcoming appointments
     */
    appointmentSchema.statics.getUpcomingAppointmentsDate = function(req, callback) {
        //  var today = new Date(req.body.date);
        // var dd = today.getDate();
        // var mm = today.getMonth()+1; //January is 0!
        // var yyyy = today.getFullYear();

//        if(dd<10) {
//            dd='0'+dd;
//        } 

//        if(mm<10) {
//            mm='0'+mm;
//        } 
//        today = yyyy+'/'+mm+'/'+dd;
        //today='2015/11/06';
        Appointment.aggregate([
            {$match: {"appointment_date": {$gte: new Date(req.body.date)}, "user_id": mongoose.Types.ObjectId(req.user._id), "status": {$ne: "deleted"},appointment_status:{$nin:["accepted","cancelled"]}}},
            {$group: {
                    "_id": '$appointment_date'
                }
            },
            {$sort: {appointment_date: -1}}
        ], function(err, appointments) {
            if (err) {
                callback(err);
            } else {
                callback(null, appointments);
            }

        });

    };
    /*
     *  Get Listing of two upcoming appointments
     */
    appointmentSchema.statics.getTwoUpcomingAppointmentsDate = function(req, callback) {
         Appointment.find({"appointment_date": {$gte: new Date(req.body.date)}, "user_id": mongoose.Types.ObjectId(req.user._id), "status": {$ne: "deleted"},appointment_status:{$nin:["accepted","cancelled"]}}, function(err, appointmentsByDate) {
            if (err) {
                callback(err);
            } else {
                callback(null, appointmentsByDate);
            }
        }).limit(2).sort({updated_at: -1}).populate('listing_id', {address: 1, business_logo: 1, business_name: 1, city: 1, state: 1, zipcode: 1, doctors: 1, business_category: 1});

    };

    /*
     *  Get Listing of appointments history
     */
    appointmentSchema.statics.getAppointmentsHistory = function(req, callback) {
        var today = new Date(req.body.date);
//        var dd = today.getDate();
//        var mm = today.getMonth() + 1; //January is 0!
//        var yyyy = today.getFullYear();
//
//        if (dd < 10) {
//            dd = '0' + dd
//        }
//        if (mm < 10) {
//            mm = '0' + mm
//        }
//        today = yyyy + '/' + mm + '/' + dd;
        //today='2015/11/06';
        Appointment.aggregate([
            {$match: {"appointment_date": {$lt: today}, "user_id": req.user._id, "appointment_status":{$in:["visited","missed"]}, "status": {$ne: "deleted"}}},
            {$group: {
                    "_id": '$appointment_date'
                }
            },
            {$sort: {appointment_date: -1}},
        ], function(err, appointments) {
            if (err) {
                callback(err);
            } else {
                callback(null, appointments);
            }

        });

    };

    /*
     * Update status
     */
    appointmentSchema.statics.changeAppointmentStatus = function(req, callback) {
        // Appointment.update({_id: req.params.id}, {appointment_status: req.params.status}).exec(callback);

        var where = {_id: req.params.id};
        Appointment.findOne(where).populate('user_id', {last_name: 1, first_name: 1, email: 1}).exec(function(err, appointments) {
            if (err) {
                callback(err);
            } else {
                appointments.appointment_status = req.params.status;
                appointments.save(function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        if (req.params.status === 'accepted' && appointments.reffrence_reschedule !== undefined && appointments.reffrence_reschedule !== '') {
                            Appointment.update({_id: appointments.reffrence_reschedule}, {appointment_status: "cancelled"}, function(err, data) {
                            })
                        }
                        callback(null, appointments);
                    }
                });
            }
        });
    };
    /*
     *  Get Listing  appointments
     */
    appointmentSchema.statics.getListAppointments = function(req, callback) {
        var where = {listing_id: req.params.id, status: {$ne: "deleted"}};
        Appointment.find(where, function(err, appointments) {
            if (err) {
                callback(err);
            } else {
                callback(null, appointments);
            }
        }).sort({updated_at: -1}).populate('listing_id', {});
    };

    /*
     *  Get Appointment Count
     */
    appointmentSchema.statics.getAppointmentCount = function(req, callback) {
        var condition;
        if(req.body.date!==""){
           condition = {"appointment_date": {$gte: new Date(req.body.date)},"status": {$ne: "deleted"}, "appointment_status": {$in: ["pending", "accepted"]}, "user_id": mongoose.Types.ObjectId(req.user._id)};
          }else{
            condition = {"status": {$ne: "deleted"}, "appointment_status": {$in: ["pending", "accepted"]}, "user_id": mongoose.Types.ObjectId(req.user._id)};
        }
        Appointment.aggregate([
            {$match: condition},
            {$group: {
                    "_id": '$appointment_date'
                }
            },
            {$sort: {appointment_date: -1}}
        ], function(err, appointments) {
            if (err) {
                callback(err);
            } else {

                var count = 1;
                var appointmentDateArray = [];
                if (appointments.length) {
                    var length = appointments.length;
                    appointments.forEach(function(data) {
                        Appointment.count({appointment_date: data._id, "user_id": mongoose.Types.ObjectId(req.user._id),"status": {$ne: "deleted"},"appointment_status": {$in: ["pending", "accepted"]}}, function(err, appointmentCount) {
                            appointmentDateArray.push({date: data._id, count: appointmentCount});
                            if (count === length) {
                                callback(null, appointmentDateArray);
                            }
                            count++;
                        });

                    });
                } else {
                    callback(null, []);
                }

            }

        });
    };

    /*
     *  Get All appointment list
     */
    appointmentSchema.statics.getAllAppointmentList = function(req, callback) {
        Appointment.aggregate([
            {$match: {"status": {$ne: "deleted"}, "appointment_status": {$in: ["pending", "accepted"]}, "user_id": mongoose.Types.ObjectId(req.user._id)}},
            {$group: {
                    "_id": '$appointment_date'
                }
            },
            {$sort: {appointment_date: -1}}
        ], function(err, appointments) {
            if (err) {
                callback(err);
            } else {

                var count = 1;
                var appointmentDateArray = [];
                if (appointments.length) {
                    var length = appointments.length;

                    appointments.forEach(function(data) {
                        Appointment.find({appointment_date: data._id}, function(err, appointmentData) {
                            appointmentDateArray.push({date: data._id, data: appointmentData});
                            if (count === length) {
                                callback(null, appointmentDateArray);
                            }
                            count++;
                        });

                    });
                } else {
                    callback(null, []);
                }

            }

        });
    };

    appointmentSchema.plugin(mongoosePaginate);

    var Appointment = mongoose.model('Appointment', appointmentSchema);

    module.exports = Appointment;
})();