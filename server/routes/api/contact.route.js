var express = require('express');
var router = express.Router();

var contactController = require('../../controllers/contact.controller');
var auth = require('../../middleware/auth_middleware');

router.post('/', auth.authMiddleware, contactController.getContacts);
router.post('/friends', auth.authMiddleware, contactController.getFriends);

module.exports = router;