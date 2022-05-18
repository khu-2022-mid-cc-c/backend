const mysql = require('mysql2/promise');
const config = require('../config');

let connection = null;
const getConnection = () => {
  if (connection === null) {
    connection = mysql.createPool({
      host: config.database.host,
      user: config.database.username,
      password: config.database.password,
      database: config.database.name,
    });
  }
  return connection;
}

module.exports = getConnection;
