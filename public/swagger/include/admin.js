
/**
 * @swagger
 * resourcePath: /admin
 * description: All about API
 */

/**
 * @swagger
 * path: /api/admin/getcategory
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all category list
 *      notes: Get Category List
 *      nickname: category
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
 * path: /api/admin/deletecategory/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete category
 *      notes: Delete category
 *      nickname: deletecategory
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
 *          description: category id
 */
/**
 * @swagger
 * path: /api/admin/getcategorylist/{page}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get category list with pagination
 *      notes: Get Category List
 *      nickname: category
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
 *        - name: category_name
 *          dataType: string
 *          paramType: query
 *          required: false
 *          description: search by category name
 */
/**
 * @swagger
 * path: /api/admin/categorydetail/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get category detail
 *      notes: Category detail
 *      nickname: categorydetail
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
 *          description: page id
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
 *   -  httpMethod: POST
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
 *        - name: is_verified
 *          dataType: string
 *          paramType: query
 *          required: false
 *          description: Listing status yes/no   
 *        - name: business_name
 *          dataType: string
 *          paramType: query
 *          required: false
 *          description: business name 
 */
/**
 * @swagger
 * path: /api/admin/deletelisting/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete listing
 *      notes: Delete listing
 *      nickname: deletelisting
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
 * path: /api/admin/listing/{id}/status/{status}
 * operations:
 *   -  httpMethod: GET
 *      summary: Change listing status
 *      notes: Change listing status
 *      nickname: changesatus
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
 *        - name: status
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: status  (active/inactive)
 */
/**
 * @swagger
 * path: /api/admin/acceptclaim
 * operations:
 *   -  httpMethod: POST
 *      summary: Accept or reject claim listing
 *      notes: Accept or reject claim listing
 *      responseClass: ClaimDetail
 *      nickname: acceptclaim
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Claim detail
 *          paramType: body
 *          required: true
 *          dataType: body      
 */

/**
 * @swagger
 * path: /api/admin/listing/{id}/verify/{status}
 * operations:
 *   -  httpMethod: GET
 *      summary: Change listing status
 *      notes: Change listing status
 *      nickname: changesatus
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
 *        - name: status
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: status  (verified/pending)
 */
/**
 * @swagger
 * path: /api/admin/listing/{id}/approve/{status}
 * operations:
 *   -  httpMethod: GET
 *      summary: Change listing status
 *      notes: Change listing status
 *      nickname: changesatus
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
 *        - name: status
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: status  (approved/disapproved)
 */
/**
 * @swagger
 * path: /api/admin/listingdetail/{id}
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
 * path: /api/admin/admindashboard
 * operations:
 *   -  httpMethod: GET
 *      summary: Get admin dashboard detail
 *      notes: Get admin dashboard detail
 *      nickname: getadmindashboarddetail
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
 * path: /api/admin/changestatus/{id}/status/{status}
 * operations:
 *   -  httpMethod: GET
 *      summary: Change listing status
 *      notes: Change listing status
 *      nickname: changesatus
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
 *          description: user id
 *        - name: status
 *          dataType: string
 *          paramType: path
 *          required: true
 *          description: status  (active/inactive)
 */
/**
 * @swagger
 * path: /api/admin/getclaimedlisting/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get claimed listing
 *      notes: Get claimed listing
 *      nickname: getclaimedlisting
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
 *          description: claim id
 */
/**
 * @swagger
 * path: /api/admin/get-patient-business-list/{page}
 * operations:
 *   -  httpMethod: GET
 *      summary: get-patient-business-list
 *      notes: get-patient-business-list
 *      nickname: get-patient-business-list
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
 * path: /api/admin/accept-business-page
 * operations:
 *   -  httpMethod: POST
 *      summary: Accept or reject  listing
 *      notes: Accept or reject  listing
 *      responseClass: BusinessPageDetail
 *      nickname: BusinessPageDetail
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: access_token
 *          dataType: string
 *          paramType: header
 *          required: true
 *          description: Authentication token
 *        - name: body
 *          description: Accept or reject  listing
 *          paramType: body
 *          required: true
 *          dataType: body      
 */
/**
 * @swagger
 * path: /api/admin/getcmscategory
 * operations:
 *   -  httpMethod: GET
 *      summary: Get cms category
 *      notes: Get cms category
 *      nickname: getcmscategory
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
 * path: /api/admin/getcmspage/{page}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get cms pages
 *      notes: Get cms pages
 *      nickname: getcmspages
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
 */
/**
 * @swagger
 * path: /api/admin/pagedetail/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get cms page detail
 *      notes: Get cms page detail
 *      nickname: getcmspagedetail
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
 *          description: page id         
 */
/**
 * @swagger
 * path: /api/admin/cmspage
 * operations:
 *   -  httpMethod: POST
 *      summary: Save and update cms page
 *      notes: Save and update cms page
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
 *          description: Your listing details
 *          paramType: body
 *          required: true
 *          dataType: body
 */
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
 *   ClaimDetail: 
 *     id: ClaimDetail
 *     properties:  
 *       listing_id:
 *         type: String 
 *       user_id:
 *         type: String  
 *       claim_id:
 *         type: String 
 *       status:
 *        type: String
 *   BusinessPageDetail: 
 *     id: BusinessPageDetail
 *     properties:  
 *       listing_id:
 *         type: String 
 *       status:
 *        type: String   
 *        description: approved or disapproved  listing
 *   CmsPage:
 *     id: CmsPage
 *     properties:  
 *       category_id:
 *         type: String 
 *       page_title:
 *        type: String
 *       slug:
 *         type: String 
 *       page_content:
 *        type: String   
 *       page_id:
 *        type: String  
 */