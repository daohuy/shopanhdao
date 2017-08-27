var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var verify = require('../models/verify.js');

var shirts = require('../models/shirts.js');
var shirtRouter = express.Router();

shirtRouter.use(bodyParser.json());

shirtRouter.route('/')

    .get(function (req, res, next) {
        shirts.find({}, function (err, shirt) {
            if (err) return next(err);
            console.log('Get all the collection Shirts !');
            res.json(shirt);
        });
    })

    .post(verify.verifyAdminUser, function (req, res, next) {
        shirts.create(req.body, function (err, shirt) {
            if (err) return next(err);

            console.log('Create the dress with id : ' + shirt._id);

            res.json(shirt);
        });
    })

    .delete(verify.verifyAdminUser, function (req, res, next) {

        shirts.remove({}, function (err, resp) {

            if (err) return next(err);
            console.log('Remove all the collection Shirt !');
            res.json(resp);
        });
    });

shirtRouter.route('/khuyenmai')
    .get(function(req, res, next) {

        shirts.find({featured:true}, function(err,shirt) {
            if (err) return next(err);
            res.json(shirt);
        })

    });

// onsale

shirtRouter.route('/onsale')
    .get(function(req, res, next) {

        shirts.find({onSale:true}, function(err,shirt) {
            if (err) return next(err);
            res.json(shirt);
        })

    });

shirtRouter.route('/:shirtId')

    .get(function (req, res, next) {
        shirts.findById(req.params.shirtId, function (err, shirt) {
            if (err) return next(err);
            console.log('Get the Shirt with ID : ' + shirt._id);
            res.json(shirt);
        });
    })

    .put(verify.verifyAdminUser, function (req, res, next) {
        shirts.findByIdAndUpdate(req.params.shirtId, {
            $set: req.body
        }, {
            new: true
        }, function (err, shirt) {
            if (err) return next(err);
            console.log('Update the document shirt with ID : ' + shirt._id);
            res.json(shirt);
        });
    })

    .delete(verify.verifyAdminUser, function (req, res, next) {
        shirts.findByIdAndRemove(req.params.shirtId, function (err, shirt) {
            if (err) return next(err);
            console.log('Remove Shirt with ID : ' + shirt._id);
            res.json(shirt);

        });
    });

module.exports = shirtRouter;