const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./database');
const port = 8080;

const app = express();
const dbPool = mysql.createPool(db.conf);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());

require('./usuarios').route(app, dbPool, db);
require('./proyectos').route(app, dbPool, db);
require('./actividades').route(app, dbPool, db);
require('./auth').route(app, dbPool, db);

module.exports = app;