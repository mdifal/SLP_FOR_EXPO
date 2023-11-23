// const Data_Mata_Kuliah = require('../models/models/dataMataKuliah');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Mata_Kuliah = new mainModel("Data_Mata_Kuliah");

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Data_Mata_Kuliah.getAll();
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOneDataMatkul = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const dataMatkul = await Data_Mata_Kuliah.get({ // Menggunakan metode 'get' dengan kriteria ID
      where: { id: id },
    });

    if (dataMatkul) {
      res.send({
        message: "Data Mata Kuliah found successfully",
        data: dataMatkul,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Data Mata Kuliah not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
