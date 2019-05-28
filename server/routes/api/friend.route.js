var express = require('express');
var router = express.Router();

var friendController = require('../../controllers/friend.controller');

router.delete('/:ownerId/:friendId', friendController.deleteFriends);
module.exports = router;