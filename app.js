// load environmental variables using dotenv
require('dotenv').config();
// Import the Express Module for the server
const express = require('express');
// Import pg to create an instance of postgreSQL connection
const { Client } = require('pg');
// Import the cloudinary module for storing gifs
const cloudinary = require('cloudinary').v2;

const img = cloudinary.image("sample", {format: "png", width: 100, height: 100, crop: "fill"});

console.log(process.env.PGUSER, 'this one now');
const client = new Client("postgres://postgres:127.0.0.1:5433/postgres");
client.connect()
  .then(() => console.log('Connected'))
  .catch(e => console.error('Connection Error:', e.stack));

client.query('select current_user, now()', (err, res) => {
  if (err) console.error(err);
  client.end();
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send('Request received');
});

app.use((err, req, res) => {
  if(err) {
    res.send({
      'Server Error': err.stack
    })
  }
})

module.exports = app;
