
/**
 * @swagger
 * resourcePath: /Listing
 * description: All about API
 */

/**
 * @swagger
 * path: /api/admin/savelisting
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
 * path: /api/admin/getlisting/{page}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get listing
 *      notes: Get listing
 *      nickname: getlisting
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
 *        - name: business_name
 *          dataType: string
 *          paramType: query
 *          required: false
 *          description: business name 
 */
exports.listing = function (req, res) {
  var user = {};
  user.business_name = req.param('business_name');
  user.business_category = req.param('business_category');
  user.neighbour = req.param('neighbour');
  user.phone_number = req.param('email');
  user.address = req.param('phone_number');
  user.state = req.param('state');
  user.city = req.param('city');
  user.zipcode = req.param('zipcode');
  res.json(user);
}
 
/**
 * @swagger
 * models:
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
 */