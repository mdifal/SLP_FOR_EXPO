const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Jadwal_Kelas = new mainModel("Jadwal_Kelas");
const Data_Jam_Pelajaran = new mainModel("Data_Jam_Pelajaran");
const Data_Kelas = new mainModel("Data_Kelas");
const Data_Dosen = new mainModel("Data_Dosen");
const Data_Mata_Kuliah = new mainModel("Data_Mata_Kuliah");
const { Op } = require('sequelize');

// console.log(Jadwal_Kelas);
// const Jadwal_Kelas = require('../models/models/jadwalKelas');

// Get all class schedules
exports.getAllClassSchedules = async (req, res) => {
  try {
    const schedules = await Jadwal_Kelas.getAll(); // WHERE THE ERROR IS
    // res.json(schedules);
    schedules.sort((a, b) => {
      return a.id - b.id;
    });
    res.send({
      message: "Schedule sent successfully",
      data: schedules
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new class schedule
exports.createClassSchedule = async (req, res) => {
  try {
    await Jadwal_Kelas.post(req.body);
    res.status(201).json({ msg: 'New Schedule created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Delete
exports.deleteClassSchedule = async (req, res) => {
  try {
    const whereClause = { id: req.params.id }; // Contoh: menghapus data berdasarkan ID
    const deletedRowCount = await Jadwal_Kelas.delete(whereClause);

    if (deletedRowCount === 0) {
      return res.status(404).json({ msg: 'New Schedule not found' });
    }

    res.status(200).json({ msg: 'New Schedule deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Edit
exports.editClassSchedule = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const newData = req.body; // Data yang akan digunakan untuk mengganti data yang ada
    const whereClause = { id }; // Kriteria untuk menentukan data yang akan diedit

    const [updatedRowCount] = await Jadwal_Kelas.patch(newData, whereClause);

    if (updatedRowCount === 0) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }

    res.status(200).json({ msg: 'New Schedule updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getClassSchedule = async (req, res) => {
  try {
    const { id } = req.params; // Assuming NIM is passed as a route parameter
    
    const jadwal = await Jadwal_Kelas.get({
      where: { id: id },
    });

    if (jadwal) {
      res.send({
        message: "Class Schedule found successfully",
        data: jadwal,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Class Schedule not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getClassScheduleWithTwoParams = async (req, res) => {
  try {
    const idKelas = req.params.idKelas
    const hari = req.params.hari
    
    const dataJamPelajaran = await Data_Jam_Pelajaran.getAll();
    const schedule = await Jadwal_Kelas.getAllWhere({
      where: {
        Hari_Jadwal: hari,
        ID_Kelas: idKelas
      },
    });

    const dataMataKuliah = await Jadwal_Kelas.getAllInclude({
      where: {
        Hari_Jadwal: hari,
        ID_Kelas: idKelas
      },
      include: ['Data_Mata_Kuliah']
    });

    const dataDosen = await Jadwal_Kelas.getAllInclude({
      where: {
        Hari_Jadwal: hari,
        ID_Kelas: idKelas
      },
      include: ['Data_Dosen']
    });

    if (schedule) {
      res.send({
        message: "schedule found successfully",
        data: schedule,
        mata_kuliah : dataMataKuliah,
        dosen : dataDosen,
        jam_pelajaran: dataJamPelajaran,
      });
      
      
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "schedule not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getClassScheduleFormatted = async (req, res) => {
  try {
    const IDProdi = req.params.IDProdi;

    let prodi = '';

    //mengubah id prodi menjadi prodinya
    if (IDProdi === '1'){
      prodi = 'D3';
    } else if (IDProdi === '2'){
      prodi = 'D4';
    }

    //mengambil data kelas dengan prodi yang sama
    const kelas = await Data_Kelas.getAllWhere({
      where: {
        Nama_Kelas: {
          [Op.like]: `%${prodi}`
        }
      }
    });

    // Ambil data jadwal
    const schedules = await Jadwal_Kelas.getAllWhere({
      where: { ID_Kelas: kelas.map((kls) => kls.id) },
    });
    
    //mengambil jam matkul
    const dataJamPelajaran = await Data_Jam_Pelajaran.getAll();

    //mengambil data dosen
    const dataDosen = await Jadwal_Kelas.getAllJustInclude({
      include: ['Data_Dosen']
    });

    //mengambil data mata kuliah
    const dataMatkul = await Jadwal_Kelas.getAllJustInclude({
      include: ['Data_Mata_Kuliah']
    });

    //mengambil data kelas
    const dataKelas = [];

    //mengembalikan data-data yang sudah diambil ke frontend
    if (schedules) {
      res.send({
        message: "Schedule found successfully",
        data: schedules,
        jam_pelajaran: dataJamPelajaran,
        dosen: dataDosen,
        mata_kuliah: dataMatkul,
        kelas: kelas
      });
      
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Schedule not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.toClearClassSchedule = async (req, res) => {
  try {    
    const dataJamPelajaran = await Data_Jam_Pelajaran.getAll();

    const dataDosen = await Data_Dosen.getAll();

    const dataMatkul = await Data_Mata_Kuliah.getAll();

    const dataKelas = await Data_Kelas.getAll();

    if (dataKelas) {
      res.send({
        message: "found successfully",
        jam_pelajaran: dataJamPelajaran,
        dosen: dataDosen,
        mata_kuliah: dataMatkul,
        kelas: dataKelas
      });
      
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};