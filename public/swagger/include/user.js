
/**
 * @swagger
 * resourcePath: /users
 * description: All about API
 */

/**
 * @swagger
 * path: /api/users/login
 * operations:
 *   -  httpMethod: POST
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      responseClass: User
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: Your login detail
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/users/facebook-login
 * operations:
 *   -  httpMethod: POST
 *      summary: Login with facebook
 *      notes: in with facebook
 *      responseClass: FacebookLogin
 *      nickname: facebooklogin
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: Login with facebook
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/users/signup
 * operations:
 *   -  httpMethod: POST
 *      summary: Signup with username and password & other details
 *      notes: Returns a user based on username
 *      responseClass: SignUp
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: User Details
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/users/updateprofile
 * operations:
 *   -  httpMethod: POST
 *      summary: Update user profile
 *      notes: Update user profile
 *      responseClass: UpdateProfile
 *      nickname: pdateprofile
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: body
 *          description: Update user profile
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/users/change-password
 * operations:
 *   -  httpMethod: POST
 *      summary: change password
 *      notes: change password
 *      responseClass: ChangePassword
 *      nickname: changepassword
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: body
 *          description: change password
 *          paramType: body
 *          required: true
 *          dataType: body
 */

/**
 * @swagger
 * path: /api/users/states
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all states list
 *      notes: Get all states list
 *      nickname: states
 *      consumes: 
 *        - text/html
 */
/**
 * @swagger
 * path: /api/users/logout
 * operations:
 *   -  httpMethod: GET
 *      summary: User Logout
 *      notes: User Logout
 *      nickname: logout
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 */
/**
 * @swagger
 * path: /api/users/me
 * operations:
 *   -  httpMethod: GET
 *      summary: User Logout
 *      notes: User Logout
 *      nickname: logout
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 */
/**
 * @swagger
 * path: /api/users/forgot-password
 * operations:
 *   -  httpMethod: POST
 *      summary: Forgot Password
 *      notes: Forgot Password
 *      responseClass: ForgogePassword
 *      nickname: forgotpassword
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: User Email
 *          paramType: body
 *          required: true
 *          dataType: body  
 */
/**
 * @swagger
 * path: /api/users/claim-on-list
 * operations:
 *   -  httpMethod: POST
 *      summary: Claim on List
 *      notes: Claim on List
 *      responseClass: ClaimOnList
 *      nickname: ClaimOnList
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: body
 *          description: Claim On List
 *          paramType: body
 *          required: true
 *          dataType: body  
 */
/**
 * @swagger
 * path: /api/users/get-all-business-listing/{page}
 * operations:
 *   -  httpMethod: POST
 *      summary: All business List
 *      responseClass: SearchParam
 *      notes: All business List
 *      nickname: get-all-business-listing
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: page
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: page id
 *        - name: body
 *          description: Claim On List
 *          paramType: body
 *          required: true
 *          dataType: body    
*/
/**
 * @swagger
 * path: /api/users/get-user-business-listing/{page}
 * operations:
 *   -  httpMethod: POST
 *      summary: All business List
 *      responseClass: userBusinessListingParam
 *      notes: All business List
 *      nickname: get-all-business-listing
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: page
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: page id
 *        - name: body
 *          description: Claim On List
 *          paramType: body
 *          required: true
 *          dataType: body    
*/

/**
 * @swagger
 * path: /api/users/add-doctor-to-list
 * operations:
 *   -  httpMethod: POST
 *      summary: Add doctors  on List
 *      notes: Add doctors  on List
 *      responseClass: AddDoctorOnList
 *      nickname: AddDoctorOnList
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: body
 *          description: AddDoctorOnList
 *          paramType: body
 *          required: true
 *          dataType: body  
 */
/**
 * @swagger
 * path: /api/users/add-business-hour-to-list
 * operations:
 *   -  httpMethod: POST
 *      summary: Add business-hours  on List
 *      notes: Add business-hour  on List
 *      responseClass: AddBusinessHoursOnList
 *      nickname: AddBusinessHoursOnList
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: body
 *          description: Add business-hour  on List
 *          paramType: body
 *          required: true
 *          dataType: body  
 */
