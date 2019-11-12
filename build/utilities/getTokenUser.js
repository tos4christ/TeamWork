'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var details = function details(token) {
  var toker = _jsonwebtoken2.default.verify(token, process.env.TOKENKEY, function (err, token) {
    if (err) console.error(err);
    return token;
  });
  return toker;
}; // const jwt = require('jsonwebtoken');
exports.default = details;