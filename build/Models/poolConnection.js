'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _ndpoolQuery = require('./2ndpoolQuery');

var _ndpoolQuery2 = _interopRequireDefault(_ndpoolQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// for the connection string use process.env.DATABASE_URL
// const { Pool } = require('pg');
var pool = new _pg.Pool({
  connectionString: 'postgres://bncamlwesysfrq:70aa1093d8b60709294c6286d8cddf3431fcf90dafe9eb2b14c0b590fb82e5e9@ec2-174-129-253-144.compute-1.amazonaws.com:5432/d1pe9mpgmslihs',
  ssl: true
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