/**
 * @swagger
 * path: /api/users/get-business-detail-by-id/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: get-business-detail-by-id
 *      notes: Aget-business-detail-by-id
 *      nickname: getBusinessDetailById
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: list id 
 */
/**
 * @swagger
 * path: /api/users/save-listing
 * operations:
 *   -  httpMethod: POST
 *      summary: Save your listing
 *      notes: Save listing detail
 *      responseClass: Listing
 *      nickname: listing
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Your listing details
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/users/reset-password
 * operations:
 *   -  httpMethod: POST
 *      summary: Signup with username and password & other details
 *      notes: Returns a user based on username
 *      responseClass: ResetPassword
 *      nickname: resetpassword
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: Reset password
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/users/appointment
 * operations:
 *   -  httpMethod: POST
 *      summary: Book appointment
 *      notes: Book appointment
 *      responseClass: BookAppointment
 *      nickname: BookAppointment
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Book appointment details
 *          paramType: body
 *          required: true
 *          dataType: body
 */

/**
 * @swagger
 * path: /api/users/get-appointments-by-date
 * operations:
 *   -  httpMethod: POST
 *      summary: Get Appointments by Date
 *      notes: Get Appointments by Date
 *      responseClass: getAppointmentByDate
 *      nickname: getAppointmentByDate
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Book appointment details
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/users/get-listing-appointments-by-date/{page}
 * operations:
 *   -  httpMethod: POST
 *      summary: Get Appointments by Date
 *      notes: Get Appointments by Date
 *      responseClass: getListingAppointmentByDate
 *      nickname: getListingAppointmentByDate
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Book appointment details
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/users/get-appointment-detail-by-id/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: get-appointment-detail-by-id
 *      notes: get-appointment-detail-by-id
 *      nickname: getAppointmentDetailById
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: appointment id 
 */
/**
 * @swagger
 * path: /api/users/get-favourites-appointment/{page}
 * operations:
 *   -  httpMethod: POST
 *      summary: All favourites business List
 *      notes: All favourites business List
 *      nickname: et-favourites-appointment
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: page
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: page id
*/
/**
 * @swagger
 * path: /api/users/get-upcoming-appointments
 * operations:
 *   -  httpMethod: POST
 *      summary: get-upcoming-appointments
 *      notes: get-upcoming-appointments
 *      nickname: get-upcoming-appointments
 *      responseClass: getUpcomingAppointment
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Book appointment details
 *          paramType: body
 *          required: true
 *          dataType: body  
*/
/**
 * @swagger
 * path: /api/users/get-two-upcoming-appointments
 * operations:
 *   -  httpMethod: POST
 *      summary: get-two-upcoming-appointments
 *      notes: get-two-upcoming-appointments
 *      nickname: get-two-upcoming-appointments
 *      responseClass: getTwoUpcomingAppointment
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Book appointment details
 *          paramType: body
 *          required: true
 *          dataType: body  
*/
/**
 * @swagger
 * path: /api/users/get-appointments-history
 * operations:
 *   -  httpMethod: POST
 *      summary: get-appointments-history
 *      notes: get-appointments-history
 *      nickname: get-appointments-history
 *      responseClass: gerAppointmentHistory
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Appointment report
 *          paramType: body
 *          required: true
 *          dataType: body   
*/
/**
 * @swagger
 * path: /api/users/change-appointment-status/{id}/status/{status}
 * operations:
 *   -  httpMethod: GET
 *      summary: change-appointment-status
 *      notes: change-appointment-status
 *      nickname: change-appointment-status
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: appointment id
 *        - name: status
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: status  ('pending', 'approved', 'rejected', 'cancelled', 'rescheduled', 'request', 'deleted', 'verified')
 */
/**
 * @swagger
 * path: /api/users/listingdetail/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get listing detail
 *      notes: Get listing detail
 *      nickname: listingdetail
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: list id
 */
/**
 * @swagger
 * path: /api/users/get-list-appointments/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: get-list-appointments
 *      notes: get-list-appointments
 *      nickname: get-list-appointments
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
  *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: list id          
*/
/**
 * @swagger
 * path: /api/users/get-my-listing
 * operations:
 *   -  httpMethod: GET
 *      summary: get-my-listing
 *      notes: get-my-listing
 *      nickname: get-my-listing
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
*/
/**
 * @swagger
 * path: /api/users/claim-cancel/{claim_id}/listing/{listing_id}
 * operations:
 *   -  httpMethod: GET
 *      summary: User Logout
 *      notes: User Logout
 *      nickname: logout
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token 
 *        - name: claim_id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: claim id
 *        - name: listing_id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: listing id        
 */
