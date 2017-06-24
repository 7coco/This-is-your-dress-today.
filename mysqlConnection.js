const connection = require('mysql-promise')();

connection.configure({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'bd4851ba8155c4',
    database: 'dress_teller',
    charset: 'utf8mb4',
});

module.exports = connection;
