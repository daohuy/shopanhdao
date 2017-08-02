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

    var token = req.body.token || req.query.token || req.headers['authentication'];

    if (token) {
        console.log('Have Token !');
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                console.log('Err');
                var err = new Error('You Are Not Authenticate !');
                err.status = 401;
                return next(err);
            } else {
                console.log('OK Token verify, phase 2 !');
                req.decoded = decoded;
                next();
            }
        })
    } else {
        console.log('err 403');
        var err = new Error('No Token Provided ! ');
        err.status = 403;
        return next(err);
    }

};
// end verifyOrdinaryUser

exports.verifyAdminUser = function (req, res, next) {
    //check token
    var token = req.body.token || req.query.token || req.headers['authentication'];
    if (token) {
        console.log('Have Token', token);
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                console.log('Err');
                var err = new Error('You Are Not Authenticate !');
                err.status = 401;
                return next(err);
            } else {
                console.log('OK have token phase 2');
                req.decoded = decoded;
                console.log(decoded);
                var admin = decoded._doc.admin;
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