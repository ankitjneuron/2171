
/**
 * @swagger
 * resourcePath: /cms
 * description: All about API
 */

/**
 * @swagger
 * path: /api/admin/cmscategory
 * operations:
 *   -  httpMethod: POST
 *      summary: Save Cms Category
 *      notes: Save Cms Category
 *      responseClass: CmsCategory
 *      nickname: cmscategory
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Category detail
 *          paramType: body
 *          required: true
 *          dataType: body
 */
/**
 * @swagger
 * path: /api/admin/getcmscategory
 * operations:
 *   -  httpMethod: GET
 *      summary: Get Cms Category
 *      notes: Get Cms Category
 *      nickname: getcmscategory
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: query
 *          required: true
 *          description: Authentication token
 */
/**
 * @swagger
 * path: /api/admin/cmspage
 * operations:
 *   -  httpMethod: POST
 *      summary: Save Cms Page
 *      notes: Save Cms Page
 *      responseClass: CmsPage
 *      nickname: cmspage
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Page content
 *          paramType: body
 *          required: true
 *          dataType: body 
 */
/**
 * @swagger
 * path: /api/admin/getcmspage
 * operations:
 *   -  httpMethod: GET
 *      summary: Get Cms Page
 *      notes: Get Cms Page
 *      nickname: getcmspage
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: query
 *          required: true
 *          description: Authentication token
 */
/**
 * @swagger
 * path: /api/admin/pagedetail/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get Cms Page detail
 *      notes: Get Cms Page detail
 *      nickname: pagedetail
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: query
 *          required: true
 *          description: Authentication token
 *        - name: id
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: Page id   
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
 */