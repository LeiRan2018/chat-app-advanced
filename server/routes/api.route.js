var express = require('express')

var router = express.Router()
var chat = require('./api/chat.route');
var login = require('./api/login.route');
var sign = require('./api/sign.route');
var one = require('./api/one.route');
var contact = require('./api/contact.route');

router.use('/chat', chat);
router.use('/login', login);
router.use('/sign', sign);
router.use('/one', one);
router.use('/contacts', contact);

module.exports = router;