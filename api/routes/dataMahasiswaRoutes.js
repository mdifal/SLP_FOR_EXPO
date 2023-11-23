const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const dataMahasiswaController = require('../controllers/dataMahasiswaController');
const mhsAuth = require('../middleware/mhsAuth')
const path = require('path');
const multer = require('multer');
const cors = require('cors');

//middleware untuk file
const uploadFile = require('../middleware/multerFile');
//middleware untuk image
const uploadImg = require('../middleware/multerImg');

const uploadxlsx = require('../middleware/multerBuffer');

router.use(cookieParser());

// Get all students
router.get('/students/all/:IDProdi', dataMahasiswaController.getAllStudents);

router.get('/students/:id', dataMahasiswaController.getStudent);

router.get('/students/getId/:NIM', dataMahasiswaController.getStudentId);

router.post('/create', dataMahasiswaController.createMhs);

router.post('/students/edit/:id', uploadImg.single('photo'), dataMahasiswaController.editStudent);

router.post('/register', dataMahasiswaController.registerStudent);

router.post('/login', dataMahasiswaController.loginStudent);

router.patch('/forgot-password', dataMahasiswaController.ForgotPassword);

router.get('/logout', mhsAuth.authorizedUser, dataMahasiswaController.logoutStudent);

router.get('/export', dataMahasiswaController.exportExcel);

router.post('/import', uploadxlsx.single('xlsx'), dataMahasiswaController.importStudentsFromExcel);

router.get('/rekap', dataMahasiswaController.RekapIzin);

router.get('/rekap/detail/:id', dataMahasiswaController.RekapIzinDetail);

router.get('/count/mhs/:IDProdi', dataMahasiswaController.getJmlMahasiswaProdi);

router.get('/protected', mhsAuth.authorizedUser, dataMahasiswaController.protectedContent);


module.exports = router;