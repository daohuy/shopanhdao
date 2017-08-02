var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
// Oauth facebook
var FacebookStrategy = require('passport-facebook').Strategy;

var users = require('../models/users.js');
// LOGIN LOCAL
exports.local = passport.use(new localStrategy(users.authenticate()));
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());