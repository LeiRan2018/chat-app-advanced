const chatRoom = require('../models/chatroom');

const message = require('../models/message');

const friend = require('../models/friend');

var shortid = require('shortid');

exports.createroom = async function (data) {
    try {
        return chatRoom.create({
            chatRoomID: data
        });

    } catch (e) {
        throw Error('error occured while posting new data');
    }
};

exports.gethistory = async function (data) {
    try {
        return message.findAll({ where: { chatRoomID: data } })
    }
    catch (e) {
        throw Error('error occured while catching userchat table');
    }
};

exports.exit = async function (chatRoomID) {
    try {
        return chatRoom.findOne({ where: { chatRoomID: chatRoomID } });
    }
    catch (e) {
        throw Error('error occured while catching userchat table');
    }
};

exports.addUser = async function (data) {
    try {
        let user = await friend.findOne({ where: { email: data.host, friendEmail: data.friend}});
        if (!user) {
            friend.create({
                email: data.host,
                friendEmail: data.friend,
                friendID: data.friendId
            });
            friend.create({
                email: data.friend,
                friendEmail: data.host,
                friendID: data.hostId
            });
        }
    }
    catch (e) {
        throw Error('error occured while adding friend in table');
    }
}