// config/db.js

const mysql = require('mysql2/promise');
require('dotenv').config();

//pool create kr rhe h jis se connections ko reuse kr ske and avoid opening/closing for every query

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,  //if all connections busy, wait instead of immediate error.
    connectionLimit: 10, //maximum simultaneous DB connections.
    queueLimit: 0
});

module.exports = pool;
