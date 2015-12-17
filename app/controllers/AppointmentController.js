/**
 * Created by hp on 28/10/2015.
 */
!(function() {
    'use strict'

    var AppointmentModel = require('../models/Appointment')
        , CategoryModel = require('../models/MasterCategory')
        , ListingModel = require('../models/Listing')
        , UserDeviceModel = require('../models/UserDevice')
        , config = require('../../config/env/' + (process.env.NODE_ENV || 'production'))
        , Emailer = require('../../lib/Emailer')
        , Twilio = require('../../lib/Twilio')
        , Notification = require('../../lib/Notification')
        , gcm = require('node-gcm');

    var _ = require("underscore");

    var AppointmentController = {
        /*
         * Book Appointment
         */
        bookAppointment: function(req, res, next) {
            AppointmentModel.bookAppointment(req, function(err, appointment) {
                if (err) {
                    res.json({success: false, data: [], message: err});
                } else {
                    if (appointment) {


                        ListingModel.listingDetailById(appointment.listing_id, function(err, detail) {
                            if (detail) {
                                if (req.body.appointment_id === '' || req.body.appointment_id === undefined) {
                                    Emailer.BookingRequestEmail({"appointment": appointment, "listing": detail}, function(err, data) {
                                        if (err) {
                                            // console.log(err);
                                        } else {
                                            //console.log(data);
                                        }
                                    });
                                }
                                UserDeviceModel.deviceDetailByUserId(appointment.user_id, function(err, deviceDetail) {
                                    if (deviceDetail) {
                                        var statusType = (req.body.appointment_id === '' || req.body.appointment_id === undefined) ? "booking" : "reschedule";
                                        Notification.AppointmentBooking({"appointment": appointment, "listing": detail, "userDetail": deviceDetail, "statusType": statusType}, function(err, result) {
                                            if (err) {
                                                //console.log(err);
                                            } else {
                                                //console.log(result);
                                            }
                                        });
                                    }
                                });
                            }
                        });


                    }

                    res.json({
                        success: true,
                        data: appointment,
                        message: 'Successfully made an appointment.'
                    });
                }
            });
        },
        /*
         * Book Appointment
         */
        getAppointmentByDate: function(req, res, next) {
            AppointmentModel.getAppointmentByDate(req, function(err, appointments) {
                if (err) {
                    res.json({success: false, data: [], message: err});
                } else {
                    var data = [];
                    _.each(appointments, function(item, index) {

                        var obj = item.toObject();
                        obj.doctor_name = '';
                        if (obj.doctor_id && obj.listing_id.doctors.length) {
                            _.each(obj.listing_id.doctors, function(item, index) {
                                if (item._id.toString() === obj.doctor_id.toString()) {
                                    obj.doctor_name = item.name;
                                }
                            });
                        }
                        data.push(obj);
                    });

                    res.json({
                        success: true,
                        data: data,
                        message: ''
                    });
                }
            });
        },
        /*
         * Get Listing with pagination
         */
        getListingAppointmentByDate: function(req, res, next) {
            AppointmentModel.getListingAppointmentByDate(req, function(err, paginatedResults, pageCount, itemCount) {
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
         * Get Appointment Detail
         */
        appointmentDetail: function(req, res, next) {
            var data = []
                , obj = {};
            AppointmentModel.appointmentDetail(req, function(err, appointment) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    obj = appointment.toObject();
                    obj.doctor_name = '';
                    if (obj.doctor_id && obj.listing_id.doctors.length) {
                        _.each(obj.listing_id.doctors, function(item, index) {
                            if (item._id.toString() === obj.doctor_id.toString()) {
                                obj.doctor_name = item.name;
                            }

                        });
                    }

                    CategoryModel.getCategoryList(req, function(err, paginatedResults, pageCount, itemCount) {
                        if (err) {
                            res.json({success: false, data: err, message: ''});
                        } else {

                            if (obj.listing_id.business_category)
                            {
                                var newCatArr = [];
                                _.each(paginatedResults, function(item, index) {
                                    newCatArr[item._id] = item.category_name;
                                });


                                _.each(obj.listing_id.business_category, function(item, index) {
                                    item.category_name = newCatArr[item.cat_id];
                                });

                            }
                            data.push(obj);
                            res.json({
                                success: true,
                                data: data[0],
                                message: ''
                            });
                        }
                    });


                }
            });
        },
        /*
         * Get Listing of favourites appointments
         */
        favouritesAppointment: function(req, res, next) {
            var data = []
                , obj = {};
            AppointmentModel.favouritesAppointment(req, function(err, listing) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    var i = 1;
                    var length = listing.length;
                    if (length > 0) {
                        _.each(listing, function(item, index) {
                            ListingModel.findOne({_id: item._id, status: {$ne: 'deleted'}}).populate('doctors.speciality.cat_id', {category_name: 1, category_icon: 1}).populate('state', {state_name: 1}).populate('business_category.cat_id', {category_icon: 1, category_name: 1}).exec(function(err, listingData) {
                                data.push(listingData);
                                if (i === length) {
                                    res.json({
                                        success: true,
                                        data: data,
                                        message: 'Listing of favourites appointments',
                                        basePath: config.app.siteurl + 'uploads/'
                                    });
                                }
                                i++;
                            });

                        });
                    } else {
                        res.json({success: true, data: [], message: '', basePath: config.app.siteurl + 'uploads/listing/'});
                    }
                }
            });
        },
        /*
         * Get Upcoming Appointment Detail
         */
        getUpcomingAppointments: function(req, res, next) {
            var data = []
                , obj = {};

            AppointmentModel.getUpcomingAppointmentsDate(req, function(err, appointments) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    var i = 1;
                    var length = appointments.length;
                    if (length > 0) {
                        _.each(appointments, function(item, index) {

                            AppointmentModel.find({appointment_date: item._id, user_id: req.user._id, status: {$ne: "deleted"}}, function(err, appointmentsByDate) {
                                var newData = {};
                                newData.date = item._id;
                                newData.data = appointmentsByDate;
                                data.push(newData);
                                if (i === length) {
                                    res.json({
                                        success: true,
                                        data: data,
                                        message: '',
                                        basePath: config.app.siteurl + 'uploads/listing/'
                                    });
                                }
                                i++;
                            }).sort({updated_at: -1}).populate('listing_id', {address: 1, business_logo: 1, business_name: 1, city: 1, state: 1, zipcode: 1, doctors: 1, business_category: 1});



                        });

                    } else {
                        res.json({success: true, data: [], message: ''});
                    }
                }
            });
        },
        /*
         * Get Two Upcoming Appointment Detail
         */
        getTwoUpcomingAppointments: function(req, res, next) {
            AppointmentModel.getTwoUpcomingAppointmentsDate(req, function(err, appointments) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: appointments,
                        message: '',
                        basePath: config.app.siteurl + 'uploads/listing/'
                    });
                }
            });
        },
        /*
         * Get  Appointment History
         */
        getAppointmentsHistory: function(req, res, next) {
            var data = []
                , obj = {};

            AppointmentModel.getAppointmentsHistory(req, function(err, appointments) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    var i = 1;
                    var length = appointments.length;
                    if (length > 0) {
                        _.each(appointments, function(item, index) {

                            AppointmentModel.find({appointment_date: item._id, user_id: req.user._id, "appointment_status": {$in: ["visited", "missed"]}, "status": {$ne: "deleted"}}, function(err, appointmentsByDate) {
                                var newData = {};
                                newData.date = item._id;
                                newData.data = appointmentsByDate;
                                data.push(newData);
                                if (i === length) {
                                    res.json({
                                        success: true,
                                        data: data,
                                        message: '',
                                        basePath: config.app.siteurl + 'uploads/listing/'
                                    });
                                }
                                i++;
                            }).sort({updated_at: -1}).populate('listing_id', {address: 1, business_logo: 1, business_name: 1, city: 1, state: 1, zipcode: 1, doctors: 1, business_category: 1});
                            ;


                        });
                    } else {
                        res.json({success: true, data: [], message: ''});
                    }

                }
            });
        },
        /*
         * Change Appointment status
         */
        changeAppointmentStatus: function(req, res, next) {
            AppointmentModel.changeAppointmentStatus(req, function(err, appointment) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    if (appointment) {

                        ListingModel.listingDetailById(appointment.listing_id, function(err, detail) {
                            if (detail) {

                                if (detail.notification_email !== undefined && detail.notification_email !== '') {
                                    Emailer.ApproveBookingEmail({"appointment": appointment, "listing": detail}, function(err, data) {
                                        if (err) {
                                            // console.log(err);
                                        } else {
                                            //console.log(data);
                                        }
                                    });
                                }

                                if (detail.notification_number !== undefined && detail.notification_number !== '') {
                                    Twilio.AppointmentMessage({"appointment": appointment, "listing": detail}, function(err, response) {
                                        if (err) {
                                            // console.log(err);
                                        } else {
                                            //console.log(response);
                                        }
                                    });
                                }

                                UserDeviceModel.deviceDetailByUserId(appointment.user_id._id, function(err, deviceDetail) {
                                    if (deviceDetail) {
                                        Notification.AppointmentStatusChange({"appointment": appointment, "listing": detail, "userDetail": deviceDetail}, function(err, result) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log(result);
                                            }
                                        });
                                    }
                                });
                            }

                        });

                    }
                    res.json({
                        success: true,
                        data: [],
                        message: 'Status successfully changed.'
                    });
                }
            });
        },
        /*
         * Get List  Appointments
         */
        getListAppointments: function(req, res, next) {
            AppointmentModel.getListAppointments(req, function(err, appointments) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: appointments,
                        message: 'Listing appointments'
                    });

                }
            });
        },
    }
    module.exports = AppointmentController;
})();