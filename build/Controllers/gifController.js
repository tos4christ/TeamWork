'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _poolConnection = require('../Models/poolConnection');

var _poolConnection2 = _interopRequireDefault(_poolConnection);

var _getTokenUser = require('../utilities/getTokenUser');

var _getTokenUser2 = _interopRequireDefault(_getTokenUser);

var _gifSchema = require('../Models/gifSchema');

var _gifSchema2 = _interopRequireDefault(_gifSchema);

var _cloudinary = require('cloudinary');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const gifSchema = require('../Models/gifSchema');
// const pool = require('../Models/poolConnection');
var gifController = {};

// const cloudinary = require('cloudinary').v2;


// const userDetails = require('../utilities/getTokenUser');


gifController.createGif = function (req, res, next) {
  var token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  var user = (0, _getTokenUser2.default)(token);
  var _req$body = req.body,
      gif_title = _req$body.gif_title,
      appr_status = _req$body.appr_status;

  // cloudinary implementation

  var filename = req.files.gifPost.path;

  _cloudinary.v2.uploader.upload(filename, { tags: "gotemps", resource_type: "auto" }).then(function (file) {
    // console.log("Public id of the file is  " + file.public_id);
    // console.log("Url of the file is  " + file.url);

    /* save the file.url into the database */
    var fileUrl = file.url;
    var filePublicId = file.public_id;

    var date = Date().split("GMT")[0];
    // Pool connection goes here
    _poolConnection2.default.query(_gifSchema2.default.getEmployeeId, [user.username]).then(function (id) {
      _poolConnection2.default.query(_gifSchema2.default.newGif, [gif_title, fileUrl, appr_status, id.rows[0].employee_id, date, filePublicId]).then(function (gif) {
        res.status(201).json({
          "status": "success",
          "data": {
            "message": "GIF image successfully posted",
            "gifId": gif.rows[0].gif_id,
            "createdOn": gif.rows[0].creation_date,
            "title": gif.rows[0].gif_title,
            "imageUrl": gif.rows[0].gif_url
          }
        });
      }).catch(function (e) {
        return next(e);
      });
    }).catch(function (e) {
      return next(e);
    });
  });
};

gifController.getAGif = function (req, res, next) {

  _poolConnection2.default.query(_gifSchema2.default.getAGif, [req.params.gifId]).then(function (gif) {
    _poolConnection2.default.query(_gifSchema2.default.getAGifComment, [req.params.gifId]).then(function (comments) {
      res.status(200).json({
        "status": "success",
        "data": {
          "id": gif.rows[0].id,
          "createdOn": gif.rows[0].createdOn,
          "title": gif.rows[0].title,
          "url": gif.rows[0].url,
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

gifController.deleteAGif = function (req, res, next) {
  // delete an article from cloudinary
  //cloudinary.uploader.destroy('zombie', function(result) { console.log(result) });

  var token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  var user = (0, _getTokenUser2.default)(token);

  _poolConnection2.default.query(_gifSchema2.default.getEmployeeId, [user.username]).then(function (id) {
    _poolConnection2.default.query(_gifSchema2.default.deleteAGif, [req.params.gifId, id.rows[0]['employee_id']]).then(function (gif) {
      _cloudinary.v2.uploader.destroy(gif.rows[0].gif_public_id, function (result) {
        console.log(result);
      });
      res.status(200).json({
        "status": "success",
        "data": {
          "message": "gif post successfully deleted",
          "deleted message": gif.rows[0]
        }
      });
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
};

gifController.postAGifComment = function (req, res, next) {
  //request comes with gifId
  var token = req.headers.authorization.split(' ')[1] ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  var user = (0, _getTokenUser2.default)(token);
  var date = Date().split('GMT')[0];

  var comments = req.body.comments;

  _poolConnection2.default.query(_gifSchema2.default.getEmployeeId, [user.username]).then(function (id) {
    _poolConnection2.default.query(_gifSchema2.default.postAGifComment, [comments, id.rows[0]['employee_id'], date]).then(function (comment) {
      _poolConnection2.default.query(_gifSchema2.default.updateGifCommentTable, [req.params.gifId, comment.rows[0]['comment_id'], comment.rows[0]['employee_id']]).then(function () {
        _poolConnection2.default.query(_gifSchema2.default.getAGif, [req.params.gifId]).then(function (gif) {
          res.status(201).json({
            "status": "success",
            "data": {
              "message": "comment successfully created",
              "createdOn": comment.rows[0]['creation_date'],
              "gifTitle": gif.rows[0].title,
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

exports.default = gifController;