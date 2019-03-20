const chatRoom = require('../models/chatroom');

const user_chatRoom = require('../models/user-chat');

const User = require('../models/user');

const message = require('../models/message');

var jwt = require('jsonwebtoken');


exports.getuser = async function (data) {
    try {
        let user = await User.findOne({ where: { email: data.email, password: data.password } })
        var token = jwt.sign({ email: user.email }, 'secret')
        return {email: user.email, token: token, userId: user.userID}
    }
    catch (e) {
        throw Error('error occured while getting user info');
    }
};

exports.getchatroom = async function () {
    try {
        return chatRoom.findOne();
    }
    catch (e) {
        throw Error('error occured while getting broadcast room');
    }
};

exports.gethistory = async function (data) {
    try {
        return message.findAll({ where: { chatRoomID: data } })
    }
    catch (e) {
        throw Error('error occured while getting all messages from broadcast room');
    }
};

exports.getcontact = async function () {
    try {
        return user.findAll();
    }
    catch (e) {
        throw Error('error occured while getting user list');
    }
}

exports.postlogout = async function (data) {
    try {
        user_chatRoom.findOne(
            {
                where: { userID: data.userid },
                order: [['createdAt', 'DESC']]
            }
        ).then(value => {
            user_chatRoom.update(
                { updatedAt: Date.now() },
                { where: { user_chatRoomID: value.user_chatRoomID } }
            )
        })

    } catch (e) {
        throw Error('error occured while logging out');
    }
}
