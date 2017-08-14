var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var verify = require('../models/verify.js');

var dress = require('../models/dress.js');
var dressRouter = express.Router();

dressRouter.use(bodyParser.json());

dressRouter.route('/')

    .get(function (req, res, next) {
        dress.find({}, function (err, dres) {
            if (err) return next(err);
            console.log('Get all the collection Dress !');
            res.json(dres);
        });
    })

    .post(verify.verifyAdminUser, function (req, res, next) {
        dress.create(req.body, function (err, dres) {
            if (err) return next(err);
            console.log('Create the dress with id : ' + dres._id);
            res.json(dres);
        });
    })

    .delete(verify.verifyAdminUser, function (req, res, next) {

        dress.remove({}, function (err, resp) {

            if (err) return next(err);
            console.log('Remove all the collection Dress !');
            res.json(resp);
        });
    });

dressRouter.route('/khuyenmai')
    .get(function(req, res, next) {

        dress.findOne({featured:true}, function(err,dres) {
            if (err) return next(err);
            res.json(dres);
        })

    });

dressRouter.route('/:dressId')

    .get(function (req, res, next) {
        dress.findById(req.params.dressId, function (err, dres) {
            if (err) return next(err);
            console.log('Get the Dress with ID : ' + dres._id);
            res.json(dres);
        });
    })

    .put(verify.verifyAdminUser, function (req, res, next) {
        dress.findByIdAndUpdate(req.params.dressId, {
            $set: req.body
        }, {
            new: true
        }, function (err, dres) {
            if (err) return next(err);
            console.log('Update the document dress with ID : ' + dres._id);
            res.json(dres);
        });
    })

    .delete(verify.verifyAdminUser, function (req, res, next) {
        dress.findByIdAndRemove(req.params.dressId, function (err, dres) {
            if (err) return next(err);
            console.log('Remove Dress with ID : ' + dres._id);
            res.json(dres);

        });
    });

module.exports = dressRouter;