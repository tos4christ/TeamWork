"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var userQuery = "SELECT * FROM employees WHERE email=$1";

exports.default = userQuery;