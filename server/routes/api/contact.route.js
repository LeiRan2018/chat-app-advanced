var express = require('express');
var router = express.Router();

var contactController = require('../../controllers/contact.controller');
var auth = require('../../middleware/auth_middleware');

router.get('/', auth.authMiddleware, contactController.getContacts);

module.exports = router;