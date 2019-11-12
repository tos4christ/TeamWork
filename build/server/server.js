'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('../app/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const app = require('../app/app');

// const http = require('http');
var port = process.env.PORT || 3000;

var server = _http2.default.createServer(_app2.default);

server.listen(port, function () {
  console.log('server listening on port ' + port);
});

exports.default = server;