'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _articleController = require('../Controllers/articleController');

var _articleController2 = _interopRequireDefault(_articleController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

// const articleController = require('../Controllers/articleController');
// const router = require('express').Router();


router.post('/', _articleController2.default.createArticle);

router.patch('/:articleId', _articleController2.default.updateAnArticle);

router.get('/:articleId', _articleController2.default.getAnArticle);

router.delete('/:articleId', _articleController2.default.deleteAnArticle);

router.post('/:articleId/comment', _articleController2.default.postAnArticleComment);

exports.default = router;