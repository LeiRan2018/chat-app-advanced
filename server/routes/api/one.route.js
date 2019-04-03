var express = require('express');
var router = express.Router();

var oneController = require('../../controllers/one.controller');

router.post('/', oneController.postone);
router.post('/adduser', oneController.addUser);
router.post('/history', oneController.getHistory);
module.exports = router;