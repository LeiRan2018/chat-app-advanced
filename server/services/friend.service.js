const Friend = require('../models/friend');
const Message = require('../models/message');
const User = require('../models/user');

exports.deleteFriend = async function (ownerId, friendId) {
    try {
        //delete message between two users
        let messId1 = ownerId + friendId;
        let messId2 = friendId + ownerId;
        console.log(messId1 + messId2);
        await Message.findOne({ where: { chatRoomID: messId1 } }).then(item => {
            if (item) { item.destroy(); }
        })
        await Message.findOne({ where: { chatRoomID: messId2 } }).then(item => {
            if (item) { item.destroy(); }
        })
        //delete friend in friend table
        let owner = await User.findOne({ where: { userID: ownerId } });
        let friend = await User.findOne({ where: { userID: friendId } });

        await Friend.findOne({ where: { email: owner.email, friendEmail: friend.email } }).then(item => {
            if (item) { item.destroy(); }
        })
        await Friend.findOne({ where: { email: friend.email, friendEmail: owner.email } }).then(item => {
            if (item) { item.destroy(); }
        })

    } catch (e) {
        throw Error('error occured while deleting friend table');
    }
}