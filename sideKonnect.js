var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var engines = require('consolidate');

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
require('dotenv').config({ path: path.join(__dirname, '.env') });

var app = express();

// view engine setup
// USE THIS ENGINE SETUP FOR SERVING HTML PAGES WITH SERVER VARIABLES
//app.engine('html', engines.mustache);
//app.set('view engine', 'html');

// USE THIS ENGINE SETUP FOR SERVING PUG TEMPLATES
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;