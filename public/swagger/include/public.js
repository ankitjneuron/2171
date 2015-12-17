
/**
 * @swagger
 * resourcePath: /public
 * description: All about API
 */

/**
 * @swagger
 * path: /api/public/getcmspage
 * operations:
 *   -  httpMethod: GET
 *      summary: Get Cms Page
 *      notes: Get Cms Page
 *      nickname: getcmspage
 *      consumes: 
 *        - text/html
 */
 /**
 * @swagger
 * path: /api/public/getcmspagedetail/{slug}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get cms page detail
 *      notes: Get cms page detail
 *      nickname: getcmspagedetail
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: slug
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: list id   
 */
 /**
 * @swagger
 * path: /api/public/getbusinesslisting/{page}
 * operations:
 *   -  httpMethod: POST
 *      summary: All business List
 *      responseClass: SearchParam
 *      notes: All business List
 *      nickname: get-all-business-listing
 *      consumes: 
 *        - text/html
 *      parameters:
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
 * path: /api/public/getcategory
 * operations:
 *   -  httpMethod: GET
 *      summary: Get Category List
 *      notes: Get Category List
 *      nickname: getcategory
 *      consumes: 
 *        - text/html
 */
 /**
 * @swagger
 * path: /api/public/get-patient-category
 * operations:
 *   -  httpMethod: GET
 *      summary: Get patient Category List
 *      notes: Get patient Category List
 *      nickname: getcategory
 *      consumes: 
 *        - text/html
 */
 /**
 * @swagger
 * path: /api/public/get-business-detail-by-id/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: get-business-detail-by-id
 *      notes: Aget-business-detail-by-id
 *      nickname: getBusinessDetailById
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: list id 
 */
/**
 * @swagger
 * path: /api/public/twilio
 * operations:
 *   -  httpMethod: GET
 *      summary: Twilio Test
 *      notes: Twilio Test
 *      nickname: twilioTest
 *      consumes: 
 *        - text/html
 */
/**
 * @swagger
 * path: /api/users/send-notification
 * operations:
 *   -  httpMethod: POST
 *      summary: Send Notification
 *      notes: All business List
 *      nickname: send-message
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: Message Data
 *          paramType: body
 *          required: true
 *          dataType: body       
 */

exports.cmscategory = function (req, res) {
  var user = {};
  user.category_name = req.param('category_name');
  res.json(user);
}
exports.cmspage = function (req, res) {
  var cmspage = {};
  cmspage.page_title = req.param('page_title');
  cmspage.category_id = req.param('category_id');
  cmspage.slug = req.param('category_id');
  cmspage.page_content = req.param('page_content');
  res.json(cmspage);
}
 
/**
 * @swagger
 * models:
 *   CmsCategory:
 *     id: CmsCategory
 *     properties:
 *       category_name:
 *         type: String
 *   CmsPage:
 *     id: CmsPage
 *     properties:
 *       page_title:
 *         type: String 
 *       category_id:
 *         type: String  
 *       page_content:
 *         type: String 
 *       slug:
 *         type: String   
 *       page_id:
 *         type: String
 *   SearchParam: 
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
 */