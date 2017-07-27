var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var authenticate = require('./config/authenticate.js');

var index = require('./routes/index');
var users = require('./routes/users');
var aodaiRouter = require('./routes/aodaiRouter');
var dressRouter = require('./routes/dressRouter');
var shirtsRouter = require('./routes/shirtsRouter');
var trousersRouter = require('./routes/trousersRouter');
var customerRouter = require('./routes/customerRouter');
var userRouter = require('./routes/users');

//DATABASE
var dbUrl = require('./config/db.js');
var url = dbUrl.mongoUrl;
mongoose.connect(url);
var db = mongoose.connection;

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// OPEN DATABASE
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function () {
  console.log('Connect Database Server !');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// SESSION REQUIRED FOR PASSPORT
app.use(session({
  secret : '12345-67890-09876-54321-abcde',
  resave : true,
  saveUninitialized : true
}));
// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/aodai', aodaiRouter);
app.use('/dress', dressRouter);
app.use('/shirts', shirtsRouter);
app.use('/trousers', trousersRouter);
app.use('/bill', customerRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;