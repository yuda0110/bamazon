const mysql = require('mysql');

// Create the connection information for the sql database
const connection = function() {
  return
    mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'bamazon'
    });
};

module.exports = connection;