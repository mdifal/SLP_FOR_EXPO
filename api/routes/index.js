const express = require('express');
const routes = express();

routes.use('/admin',require('./_adminRoutes'));
routes.use('/data-dosen',require('./dataDosenRoutes'));
routes.use('/data-dosen-wali',require('./dataDosenWaliRoutes'));
routes.use('/data-jam-pelajaran',require('./dataJamPelajaranRoutes'));
routes.use('/data-kelas',require('./dataKelasRoutes'));
routes.use('/data-mahasiswa',require('./dataMahasiswaRoutes'));
routes.use('/data-mata-kuliah',require('./dataMataKuliahRoutes'));
routes.use('/data-pengajuan',require('./dataPengajuanRoutes'));
routes.use('/jadwal-kelas',require('./jadwalKelasRoutes'));
routes.get('/', function(req, res){
    res.send({
        message: "Welcome"
    });
    console.log('Homepage '+'\u001b[' + 32 + 'm' + '(re)loaded' + '\u001b[0m'+' successfully');
});

module.exports = routes;