/**
 * @swagger
 * path: /api/users/dashboard
 * operations:
 *   -  httpMethod: GET
 *      summary: User dashboard
 *      notes: User dashboard
 *      nickname: dashboard
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token 
 */
/**
 * @swagger
 * path: /api/users/get-listing-doctors/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: get-listing-doctors
 *      notes: get-listing-doctors
 *      nickname: get-listing-doctors
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: list id           
*/
/**
 * @swagger
 * path: /api/users/delete-doctor/{doctor_id}/listing/{listing_id}
 * operations:
 *   -  httpMethod: GET
 *      summary: delete doctor
 *      notes: delete doctor
 *      nickname: deleteDoctor
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: doctor_id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: doctor id
 *        - name: listing_id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: Listing id
 */
/**
 * @swagger
 * path: /api/users/get-doctor-detail/{doctor_id}/listing/{listing_id}
 * operations:
 *   -  httpMethod: GET
 *      summary: get-doctor-detail
 *      notes: get-doctor-detail
 *      nickname: doctorDetail
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: doctor_id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: doctor id
 *        - name: listing_id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: listing id  
 */
/**
 * @swagger
 * path: /api/users/get-users-by-type/{type}
 * operations:
 *   -  httpMethod: GET
 *      summary: get-users-by-type
 *      notes: get-users-by-type
 *      nickname: getusersbytype
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 *        - name: type
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: list id 
 *        - name: page
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: page no
 */
/**
 * @swagger
 * path: /api/users/get-appointment-report/{page}
 * operations:
 *   -  httpMethod: POST
 *      summary: Get Appointment report
 *      notes: Get Appointment report
 *      nickname: appointmentrepoty
 *      responseClass: gerAppointmentReport
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: page
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: page 
 *        - name: body
 *          description: Appointment report
 *          paramType: body
 *          required: true
 *          dataType: body 
 */
/**
 * @swagger
 * path: /api/users/get-appointment-count
 * operations:
 *   -  httpMethod: POST
 *      summary: get-appointment-count
 *      notes: get-appointment-count
 *      nickname: getAppointmentCount
 *      responseClass: getAppointmentCount
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Appointment report
 *          paramType: body
 *          required: true
 *          dataType: body     
 */
/**
 * @swagger
 * path: /api/users/get-all-appointment-list
 * operations:
 *   -  httpMethod: GET
 *      summary: get-appointment-count
 *      notes: get-appointment-count
 *      nickname: getAppointmentCount
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token  
 */
exports.login = function (req, res) {
  var user = {};
  user.email = req.param('email');
  user.password = req.param('password');
  res.json(user);
}
exports.signup = function (req, res) {
  var user = {};
  user.user_type = req.param('user_type');
  user.first_name = req.param('first_name');
  user.last_name = req.param('last_name');
  user.email = req.param('email');
  user.password = req.param('password');
  user.phone_number = req.param('phone_number');
  user.address = req.param('address');
  user.state = req.param('state');
  user.city = req.param('city');
  user.device_type = req.param('device_type');
  user.device_id = req.param('device_id');
  user.certification_type = req.param('certification_type');
  res.json(user);
}
 
