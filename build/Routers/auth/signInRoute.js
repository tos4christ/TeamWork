'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _signInController = require('../../Controllers/signInController');

var _signInController2 = _interopRequireDefault(_signInController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// const signInController = require('../../Controllers/signInController');
// const router = require('express').Router();


router.post('/', _signInController2.default);

exports.default = router;