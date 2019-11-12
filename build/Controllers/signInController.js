'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _poolConnection = require('../Models/poolConnection');

var _poolConnection2 = _interopRequireDefault(_poolConnection);

var _signInModel = require('../Models/signInModel');

var _signInModel2 = _interopRequireDefault(_signInModel);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const signInQuery = require('../Models/signInModel');
// const bcrypt = require('bcrypt');
var signIn = function signIn(req, res, next) {
  var body = req.body;
  // Check for usernames and password
  if (!body.username || !body.password) {
    res.status(400).json({
      "status": "error",
      "error": "Error: Please input the correct username and password"
    });
    return;
  }
  // check if user exists in database
  _poolConnection2.default.query(_signInModel2.default, [body.username]).then(function (user) {

    // send back token if the user is in our database
    if (user) {
      var passed = _bcrypt2.default.compareSync(body.password, user.rows[0].employee_password);
      if (passed) {
        var token = _jsonwebtoken2.default.sign({
          sub: user.rows[0].employee_no,
          username: user.rows[0].email
        }, process.env.TOKENKEY, { expiresIn: 1440000 });

        res.status(200).json({
          "status": "success",
          "data": {
            "token": token,
            "userId": user.rows[0].employee_id
          }
        });
      } else {
        res.status(400).json({
          "status": "error",
          "error": "Password is incorrect"
        });
      }
    } else {
      res.status(400).json({
        "status": "error",
        "error": "Invalid username and password"
      });
    }
  }).catch(function (e) {
    next(e);
  });
};

// const jwt = require('jsonwebtoken');


// const pool = require('../Models/poolConnection');
exports.default = signIn;