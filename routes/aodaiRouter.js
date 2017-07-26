var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var verify = require('../models/verify.js');

var aodai = require('../models/aodai.js');
var aodaiRouter = express.Router();

aodaiRouter.use(bodyParser.json());

aodaiRouter.route('/')

    .get(function (req, res, next) {
        aodai.find({}, function (err, ao_dai) {
            if (err) return next(err);
            console.log('Get all the collection Ao Dai !');
            res.json(ao_dai);
        });
    })
    // tam xoa verify admin de chinh, add vo sau
    .post(function (req, res, next) {
        aodai.create(req.body, function (err, ao_dai) {
            if (err) return next(err);
            console.log('AODAI create with the id :' + ao_dai._id);
            res.json(ao_dai);
        });

    })

    .delete(verify.verifyAdminUser, function (req, res, next) {
        aodai.remove({}, function (err, resp) {
            if (err) return next(err);
            console.log('Remove all the collection AODAI !');
            res.json(resp);
        });
    });

aodaiRouter.route('/:aodaiId')

    .get(function (req, res, next) {
        aodai.findById(req.params.aodaiId, function (err, ao_dai) {
            if (err) return next(err);
            console.log('Get the AODAI with ID : ' + ao_dai._id);
            res.json(ao_dai);
        });
    })

    .put(verify.verifyAdminUser, function (req, res, next) {
        aodai.findByIdAndUpdate(req.params.aodaiId, {
            $set: req.body
        }, {
            new: true
        }, function (err, ao_dai) {
            if (err) return next(err);
            console.log('Update the document AODAI with ID : ' + ao_dai._id);
            res.json(ao_dai);
        });

    })

    .delete(verify.verifyAdminUser, function (req, res, next) {
        aodai.findByIdAndRemove(req.params.aodaiId, function (err, ao_dai) {
            if (err) return next(err);
            res.json(ao_dai);
        });
    });

module.exports = aodaiRouter;