!(function () {
    'use strict'

    var express = require('express')
        , router = express.Router();
        
       


    var route = function (app) {
        router.get('/', function(req,res,next){
            res.send('Jello');
        });

        app.use('/api/users', router);
    }
    module.exports = route;
})();
