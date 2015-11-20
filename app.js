var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var request = require('request');

var app = express();
var router = express.Router();

var database = require('./config/database');
mongoose.connect(database.url, function(err) {
    if (err) {
        console.log("ERROR: Could not connect to MongoDB service");
    } else {
        console.log("A running MongoDB daemon found");
    }
});

require('./db/wikidata_entity')(router);
require('./db/viaf_entity')(router);

app.use(cors());

app.use(favicon(__dirname + "/public/images/favicon/favicon.ico"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.use(function(req, res, next) {
    console.log("Serving " + req.method + " for " + req.url);
    next();
});

require('./routes/wikidata')(router);
require('./routes/viaf')(router);

router.get('/', function(req, res) {
    res.sendFile()
});

app.use('/', router);

router.get('/api', function(req, res) {
    res.json({'message': 'hello api'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
