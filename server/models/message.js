const Sequelize = require('sequelize');
const sequelize = require('./chat-app');
const Message =  sequelize.define('message', {
    messageID: Sequelize.STRING,
    chatRoomID: Sequelize.STRING,
    message: Sequelize.STRING
});

module.exports = Message;