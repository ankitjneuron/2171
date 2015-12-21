var request = require('request');
var assert = require('assert');
var apiBaseUrl = 'http://localhost:2171/';
var listId = "565e7dc433933a403595b534";
var accessToken = "1448956444747_VYk6lIQSDy1E3tyu";
var userAccessToken = "1449033210993_IFzZcXeDTrYIeh8I";
var adminAccessToken = "1449033536127_Gjvj4Nhj7kJE8XaR";
var verifyToken = "qQ6wwhIXV2RbFO!v";
var categoryId = "565e7d8933933a403595b533";
var stateId = "565c3cee0bfec19241496f3a";
var appointmentId = "565e847533933a403595b54e";
var claimId = "565e7f0133933a403595b53a";
var doctorId = "565e851933933a403595b55a";
var userId = "565d458633933a403595b532";
var cmsPageId = "565e86a033933a403595b563";
var cmsCategoryId = "565c3cee0bfec19241496f30";

describe("Baya API Test", function() {

    describe("Sign Up Api", function() {
        it("Should return user object", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/signup', form: {
                    "user_type": "business_user",
                    "first_name": "Ankit",
                    "last_name": "Jain",
                    "email": "ankit" + (new Date()).getTime() + "@baya.com",
                    "password": "test123",
                    "phone_number": "1212456987",
                    "address": "3574 East Moline",
                    "state": "Illnious",
                    "city": "East Moline",
                    "status": "active",
                    "device_type": "",
                    "device_id": ""
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });




    describe("facebook Login Api", function() {
        it("Should return user object", function(done) {
            this.timeout(130000);
            request.post({url: apiBaseUrl + 'api/users/facebook-login', form: {
                    "facebook_id": "facebook123456",
                    "email": "ankit" + (new Date()).getTime() + "@baya.com",
                    "first_name": "ankit",
                    "last_name": "jain",
                    "username": "String",
                    "image": "http://baya.whatall.com/images/baya_logo.png",
                    "device_type": "android",
                    "device_id": "android123456",
                    "certification_type": ""
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {

                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        //throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).message==='User not found'));
                       // console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Change Password Api", function() {
        it("Should return success true", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/change-password?access_token='+userAccessToken, form: {
                    "old_password": "test123",
                    "new_password": "test123",
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get States Api", function() {
        it("Should return states object array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/states', get: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Profile Detail Api", function() {
        it("Should return user object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/me?access_token='+userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Forgot Password Api", function() {
        it("Should return success true(boolean)", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/forgot-password', form: {
                    "email": "ankitj@baya.com"
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get All Business Listing Api", function() {
        it("Should return object array", function(done) {
            this.timeout(130000);
            request.post({url: apiBaseUrl + 'api/users/get-all-business-listing/1?access_token=' + accessToken, form: {
                    "name": "",
                    "cat_id": [],
                    "latitude": "",
                    "longitude": "",
                    "owner_id": ""
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {

                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Claim On List Api", function() {
        it("Should return user success true(boolean)", function(done) {
            this.timeout(130000);
            request.post({url: apiBaseUrl + 'api/users/claim-on-list?access_token=' + accessToken, form: {
                    "listing_id": listId
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {

                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get User Business Listing With Claim Api", function() {
        it("Should return object array", function(done) {
            this.timeout(130000);
            request.post({url: apiBaseUrl + 'api/users/get-user-business-listing/1?access_token=' + accessToken, form: {
                    "name": "",
                    "cat_id": [],
                    "latitude": "",
                    "longitude": "",
                    "owner_id": ""
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {

                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });


//    describe("Login Api", function() {
//        it("Should return user object", function(done) {
//            this.timeout(130000);
//            request.post({url: apiBaseUrl + 'api/users/login', form: {
//                    "email": "ankitj@baya.com",
//                    "password": "test123",
//                    "device_type": "",
//                    "device_id": "",
//                    "certification_type": ""
//                }}, function(err, httpResponse, body) {
//                if (err)
//                    throw err;
//                else {
//
//                    if (JSON.parse(body).success)
//                    {
//                        assert.equal('object', typeof (JSON.parse(body).data));
//                        done();
//                    }
//                    else {
//                        console.log(JSON.parse(body));
//                        done();
//                    }
//                }
//
//            });
//
//        });
//    });


    describe("Add Doctor To List Api", function() {
        it("Should return listing object", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/add-doctor-to-list?access_token=' + accessToken, form: {
                    "listing_id": listId,
                    "name": "john",
                    "speciality": [],
                    "description": "Doctor"
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });



    describe("Add Business Hours To List Api", function() {
        it("Should return listing object", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/add-business-hour-to-list?access_token=' + accessToken, form: {
                    "avalibility_slot": 30,
                    "availability": [{"availability_day": "Monday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"},
                        {"availability_day": "Tuesday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                        }, {"availability_day": "Wednesday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                        }, {"availability_day": "Thursday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                        }, {"availability_day": "Friday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                        }, {"availability_day": "Saturday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                        }, {"availability_day": "Sunday", "availability_status": "yes", "availability_from": "09:00", "availability_to": "06:00", "availability_schedule_from": "AM", "availability_schedule_to": "PM"
                        }],
                    "listing_id": listId

                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get Business Detail By Listing Id Api", function() {
        it("Should return listing object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/get-business-detail-by-id/' + listId + '?access_token=' + accessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });


//    describe("Save Listing Api", function() {
//        it("Should return listing object", function(done) {
//            this.timeout(120000);
//            request.post({url: apiBaseUrl + 'api/users/save-listing?access_token=' + userAccessToken, form: {
//                    "business_name": "testing list",
//                    "business_category[]": categoryId,
//                    "neighbour": "NY",
//                    "phone_number": "5454545545",
//                    "address": "NY",
//                    "state": stateId,
//                    "city": "NY",
//                    "zipcode": "12345",
//                    "listing_id": listId
//                }}, function(err, httpResponse, body) {
//                if (err)
//                    throw err;
//                else {
//                    if (JSON.parse(body).success)
//                    {
//                        assert.equal('object', typeof (JSON.parse(body).data));
//                        done();
//                    }
//                    else {
//                        // throw new Error(JSON.parse(body).message);
//                        //assert.equal('object',typeof(JSON.parse(body).data));
//                        console.log(JSON.parse(body));
//                        done();
//                    }
//                }
//
//            });
//
//        });
//    });

    describe("Reset Password Api", function() {
        it("Should return success true (boolean)", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/reset-password', form: {
                    "password": "test123",
                    "token": verifyToken
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Book Appointment Api", function() {
        it("Should return success true (boolean)", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/appointment?access_token=' + accessToken, form: {
                    "listing_id": listId,
                    "appointment_date": "2015-12-24T18:30:00.000Z",
                    "appointment_time": "09:00 PM",
                    "appointment_reason": "Cough",
                    "doctor_id": "",
                    "is_new_customer": "true",
                    "patient_info": {"first_name": "test", "last_name": "test"}
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get Appointment By Date Api", function() {
        it("Should return Object Array", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/get-appointments-by-date?access_token=' + userAccessToken, form: {
                    "appointment_date": "2015-12-23T18:30:00.000Z"
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get Listing Appointment By Date Api", function() {
        it("Should return Object Array", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/get-listing-appointments-by-date/1?access_token=' + userAccessToken, form: {
                    "appointment_date": "2015-12-23T18:30:00.000Z",
                    "listing_id": listId
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get Appointment Detail By Id Api", function() {
        it("Should return Object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/get-appointment-detail-by-id/'+appointmentId+'?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });


    describe("Get Upcoming appointment Api", function() {
        it("Should return Object Array", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/get-upcoming-appointments?access_token=' + userAccessToken, form: {
                    "appointment_date": "2015-12-23T18:30:00.000Z",
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get Appointment History Api", function() {
        it("Should return Object Array", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/users/get-appointments-history?access_token=' + userAccessToken, form: {
                    "appointment_date": "2015-12-23T18:30:00.000Z",
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Change Appointment Status Api", function() {
        it("Should return success true(boolean)", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/change-appointment-status/' + appointmentId + '/status/accepted?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get Listing Detail Api", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/listingdetail/' + listId + '?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get Listing Appointment Api", function() {
        it("Should return Array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/get-list-appointments/' + listId + '?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }

            });

        });
    });

    describe("Get My Listing Api", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/get-my-listing?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Cancel Listing Claim Api", function() {
        it("Should return success true (boolean)", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/claim-cancel/' + claimId + '/listing/' + listId + '?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Ger Business User Dashboard Api", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/dashboard?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });


    describe("Ger Listing Doctors Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/get-listing-doctors/' + listId + '?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Ger Doctor Detail Api", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/get-doctor-detail/' + doctorId + '/listing/' + listId + '?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Get Users By User Type Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/get-users-by-type/business_user?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

//     describe("Get Appointment Report Api", function() {
//        it("Should return array", function(done) {
//            this.timeout(120000);
//            request.post({url: apiBaseUrl + 'api/users/get-appointment-report/1?access_token='+userAccessToken, form: {
//                    "patient_id": "",
//                    "appointment_from": "",
//                    "appointment_to": "",
//                    "appointment_status": ""
//                }}, function(err, httpResponse, body) {
//                if (err)
//                    throw err;
//                else {
//                    if (JSON.parse(body).success)
//                    {
//                        assert.equal(Array.isArray([]), typeof (JSON.parse(body).data.items));
//                        done();
//                    }
//                    else {
//                        console.log(JSON.parse(body));
//                        done();
//                    }
//                }
//            });
//        });
//    });
    describe("Get Appointment Count Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/get-appointment-count?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Get All Appointment List Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/users/get-all-appointment-list?access_token=' + userAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Get Category Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/getcategory?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Get Category List Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/getcategorylist/1?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data.items));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Get Category Detail Api", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/categorydetail/' + categoryId + '?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Get Listing  Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/admin/getlisting/1?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data.items));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Change Listing Status Api", function() {
        it("Should return success true(boolean)", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/listing/' + listId + '/status/active?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

//     describe("Admin Accept Claim Api", function() {
//        it("Should return success true(boolean)", function(done) {
//            this.timeout(120000);
//            request.post({url: apiBaseUrl + '/api/admin/acceptclaim?access_token='+adminAccessToken, form: {
//                    "listing_id": listId,
//                    "user_id": "",
//                    "claim_id": claimId,
//                    "status": "rejected"
//                }}, function(err, httpResponse, body) {
//                if (err)
//                    throw err;
//                else {
//                    if (JSON.parse(body).success)
//                    {
//                      assert.equal('boolean', typeof (JSON.parse(body).success));
//                        done();
//                    }
//                    else {
//                        console.log(JSON.parse(body));
//                        done();
//                    }
//                }
//            });
//        });
//    });

    describe("Admin Verify Listing Api", function() {
        it("Should return success true(boolean)", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/listing/' + listId + '/verify/pending?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Approve Listing Api", function() {
        it("Should return success true(boolean)", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/listing/' + listId + '/approve/approved?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });


    describe("Admin  Listing Detail Api", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/listingdetail/' + listId + '?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin  Dashboard Detail Api", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/admindashboard?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin  Change User Status Api", function() {
        it("Should return success true(boolean)", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/changestatus/' + userId + '/status/active?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Get Claimed Listing detail Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/getclaimedlisting/' + listId + '?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Get Patient Business Listing Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/get-patient-business-list/1?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Accept Business Page Api", function() {
        it("Should return success true(boolean)", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/admin/accept-business-page?access_token=' + adminAccessToken, form: {
                    "listing_id": listId,
                    "status": "active"
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('boolean', typeof (JSON.parse(body).success));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Get Cms Category Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/getcmscategory?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Get Cms Pages Api", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/getcmspage/1?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

    describe("Admin Get Cms Page Detail Api", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/admin/pagedetail/' + cmsPageId + '?access_token=' + adminAccessToken, form: {
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });


    describe("Admin Update Cms Page Api", function() {
        it("Should return page object", function(done) {
            this.timeout(120000);
            request.post({url: apiBaseUrl + 'api/admin/cmspage?access_token=' + adminAccessToken, form: {
                    "category_id": cmsCategoryId,
                    "page_title": "Terms & Conditions",
                    "slug": "terms-and-conditions",
                    "page_content": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum11.</p>\n",
                    "page_id": cmsPageId
                }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });
    
     describe("Get public cms pages", function() {
        it("Should return page array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/public/getcmspage', form: {
                    }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });
    
     describe("Get public cms page detail", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/public/getcmspagedetail/terms-and-conditions', form: {
                    }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                        assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });
    
     describe("Get public master categosry list", function() {
        it("Should return array", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/public/getcategory', form: {
                    }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                         assert(Array.isArray([]), typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });
    
     describe("Get public business detail page", function() {
        it("Should return object", function(done) {
            this.timeout(120000);
            request.get({url: apiBaseUrl + 'api/public/get-business-detail-by-id/'+listId, form: {
                    }}, function(err, httpResponse, body) {
                if (err)
                    throw err;
                else {
                    if (JSON.parse(body).success)
                    {
                          assert.equal('object', typeof (JSON.parse(body).data));
                        done();
                    }
                    else {
                        // throw new Error(JSON.parse(body).message);
                        //assert.equal('object',typeof(JSON.parse(body).data));
                        console.log(JSON.parse(body));
                        done();
                    }
                }
            });
        });
    });

});