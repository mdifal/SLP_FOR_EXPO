const express = require('express');
const router = express.Router();
const axios = require('axios');
const jadwalKelasController = require('../controllers/jadwalKelasController');

// Get all class schedules
router.get('/', jadwalKelasController.getAllClassSchedules);

// Create a new class schedule
router.post('/create', jadwalKelasController.createClassSchedule);

// Create a new class schedule
router.delete('/delete/:id', jadwalKelasController.deleteClassSchedule);

// Create a new class schedule
router.patch('/update/:id', jadwalKelasController.editClassSchedule);

// Create a new class schedule
router.get('/get/:id', jadwalKelasController.getClassSchedule);

router.get('/:idKelas/:hari', jadwalKelasController.getClassScheduleWithTwoParams);

router.get('/getDataAll', jadwalKelasController.toClearClassSchedule);

router.get('/tabel/formatted/:IDProdi', jadwalKelasController.getClassScheduleFormatted);

module.exports = router;
