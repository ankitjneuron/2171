
/**
 * @swagger
 * resourcePath: /apiJs
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
 * path: /api/users/signup
 * operations:
 *   -  httpMethod: POST
 *      summary: Signup with username and password & other details
 *      notes: Returns a user based on username
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
exports.login = function (req, res) {
  var user = {};
  user.username = req.param('username');
  user.password = req.param('password');
  res.json(user);
}
exports.signup = function (req, res) {
  var user = {};
  user.username = req.param('username');
  user.password = req.param('password');
  res.json(user);
}

/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       username:
 *         type: String
 *       password:
 *         type: String    
 */