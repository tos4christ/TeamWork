'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _createUserController = require('../../Controllers/createUserController');

var _createUserController2 = _interopRequireDefault(_createUserController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// const createUserController = require('../../Controllers/createUserController');
// const router = require('express').Router();


router.post('/', _createUserController2.default);

exports.default = router;