const express = require('express');
const router = express.Router();
const dataDosenWaliController = require('../controllers/dataDosenWaliController');

// Get all adviser lecturers
router.get('/', dataDosenWaliController.getAllAdviserLecturers);

router.post('/register', dataDosenWaliController.registerAdviserLecturer);

router.post('/login', dataDosenWaliController.loginAdviserLecturer);

router.post('/create', dataDosenWaliController.createDataDosenWali);

router.patch('/patch/:id', dataDosenWaliController.editDataDosenWali);

router.patch('/forgot-password', dataDosenWaliController.forgotPassword);

router.get('/get/:id', dataDosenWaliController.getOneDataDosenWali);

router.get('/get/id/:username', dataDosenWaliController.getIdDosenWali);

router.delete('/delete/:id', dataDosenWaliController.deleteDataDosenWali);

module.exports = router;