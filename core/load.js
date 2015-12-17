/**
 * Created by hp on 7/6/2015.
 */
!(function () {
    'use strict'
    var path = require('path')
        , fs = require('fs');
    var Core = {
        loadConfig: function loadConfig(rootDirectory, env) {
            return require(path.join(rootDirectory, 'config/env', env));
        },
        loadRoutes: function loadRoutes(rootDirectory, app) {
            var routePath = path.join(rootDirectory, 'routes');
            var files = fs.readdirSync(routePath);
            files.forEach(function (item, index) {
                //console.log(path.join(routePath, item))
                require(path.join(routePath, item))(app);
            });
        }
    };
    module.exports = Core;
})();
