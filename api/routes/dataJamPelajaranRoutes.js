const express = require('express');
const router = express.Router();
const dataJamPelajaranController = require('../controllers/dataJamPelajaranController');

// Get all class hours
router.get('/', dataJamPelajaranController.getAllClassHours);

router.get('/get/:id', dataJamPelajaranController.getOneDataClassHour);

module.exports = router;
