'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _createUserRoute = require('./auth/createUserRoute');

var _createUserRoute2 = _interopRequireDefault(_createUserRoute);

var _signInRoute = require('./auth/signInRoute');

var _signInRoute2 = _interopRequireDefault(_signInRoute);

var _gifRoutes = require('./gifRoutes');

var _gifRoutes2 = _interopRequireDefault(_gifRoutes);

var _articleRoutes = require('./articleRoutes');

var _articleRoutes2 = _interopRequireDefault(_articleRoutes);

var _feedRoute = require('./feedRoute');

var _feedRoute2 = _interopRequireDefault(_feedRoute);

var _jwtCheck = require('../utilities/jwtCheck');

var _jwtCheck2 = _interopRequireDefault(_jwtCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const feedRoute = require('./feedRoute');


// const gifRoutes = require('./gifRoutes');


// const createUserRoute = require('./auth/createUserRoute');
var router = (0, _express.Router)();

// const jwtCheck = require('../utilities/jwtCheck');


// const articleRoutes = require('./articleRoutes');


// const signInRoute = require('./auth/signInRoute');
// const router = require('express').Router();


router.use('/auth/create-user', _jwtCheck2.default, _createUserRoute2.default);

router.use('/auth/signin', _signInRoute2.default);

router.use('/gifs', _jwtCheck2.default, _gifRoutes2.default);

router.use('/articles', _jwtCheck2.default, _articleRoutes2.default);

router.use('/feed', _jwtCheck2.default, _feedRoute2.default);

exports.default = router;