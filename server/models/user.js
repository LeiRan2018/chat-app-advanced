const Sequelize = require('sequelize');
const sequelize = require('./chat-app');
const User =  sequelize.define('user', {
    userID: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
});

module.exports = User;