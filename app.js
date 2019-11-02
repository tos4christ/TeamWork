// Import the Express Module for the server
const express = require('express');
// Import pg to create an instance of postgreSQL connection
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5433,
  password: 673321,
  database: 'mydb',
});
client.connect()
  .then(() => console.log('Connected'))
  .catch(e => console.error('Connection Error:', e.stack));

client.query('select current_user, now()', (err, res) => {
  if (err) console.error(err);
  console.log(res.rows);
  client.end();
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
