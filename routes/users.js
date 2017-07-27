var express = require('express');
var userRouter = express.Router();
var passport = require('passport');
var users = require('../models/users.js');
var verify = require('../models/verify.js');

userRouter.get('/', verify.verifyAdminUser, function (req, res, next) {

  users.find({}, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });

});

userRouter.post('/register', function (req, res, next) {

  users.register(new users({
      username: req.body.username
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        return res.status(500).json({
          err: err
        }); //??
      };
      // name
      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      };
      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      };
      user.save(function (err, user) {
        //??
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({
            status: 'Registration Successfull'
          }); //??
        });
      });
    });
});

userRouter.post('/login', function (req, res, next) {

  passport.authenticate('local', function (err, user, info) {
    //check login
    if (err) {
      console.log(err);
      return next(err);
    };
    if (!user) {
      return res.status(401).json({
        err: info
      });
    };
    // that all ok
    req.logIn(user, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          err: 'Could Not LogIn User !'
        });
      }
      var token = verify.getToken(user);
      res.status(200).json({
        status: 'Login Successful !',
        success: true,
        token: token,
        User: user
      });
    });
  })(req, res, next);
});

userRouter.get('/logout', function (req, res) {
  req.logOut();
  res.status(200).json({
    status: 'Bye !'
  })
});

//Route Facebook
userRouter.get('/facebook', passport.authenticate('facebook'), function (req, res) {
  console.log('get data facebook');
});

userRouter.get('/facebook/callback', function (req, res, next) {

  passport.authenticate('facebook', function (err, user, info) {
    if (err) return next(err);
    if (!err) {
      return res.status(401).json({
        err: info
      });
    };

    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'could not log in user !'
        });
      }

      var token = verify.getToken(user);
      res.status(200).json({
        status: 'Login Successful!',
        success: true,
        token: token
      });
    });
  })(req, res, next);

});


module.exports = userRouter;