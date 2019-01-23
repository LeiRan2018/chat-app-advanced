const Sequelize = require('sequelize');

const sequelize = new Sequelize('chat-app', 'root', 'example', {
    dialect: 'mysql',
    host: "127.0.0.1",
    port: 3306,
});


module.exports = sequelize.define('user', {
    userID: Sequelize.STRING,
    userName: Sequelize.STRING,
    email: Sequelize.STRING
});

// module.exports = Users