var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var PassportUtil = require('./lib/PassportUtil');
var expressValidator = require('express-validator');
var swagger = require('swagger-express');
var Core = require('./core/load.js');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    apiUrl: 'http://localhost:2171/api/users',
    apiVersion:'1.0',
    basePath: 'http://localhost:2171',
    info: {
      title: 'swagger-express sample app',
      description: 'Swagger + Express = {swagger-express}'
    },
    apis: ['./public/swagger/include/user.js',
           './public/swagger/include/admin.js',
           './public/swagger/include/cms.js',
           './public/swagger/include/public.js'
          ],
    middleware: function(req, res){}
  }));

//app.use('/', routes);
//app.use('/users', users);
app.set('rootDirectory', __dirname);
var env = app.get('env') || 'production';

var config = Core.loadConfig(app.get('rootDirectory'), env);
app.set('config', config);


mongoose.connect(config.database.mongodb.url, function (err) {
    if (err) {
        console.log(err);
        process.exit(0);
    } else {
        console.log('Mongodb connected');
    }
});
Core.loadRoutes(app.get('rootDirectory'), app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            success: false,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message,
        error: err
    });
});
module.exports = app;
