var friendService = require('../services/friend.service');

exports.deleteFriends = async function (req, res) {

    try {
        let ownerId = req.params.ownerId;
        let friendId = req.params.friendId;
        await friendService.deleteFriend(ownerId, friendId);
        return res
            .status(200)
            .json({ status: 200, message: 'successfully' });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}