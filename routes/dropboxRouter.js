/*
var express = require('express');
var dropbox = require('dropbox-node');

var config = require('../config/db.js');
var dropboxRouter = express.Router();

var dropboxClient = new dropbox.DropboxClient(config.dropbox.appKey, config.dropbox.appSecret);

dropboxRouter.route('/')
    .get(function (req, res, next) {

        dropboxClient.getAccountInfo(function (err, data) {
            if (err) console.log('Error: ' + err)
            else console.log(data.display_name + ', ' + data.email)
        });

    });

module.exports = dropboxRouter;
*/