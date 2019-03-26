const Sequelize = require('sequelize');
const sequelize = require('./chat-app');
const Friend = sequelize.define('friend', {
    email: Sequelize.STRING,
    friendEmail: Sequelize.STRING,
    friendID: Sequelize.STRING
});

module.exports = Friend;