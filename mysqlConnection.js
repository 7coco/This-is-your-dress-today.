const connection = require('mysql-promise')();

connection.configure({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'bd4851ba8155c4',
    password: '9943b0e5',
    database: 'heroku_8621849c7281689',
    charset: 'utf8mb4',
});

module.exports = connection;
