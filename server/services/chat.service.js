var shortid = require('shortid');

const message = require('../models/message');

exports.postchat = async function (data) {
    try {
        message.create({
            messageID: shortid.generate(),
            chatRoomID: data.chatid,
            message: data.msg
        })

    } catch (e) {
        throw Error('error occured while posting new data');
    }
};