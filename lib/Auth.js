/**
 * Created by hp on 7/9/2015.
 */
!(function () {
    var passport = require('passport');
    var User = require('../app/models/User');

    var Auth = {
        isAuthenticated: function (req, res, next) {
            var token = Auth._getToken(req);
            if (token) {
                User.findOne({access_token: token}, function (err, user) {

                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        var err = new Error('Invalid access token');
                        err.status = 401;
                        return next(err);
                    } else {
                        req.user = user;
                        return next(null, user, {scope: 'all'});

                    }

                });
            } else {
                var err = new Error('Access token is missing');
                return next(err);
            }
        },
        isPublicAuthenticated: function (req, res, next) {
            var token = Auth._getToken(req);
            if (token) {
                User.findOne({access_token: token}, function (err, user) {

                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        var err = new Error('Invalid access token');
                        err.status = 401;
                        return next(err);
                    } else {
                        req.user = user;
                        return next(null, user, {scope: 'all'});

                    }

                });
            } else {
                return next(null, {}, {scope: 'all'});
            }
        },
        isAdminAuthenticated: function(req, res, next) {
            var token = Auth._getToken(req);
            if (token) {
                User.findOne({access_token: token}, '-password', function(err, user) {

                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        var err = new Error('Invalid access token');
                        err.status = 401;
                        return next(err);
                    } else {
                        if (user.user_type && user.user_type === 'admin') {
                            req.user = user;
                            return next(null, user, {scope: 'all'});
                        } else {
                            var err = new Error('Unauthorized user access');
                            err.name = 'UnauthorizedError';
                            err.status = 401;
                            return next(err);
                        }
                    }
                });
            } else {
                var err = new Error('Access token is missing');
                return next(err);
            }
        },
        isBusinessUserAuthenticated: function (req, res, next) {
            var token = Auth._getToken(req);
            if (token) {
                User.findOne({access_token: token}, function (err, user) {

                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        var err = new Error('Invalid access token');
                        err.status = 401;
                        return next(err);
                    } else {
                        if (user.user_type === 'business_user') {
                            req.user = user;
                            return next(null, user, {scope: 'all'});
                        } else {
                            var err = new Error('Unauthorized user access');
                            err.name = 'UnauthorizedError';
                            err.status = 401;
                            return next(err);
                        }

                    }

                });
            } else {
                var err = new Error('Access token is missing');
                return next(err);
            }
        },
       
        _getToken: function (req) {
            var token;

            if (req.headers && req.headers.authorization) {
                var parts = req.headers.authorization.split(' ');
                if (parts.length == 2) {
                    var scheme = parts[0]
                        , credentials = parts[1];

                    if (/^Bearer$/i.test(scheme)) {
                        token = credentials;
                    }
                } else {

                }
            }

            if (req.body && req.body.access_token) {
                if (token) {

                }
                token = req.body.access_token;
            }

            if (req.query && req.query.access_token) {

                token = req.query.access_token;
            }
            return token;
        }
    };

    module.exports = Auth;
})
();