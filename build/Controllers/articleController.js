'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _poolConnection = require('../Models/poolConnection');

var _poolConnection2 = _interopRequireDefault(_poolConnection);

var _getTokenUser = require('../utilities/getTokenUser');

var _getTokenUser2 = _interopRequireDefault(_getTokenUser);

var _articleSchema = require('../Models/articleSchema');

var _articleSchema2 = _interopRequireDefault(_articleSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const userDetails = require('../utilities/getTokenUser');
var articleController = {};

// const articleSchema = require('../Models/articleSchema');
// const pool = require('../Models/poolConnection');


articleController.createArticle = function (req, res, next) {
  var token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  var user = (0, _getTokenUser2.default)(token);
  var _req$body = req.body,
      article_id = _req$body.article_id,
      title = _req$body.title,
      article = _req$body.article,
      appr_status = _req$body.appr_status;

  var date = Date().split('GMT')[0];

  _poolConnection2.default.query(_articleSchema2.default.getEmployeeId, [user.username]).then(function (id) {
    _poolConnection2.default.query(_articleSchema2.default.newArticle, [title, article, appr_status, id.rows[0]['employee_id'], date]).then(function (article) {
      res.status(201).json({
        "status": "Success",
        "data": {
          "message": "Article successfully posted",
          "articleId": article.rows[0].article_id,
          "createdOn": article.rows[0].creation_date,
          "title": article.rows[0].article_title
        }
      });
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
};

articleController.postAnArticleComment = function (req, res, next) {
  //request comes with articleId
  var token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  var user = (0, _getTokenUser2.default)(token);
  var date = Date().split('GMT')[0];

  var comments = req.body.comments;

  _poolConnection2.default.query(_articleSchema2.default.getEmployeeId, [user.username]).then(function (id) {
    _poolConnection2.default.query(_articleSchema2.default.postAnArticleComment, [comments, id.rows[0]['employee_id'], date]).then(function (comment) {
      _poolConnection2.default.query(_articleSchema2.default.updateArticleCommentTable, [req.params.articleId, comment.rows[0]['comment_id'], comment.rows[0]['employee_id']]).then(function () {
        _poolConnection2.default.query(_articleSchema2.default.getAnArticleText, [req.params.articleId]).then(function (article) {
          res.status(201).json({
            "status": "success",
            "data": {
              "message": "comment successfully created",
              "createdOn": comment.rows[0]['creation_date'],
              "articleTitle": article.rows[0].title,
              "article": article.rows[0].article,
              "comment": comment.rows[0].comment_text
            }
          });
        }).catch(function (e) {
          return next(e);
        });
      }).catch(function (e) {
        return next(e);
      });
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
};

articleController.getAnArticle = function (req, res, next) {

  _poolConnection2.default.query(_articleSchema2.default.getAnArticleText, [req.params.articleId]).then(function (article) {
    _poolConnection2.default.query(_articleSchema2.default.getAnArticleComment, [req.params.articleId]).then(function (comments) {
      res.status(200).json({
        "status": "success",
        "data": {
          "id": article.rows[0].id,
          "createdOn": article.rows[0].createdOn,
          "title": article.rows[0].title,
          "article": article.rows[0].article,
          "comments": comments.rows
        }
      });
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
};

articleController.updateAnArticle = function (req, res, next) {

  var token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  var user = (0, _getTokenUser2.default)(token);

  var _req$body2 = req.body,
      title = _req$body2.title,
      article = _req$body2.article;


  _poolConnection2.default.query(_articleSchema2.default.getEmployeeId, [user.username]).then(function (id) {
    _poolConnection2.default.query(_articleSchema2.default.updateAnArticle, [title, article, req.params.articleId, id.rows[0]['employee_id']]).then(function (article) {
      res.status(200).json({
        "status": "success",
        "data": {
          "message": "Article successfully updated",
          "title": article.rows[0].article_title,
          "article": article.rows[0].article_text
        }
      });
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
};

articleController.deleteAnArticle = function (req, res, next) {

  var token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  var user = (0, _getTokenUser2.default)(token);

  _poolConnection2.default.query(_articleSchema2.default.getEmployeeId, [user.username]).then(function (id) {
    _poolConnection2.default.query(_articleSchema2.default.deleteAnArticle, [req.params.articleId, id.rows[0]['employee_id']]).then(function (resp) {
      res.status(200).json({
        "status": "success",
        "data": {
          "message": "Article successfully deleted",
          "deleted message": resp.rows[0]
        }
      });
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
};

exports.default = articleController;