// const Data_Jam_Pelajaran = require('../models/models/dataJamPelajaran');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Jam_Pelajaran = new mainModel("Data_Jam_Pelajaran");

// Get all class hours
exports.getAllClassHours = async (req, res) => {
  try {
    const classHours = await Data_Jam_Pelajaran.getAll();
    // res.json(classHours);
    res.send({
      message: "Class Hours sent successfully",
      data: classHours
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOneDataClassHour = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const classHours = await Data_Jam_Pelajaran.get({ // Menggunakan metode 'get' dengan kriteria ID
      where: { id: id },
    });

    if (classHours) {
      res.send({
        message: "Data Jam Pelajaran found successfully",
        data: classHours,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Data Kelas not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};