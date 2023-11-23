// const Data_Kelas = require('../models/models/dataKelas');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Kelas = new mainModel("Data_Kelas");
const { Op } = require('sequelize');

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Data_Kelas.getAll();
    // res.json(classes);
    res.send({
      message: "Classes sent successfully",
      data: classes
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOneDataKelas = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const dataKelas = await Data_Kelas.get({ // Menggunakan metode 'get' dengan kriteria ID
      where: { id: id },
    });

    if (dataKelas) {
      res.send({
        message: "Data Kelas found successfully",
        data: dataKelas,
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

//Insert
// Create Data Kelas
exports.createDataKelas = async (req, res) => {
  try {
    const { Nama_Kelas, Tahun_Ajaran, ID_Dosen_Wali } = req.body; // Pastikan Nama_Kelas dan Tahun_Ajaran ada dalam request body

    if (!Nama_Kelas || !Tahun_Ajaran) { // Pastikan keduanya ada
      return res.status(400).json({ error: 'Nama Kelas and Tahun Ajaran are required' });
    }

    const newKelas = await Data_Kelas.post({
      Nama_Kelas,
      Tahun_Ajaran,
      ID_Dosen_Wali
    });

    res.status(201).json({
      message: 'Data Kelas created successfully',
      data: newKelas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllClassFormated = async (req, res) => {
  try {
    console.log('///////////////////////////////////////////////////////// masukkkkkk');
    const IDProdi = req.params.IDProdi;

    let prodi = '';
    console.log('//////////////////////////////////////////////ini id', IDProdi);

    //mengubah id prodi menjadi prodinya
    if (IDProdi === '1'){
      prodi = 'D3';
    } else if (IDProdi === '2'){
      console.log('//////////////////////////////////////////////ini id', IDProdi);
      prodi = 'D4';
      console.log('//////////////////////////////////////////////ini id', prodi);
    }

    //mengambil data kelas dengan prodi yang sama
    const classes = await Data_Kelas.getAllWhere({
      where: {
        Nama_Kelas: {
          [Op.like]: `%${prodi}`
        }
      }
    });

    const currentYear = new Date().getFullYear();

    // Ubah format setiap kelas
    const formattedClasses = classes.map((kelas) => {
      let angka_kelas;
      if (new Date().getMonth() >= 7) {
        angka_kelas = currentYear - kelas.Tahun_Ajaran + 1;
      } else {
        angka_kelas = currentYear - kelas.Tahun_Ajaran;
      }

      return {
        id: kelas.id,
        Nama_Kelas: `${angka_kelas}${kelas.Nama_Kelas}`,
        Tahun_Ajaran: kelas.Tahun_Ajaran,
        ID_Dosen_Wali: kelas.ID_Dosen_Wali,
        createdAt: kelas.createdAt,
        updatedAt: kelas.updatedAt
      };
    });

    res.send({
      message: "Classes sent successfully",
      data: formattedClasses
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getOneClassFormated = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL parameters
    const dataKelas = await Data_Kelas.get({ where: { id } }); // Use 'get' method with the ID criteria

    // Check if the class exists
    if (!dataKelas) {
      return res.status(404).json({ error: 'Class not found' });
    }

    // Format the response
    const currentYear = new Date().getFullYear();
    let angka_kelas;
    if (new Date().getMonth() >= 7) {
      angka_kelas = currentYear - dataKelas.Tahun_Ajaran + 1;
    } else {
      angka_kelas = currentYear - dataKelas.Tahun_Ajaran;
    }

    const formattedClass = {
      id: dataKelas.id,
      Nama_Kelas: `${angka_kelas}${dataKelas.Nama_Kelas}`,
      Tahun_Ajaran: dataKelas.Tahun_Ajaran,
      ID_Dosen_Wali: dataKelas.ID_Dosen_Wali,
      createdAt: dataKelas.createdAt,
      updatedAt: dataKelas.updatedAt,
    };

    res.send({
      message: 'Class sent successfully',
      dataKelas: formattedClass,
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteClass = async (req, res) => {
  try {
    const whereClause = { id: req.params.id }; // Contoh: menghapus data berdasarkan ID
    const deletedRowCount = await Data_Kelas.delete(whereClause);

    if (deletedRowCount === 0) {
      return res.status(404).json({ msg: 'New Schedule not found' });
    }

    res.status(200).json({ msg: 'New Schedule deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editDataKelas = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const newData = req.body; // Data yang akan digunakan untuk mengganti data yang ada
    const whereClause = { id }; // Kriteria untuk menentukan data yang akan diedit

    const [updatedRowCount] = await Data_Kelas.patch(newData, whereClause);

    if (updatedRowCount === 0) {
      return res.status(404).json({ msg: 'Data Kelas not found' });
    }

    res.status(200).json({ msg: 'Data Kelas updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};