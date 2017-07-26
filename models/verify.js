var user = require('../models/users');
var jwt = require('jsonwebtoken'); // token use to login
var config = require('../config/db.js');

// create token
exports.getToken = function (user) {

    return jwt.sign(user, config.secretKey, {
        expiresIn: 86400
    });

};

exports.verifyOrdinaryUser = function (req, res, next) {

    //check token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You Are Not Authenticated');
                err.status = 401;
                return next(err);
            } else {

                req.decoded = decoded;
                console.log(decoded);
                next();

            }
        });
    } else {
        var err = new Error('No Token Provided !');
        err.stack = 403;
        return next(err);
    };

};
// end verifyOrdinaryUser


exports.verifyAdminUser = function (req, res, next) {


    //check token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You Are Not Authenticate !');
                err.status = 401;
                return next(err);
            } else {
                req.decoded = decoded;
                console.log(decoded);
                var admin = decoded.admin;
                console.log(admin);
                if (admin == false) {
                    var err = new Error('You Dont Have Permision !');
                    err.status = 401;
                    return next(err);
                } else {
                    next();
                }
            }
        });
    } else {
        var err = new Error('No Token Provided !');
        err.status = 403;
        return next(err);
    };

};
// end verifyAdminUser