var express = require('express');
var router = express.Router();

var chatController = require('../../controllers/chat.controller');
var auth = require('../../middleware/auth_middleware');

router.post('/postchat', auth.authMiddleware, chatController.postchat);
module.exports = router;