'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _poolConnection = require('../Models/poolConnection');

var _poolConnection2 = _interopRequireDefault(_poolConnection);

var _newUserModel = require('../Models/newUserModel');

var _newUserModel2 = _interopRequireDefault(_newUserModel);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create a new user for the new employee inserting their records in the database
// ensure to hash their password with bcrypt before it goes into the database


// const newUserQuery = require('../Models/newUserModel');
// const bcrypt = require('bcrypt');
var createUser = function createUser(req, res, next) {
  var body = req.body;
  // check if email and password was sent
  if (!body.email || !body.employee_password) {
    res.status(400).json({
      "status": "error",
      "error": " Email or Password field cannot be empty"
    });
    next();
  }
  var hash = _bcrypt2.default.hashSync(body.employee_password, 9);
  var creation_date = Date().split('GMT')[0];
  _poolConnection2.default.query(_newUserModel2.default, [body.firstname, body.lastname, body.email, hash, body.gender, body.jobrole, body.employee_no, body.department, creation_date]).then(function (user) {
    var token = _jsonwebtoken2.default.sign({
      sub: user.rows[0].employee_no,
      email: user.rows[0].email
    }, process.env.TOKENKEY, { expiresIn: 1440 });
    res.status(200).json({
      "status": "success",
      "data": {
        "message": "User account successfully created",
        "token": token,
        "userId": user.rows[0].employee_no
      }
    });
  }).catch(function (e) {
    return next(e);
  });
};

// const jwt = require('jsonwebtoken');


// const pool = require('../Models/poolConnection');
exports.default = createUser;