const mysql = require("mysql");

let connection = (query, callback) => {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'InfLap117',
    database: 'company'
  });


  connection.connect();

  connection.query(query, function (error, results, fields) {
    if (error) {
      callback(error, null);
      connection.end();
      return;
    };
    callback(null, results);
    connection.end();
    return;
  });

}

module.exports = {
  connection
};