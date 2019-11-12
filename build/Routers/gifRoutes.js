'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _connectMultiparty = require('connect-multiparty');

var _connectMultiparty2 = _interopRequireDefault(_connectMultiparty);

var _gifController = require('../Controllers/gifController');

var _gifController2 = _interopRequireDefault(_gifController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// const multipart = require('connect-multiparty');
// const router = require('express').Router();

var multipartMiddleware = (0, _connectMultiparty2.default)();

// const gifController = require('../Controllers/gifController');


router.post('/', multipartMiddleware, _gifController2.default.createGif);

router.get('/:gifId', _gifController2.default.getAGif);

router.delete('/:gifId', _gifController2.default.deleteAGif);

router.post('/:gifId/comment', _gifController2.default.postAGifComment);

exports.default = router;