var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var uploadRouter = express.Router();
var verify = require('../models/verify.js');

var storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './public/img/items')
    },
    filename : function(req, file, cb) {
        cb(null, file.originalname + '.jpg')
    }
});

var upload = multer({ storage : storage});

uploadRouter.use(bodyParser.json());

uploadRouter.get('/', function(req, res, nexrt) {
    res.render('upload');
});

uploadRouter.post('/', verify.verifyAdminUser, upload.array('file', 4) , function(req, res, next) {
    console.log(req.body, 'BODY');
    console.log(req.files, 'file');
    res.end();
});

module.exports = uploadRouter;