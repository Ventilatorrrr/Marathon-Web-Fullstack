const mysql = require('mysql2/promise');
const config = require('./config.json');

module.exports = mysql.createPool(config.db);