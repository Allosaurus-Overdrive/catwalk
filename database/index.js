const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'fec',
});

connection.connect(err => {
  if (err) {
    console.log('error connection to database: ', error);
    return;
  } else {
  console.log('connected as user: ', connection.user);
  }
});

module.exports = connection;
