'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtCheck = function jwtCheck(req, res, next) {

  if (!req.headers.authorization) {
    var err = new Error('Unauthorized access 1');
    res.status(401);
    err.status = 401;
    next(err);
  }
  if (req.headers.authorization) {
    var toks = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
    _jsonwebtoken2.default.verify(toks, process.env.TOKENKEY, function (err, tokers) {
      if (err) console.error(err);

      if (!tokers) {
        var _err = new Error('Unauthorized access 2');
        res.status(410);
        _err.status = 401;
        next(_err);
      } else if (tokers) {
        res.status(200);
        next();
      }
    });
  } else {
    return;
  }
}; // const jwt = require('jsonwebtoken');
exports.default = jwtCheck;