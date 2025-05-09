// npm install mysql

const mysql = require('mysql');
const config = require('./config.json');

const pool = mysql.createPool(config);

module.exports = pool;
