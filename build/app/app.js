'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cloudinary = require('cloudinary');

var _routeAdmin = require('../Routers/routeAdmin');

var _routeAdmin2 = _interopRequireDefault(_routeAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)(); //require('dotenv').config();

//const express = require('express');

//const cloudinary = require('cloudinary').v2;

//const routeAdmin = require('../Routers/routeAdmin');

// Already using cloudinary in the env file this is just for alternatives
// Enter your cloudinary credentials below                                           
_cloudinary.v2.config({ cloud_name: "tos4christ",
  api_key: "594949515392786",
  api_secret: "N0E0H0bfxGI_4CEFvgWfwNBjJWY"
});

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

// route for testing
app.use('/test', function (req, res) {
  res.status(200).send('Request received');
});

// route to receive all request
app.use('/api/v1', _routeAdmin2.default);

// catch 404 error and send to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found at all');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  err.status = 500;
  res.status(err.status).send({
    'Server Error': err.message
  });
});

exports.default = app;