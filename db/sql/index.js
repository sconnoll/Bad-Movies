const mysql = require('mysql');
const mysqlConfig = require('../../config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect(function(err, result) {
    if (err) {
        console.log('this is not connected to the db');
        return;
    }
    console.log('successful connection!')
});

module.exports = connection;