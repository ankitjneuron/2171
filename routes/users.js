!(function () {
    'use strict'

    var express = require('express')
        , router = express.Router()
        , Auth = require('../lib/Auth')
        , path = require('path')
        , UserController = require('../app/controllers/UserController')
        ,Listing= require('../app/controllers/ListingController')
        ,Appointment= require('../app/controllers/AppointmentController')
        , Upload = require('../lib/Upload')
       ;


    var route = function (app) {


        router.post('/login', UserController.login);
        router.post('/signup', UserController.signup);
        router.get('/logout', UserController.logout);
        router.post('/create', UserController.create);
        router.get('/states', UserController.states);
        router.post('/forgot-password', UserController.forgotPassword);
        router.post('/reset-password', UserController.resetPassword);
        router.post('/change-password', Auth.isAuthenticated, UserController.changePassword);
        router.get('/me', Auth.isAuthenticated, UserController.me);
        router.post('/claim-on-list', Auth.isAuthenticated, Listing.claimOnListing);
        router.post('/get-all-business-listing/:page', Auth.isAuthenticated, Listing.getAllBusinessListing);
        router.post('/get-user-business-listing/:page', Auth.isPublicAuthenticated, Listing.getUserBusinessListing);
        router.post('/add-doctor-to-list', Auth.isAuthenticated
         , Upload({
                dest: path.join(app.get('rootDirectory'), "public/uploads/profile/"),
                emptyFields: false,
                thumb: true
            })
        , Listing.addDoctorToList);
        router.post('/add-business-hour-to-list', Auth.isAuthenticated, Listing.addBusinessHoursToList);
        router.get('/get-business-detail-by-id/:id', Auth.isAuthenticated, Listing.listingDetail);
        router.post('/facebook-login', UserController.facebookLogin);
        router.post('/save-listing', Auth.isAuthenticated, Listing.saveListing);
        router.post('/appointment', Auth.isAuthenticated, Appointment.bookAppointment);
        router.post('/get-appointments-by-date', Auth.isAuthenticated, Appointment.getAppointmentByDate);
        router.post('/get-listing-appointments-by-date/:page', Auth.isAuthenticated, Appointment.getListingAppointmentByDate);
        router.get('/get-appointment-detail-by-id/:id', Auth.isAuthenticated, Appointment.appointmentDetail);
        router.post('/get-favourites-appointment/:page', Auth.isAuthenticated, Appointment.favouritesAppointment);
        router.post('/get-upcoming-appointments', Auth.isAuthenticated, Appointment.getUpcomingAppointments);
        router.post('/get-appointments-history', Auth.isAuthenticated, Appointment.getAppointmentsHistory);
        router.get('/change-appointment-status/:id/status/:status', Auth.isAuthenticated, Appointment.changeAppointmentStatus);
        router.get('/listingdetail/:id', Auth.isBusinessUserAuthenticated, Listing.listingDetail);
        router.get('/verify/:token',  UserController.verify);
        router.get('/get-list-appointments/:id', Auth.isBusinessUserAuthenticated, Appointment.getListAppointments);
        router.get('/get-my-listing', Auth.isBusinessUserAuthenticated, Listing.getMyListing);
        router.get('/claim-cancel/:claimid/listing/:listingid', Auth.isBusinessUserAuthenticated, Listing.claimCancel);
        router.get('/dashboard', Auth.isBusinessUserAuthenticated, UserController.userDashboardDetail);
        router.get('/get-listing-doctors/:id', Auth.isBusinessUserAuthenticated, Listing.getListingDoctors);
        router.post('/send-notification', UserController.sendNotification);
        /*
         * Update profile
         */
        router.post('/updateprofile', Auth.isAuthenticated
            , Upload({
                dest: path.join(app.get('rootDirectory'), "public/uploads/profile/"),
                emptyFields: false,
                thumb: true
            })
            , UserController.updateProfile);
        /*
         * Api for category save
         */
        router.post('/updatelisting',Auth.isBusinessUserAuthenticated
        , Upload({
                dest: path.join(app.get('rootDirectory'), "public/uploads/listing/"),
                emptyFields: true,
                thumb: true
            }),
         Listing.saveListing);
        /*
         * Api for doctor delete
         */ 
        router.get('/delete-doctor/:doctor_id/listing/:listing_id', Auth.isBusinessUserAuthenticated, Listing.deleteDoctor);
        /*
         * Api for get doctor detail
         */ 
        router.get('/get-doctor-detail/:doctor_id/listing/:listing_id', Auth.isBusinessUserAuthenticated, Listing.getListingDoctorDetail);
    
        /*
         * Api for get all patient
         */ 
        router.get('/get-users-by-type/:type', Auth.isBusinessUserAuthenticated, UserController.getUsersByType);
        /*
         *  Api for get appointment report
         */
        router.post('/get-appointment-report/:page', Auth.isBusinessUserAuthenticated, UserController.getAppointmentReport);
        
        /*
         * Api for get appointment count
         */ 
        router.post('/get-appointment-count', Auth.isAuthenticated, UserController.getAppointmentCount);
        /*
         * Api for get aptient appointment list
         */ 
        router.get('/get-all-appointment-list', Auth.isAuthenticated, UserController.getAllAppointment);
        /*
         * Api for upcoming two appointment 
         */
        router.post('/get-two-upcoming-appointments', Auth.isAuthenticated, Appointment.getTwoUpcomingAppointments);
        app.use('/api/users', router);
    }
    module.exports = route;
})();
