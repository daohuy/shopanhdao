var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var verify = require('../models/verify.js');

var trousers = require('../models/trousers.js');
var trouserRouter = express.Router();

trouserRouter.use(bodyParser.json());

trouserRouter.route('/')

    .get(function (req, res, next) {
        trousers.find({}, function (err, trouser) {
            if (err) return next(err);
            console.log('Get all the collection Trousers !');
            res.json(trouser);
        });
    })

    .post(function (req, res, next) {
        trousers.create(req.body, function (err, trouser) {
            if (err) return next(err);
            console.log('Create the trouser with ID : ' + trouser._id);
            res.json(trouser);
        });
    })

    .delete(verify.verifyAdminUser, function (req, res, next) {

        trousers.remove({}, function (err, resp) {

            if (err) return next(err);
            console.log('Remove all the collection Trouser !');
            res.json(resp);
        });
    });

trouserRouter.route('/:trouserId')

    .get(function (req, res, next) {
        trousers.findById(req.params.trouserId, function (err, trouser) {
            if (err) return next(err);
            console.log('Get the Trouser with ID : ' + trouser._id);
            res.json(trouser);
        });
    })

    .put(verify.verifyAdminUser, function (req, res, next) {
        trousers.findByIdAndUpdate(req.params.trouserId, {
            $set: req.body
        }, {
            new: true
        }, function (err, trouser) {
            if (err) return next(err);
            console.log('Update the document trouser with ID : ' + trouser._id);
            res.json(trouser);
        });
    })

    .delete(verify.verifyAdminUser, function (req, res, next) {
        trousers.findByIdAndRemove(req.params.trouserId, function (err, trouser) {
            if (err) return next(err);
            console.log('Remove Trouser with ID : ' + trouser._id);
            res.json(trouser);

        });
    });

module.exports = trouserRouter;