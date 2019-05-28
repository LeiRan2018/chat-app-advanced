const Friend = require('../models/friend');

exports.deleteFriend = async function (ownerId, friendId) {
    try {
        await Friend.findOne({ where: { email: ownerId, friendEmail: friendId } }).then(item =>{
            item.destroy();
        })
        await Friend.findOne({ where: { email: friendId, friendEmail: ownerId } }).then(item =>{
            item.destroy();
        })
        
    } catch (e) {
        throw Error('error occured while deleting friend table');
    }
}