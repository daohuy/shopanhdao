var passport            = require('passport');
var localStrategy       = require('passport-local').Strategy;
// Oauth facebook
var FacebookStrategy    = require('passport-facebook').Strategy;

var users               = require('../models/users.js');
var oauth               = require('../config/oauth.js');

// LOGIN LOCAL
exports.local = passport.use(new localStrategy(users.authenticate()));
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

// OAUTH FACEBOOK
exports.facebook = passport.use(new FacebookStrategy({
    // CONNECT DEV FB
    clientID: oauth.facebook.clientID,
    clientSecret: oauth.facebook.clientSecret,
    callbackURL: oauth.facebook.callbackURL
}, function (accessToken, refreshToken, profile, done) {
    users.findOne({
        OauthId: profile.id
    }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!err && user != null) {
            done(null, user);
        } else {
            user = new users({
                username: profile.displayName
            });
            user.OauthId = profile.id;
            user.OauthToken = accessToken;
            user.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Saving User ...');
                    done(null, user);
                }
            });
        }
    });
}));