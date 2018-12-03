const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./database');
const port = 8080;

const app = express();
const dbPool = mysql.createPool(db.conf);
app.use(cors());

require('./usuarios').route(app, dbPool, db);

module.exports = app;