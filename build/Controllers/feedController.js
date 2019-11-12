'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _poolConnection = require('../Models/poolConnection');

var _poolConnection2 = _interopRequireDefault(_poolConnection);

var _feedSchema = require('../Models/feedSchema');

var _feedSchema2 = _interopRequireDefault(_feedSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // const pool = require('../Models/poolConnection');


// const feedSchema = require('../Models/feedSchema');


var getFeed = function getFeed(req, res, next) {

  _poolConnection2.default.query(_feedSchema2.default.article).then(function (article) {
    _poolConnection2.default.query(_feedSchema2.default.gif).then(function (gif) {
      var feedRow = [].concat(_toConsumableArray(article.rows), _toConsumableArray(gif.rows));
      feedRow.sort(function (a, b) {
        return b.createdOn - a.createdOn;
      });
      res.status(200).json({
        "status": "success",
        "data": feedRow
      });
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
};

exports.default = getFeed;