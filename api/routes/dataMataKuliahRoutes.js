const express = require('express');
const router = express.Router();
const dataMataKuliahController = require('../controllers/dataMataKuliahController');

// Get all subjects
router.get('/', dataMataKuliahController.getAllSubjects);

router.get('/get/:id', dataMataKuliahController.getOneDataMatkul);

module.exports = router;
