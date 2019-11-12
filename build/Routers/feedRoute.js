'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _feedController = require('../Controllers/feedController');

var _feedController2 = _interopRequireDefault(_feedController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// const feedController = require('../Controllers/feedController');
// const router = require('express').Router();


router.get('/', _feedController2.default);

exports.default = router;