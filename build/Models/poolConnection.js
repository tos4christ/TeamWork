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
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

// const query2 = require('./2ndpoolQuery');


pool.on('connect', function () {
  return console.log('connected to the database');
});

// pool.query(query2.all, (err, res) => {
//   if(err) console.error(err);
//   console.log('database migrated');
// });

exports.default = pool;