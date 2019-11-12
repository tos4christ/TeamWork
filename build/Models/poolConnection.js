'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _ndpoolQuery = require('./2ndpoolQuery');

var _ndpoolQuery2 = _interopRequireDefault(_ndpoolQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const { Pool } = require('pg');
var pool = new _pg.Pool({
  host: 'ec2-174-129-253-144.compute-1.amazonaws.com',
  user: 'bncamlwesysfrq',
  password: '70aa1093d8b60709294c6286d8cddf3431fcf90dafe9eb2b14c0b590fb82e5e9',
  database: 'd1pe9mpgmslihs',
  port: '5432'
});

// const query2 = require('./2ndpoolQuery');


pool.on('connect', function () {
  return console.log('connected to the database');
});

pool.query(query2.all, (err, res) => {
  if(err) console.error(err);
  console.log('database migrated');
});

exports.default = pool;