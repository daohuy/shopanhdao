var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var customer = require('../models/customer.js');
var customerRouter = express.Router();

customerRouter.use(bodyParser.json());

customerRouter.route('/')

.get(function(req,res,next) {
    customer.find({}, function(err,cus) {
        if (err) return next(err);
        console.log('Get All Bill ');
        res.json(cus);
    });
})

.post(function(req,res,next) {
    customer.create(req.body, function(err,cus) {
        if (err) return next(err);
        console.log('Get Bill From Customer ! ' + cus._id );
        res.json(cus);
    })
})

customerRouter.route('/:cusId')

.get(function(req, res, next) {
    customer.findById(req.params.cusId, function(err, cus) {
        if(err) return next(err);
        console.log('Get Bill : ' + cus._id);
        res.json(cus);
    })
})

.put(function(req, res, next) {
    customer.findByIdAndUpdate(req.params.cusId, {$set:req.body} , {new:true} , function(err,cus) {
        if(err) return next(err);
        console.log('Update Bill Done with ID : ' + cus._id );
        res.json(cus);
    })
})

.delete(function(req, res, next) {
    customer.findByIdAndRemove(req.params.cusId, function(err, cus) {
        if (err) return next(err);
        console.log('Delete Bill With Id : ', req.params.cusId);
        res.json(cus);
    });
})

;

module.exports = customerRouter;