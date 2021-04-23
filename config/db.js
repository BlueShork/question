let mysql = require('mysql2');

let connection = mysql.createConnection({
    host : '45.55.53.248',
    user : 'Admin',
    password: 'ethan.morisset12',
    database : 'express',
});

connection.connect();

module.exports = connection;