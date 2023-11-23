const express = require('express');
const router = express.Router();
const _adminController = require('../controllers/_adminController');

router.post('/login', _adminController.login);

module.exports = router;
