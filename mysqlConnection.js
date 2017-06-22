const connection = require('mysql-promise')();

connection.configure({
    host: 'localhost',
    user: 'root',
    database: 'dress_teller',
    charset: 'utf8mb4',
});

module.exports = connection;