/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       email:
 *         type: String
 *       password:
 *         type: String 
 *       device_type:
 *         type: String
 *       device_id:
 *         type: String  
 *       certification_type:
 *         type: String  
 *   SignUp:
 *     id: SignUp
 *     properties:
 *       user_type:
 *         type: String
 *       first_name:
 *         type: String
 *       last_name:
 *         type: String 
 *       email:
 *         type: String
 *       password:
 *         type: String
 *       phone_number:
 *         type: String 
 *       address:
 *         type: String
 *       state:
 *         type: String  
 *       city:
 *         type: String 
 *       device_type:
 *         type: String
 *       device_id:
 *         type: String 
 *   ForgogePassword:
 *      id: ForgogePassword  
 *      properties:
 *       email:
 *         type: String   
 *   ChangePassword:
 *      id: ChangePassword  
 *      properties:
 *       old_password:
 *         type: String
 *       new_password:
 *         type: String  
 *   UpdateProfile:
 *       id: UpdateProfile
 *       properties:
 *        firs_name:
 *          type: String
 *        last_name:
 *          type: String  
 *        email:
 *          type: String    
 *   ClaimOnList:
 *      id: ClaimOnList  
 *      properties:
 *       listing_id:
 *         type: String
 *   AddDoctorOnList:
 *     id: AddDoctorOnList
 *     properties:
 *       listing_id:
 *         type: String
 *       name:
 *         type: String 
 *       speciality:
 *         type: Array
 *       description:
 *         type: String
 *   AddBusinessHoursOnList:
 *     id: AddBusinessHoursOnList
 *     properties:
 *       availability_slot:
 *         type: Integer
 *         description: status  (yes/no)
 *       availability:
 *         type: Array
 *       listing_id:
 *         type: String
 *   FacebookLogin:
 *     id: FacebookLogin
 *     properties:
 *       facebook_id:
 *         type: String
 *       email:
 *         type: String
 *       first_name:
 *         type: String 
 *       last_name:
 *         type: String 
 *       username:
 *         type: String     
 *       image:
 *         type: String
 *       device_type:
 *         type: String 
 *       device_id:
 *         type: String
 *       certification_type:
 *         type: String  
 *   Listing:
 *     id: Listing
 *     properties:
 *       business_name:
 *         type: String
 *       business_category:
 *         type: Array
 *       neighbour:
 *         type: String 
 *       phone_number:
 *         type: String
 *       address:
 *         type: String
 *       phone_number:
 *         type: String 
 *       address:
 *         type: String
 *       state:
 *         type: String  
 *       city:
 *         type: String 
 *       zipcode:
 *        type: String   
 *       listing_id:
 *        type: String 
 *   SearchParam: 
 *     id: SearchParam
 *     properties:
 *       business_name:
 *         type: String 
 *       cat_id:
 *         type: Array
 *       latitude:
 *         type: String 
 *       longitude:
 *         type: String  
 *       owner_id:
 *         type: Boolean
 *         description: true/false 
 *   userBusinessListingParam: 
 *     id: SearchParam
 *     properties:
 *       name:
 *         type: String 
 *       cat_id:
 *         type: Array
 *       latitude:
 *         type: String 
 *       longitude:
 *         type: String  
 *       owner_id:
 *         type: Boolean
 *         description: true/false         
 *   ResetPassword:
 *     id: ResetPassword
 *     properties:
 *       password:
 *         type: String 
 *       token:
 *         type: String                 
 *         type: String
 *   BookAppointment:
 *     id: BookAppointment
 *     properties:
 *       listing_id:
 *        type: String       
 *       appointment_date:
 *         type: String
 *       appointment_time:
 *         type: String
 *       appointment_reason:
 *         type: String 
 *       doctor_id:
 *         type: String
 *       is_new_customer:
 *         type: Boolean
 *         description: true/false
 *       patient_info:
 *         type: Array
 *   getAppointmentByDate:
 *     id: getAppointmentByDate
 *     properties:
 *       appointment_date:
 *         type: String
 *   getListingAppointmentByDate:
 *     id: getAppointmentByDate
 *     properties:
 *       appointment_date:
 *         type: String
 *       listing_id:
 *         type: String
 *   gerAppointmentReport:
 *     id: gerAppointmentReport
 *     properties:
 *       patient_id:
 *         type: Array
 *       appointment_from:
 *         type: String  
 *       appointment_to:
 *         type: String 
 *       appointment_status:
 *         type: String  
 *   gerAppointmentHistory:
 *      id: gerAppointmentHistory
 *      properties:
 *       date:
 *         type: String   
 *   getUpcomingAppointment:
 *      id: getUpcomingAppointment
 *      properties:
 *       date:
 *         type: String   
 *   getTwoUpcomingAppointment:
 *      id: getTwoUpcomingAppointment
 *      properties:
 *       date:
 *         type: String 
 *   getAppointmentCount:
 *      id: getAppointmentCount
 *      properties:
 *       date:
 *         type: String                                 
 */