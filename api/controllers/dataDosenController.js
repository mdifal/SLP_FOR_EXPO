// const Data_Dosen = require('../models/models/dataDosen');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Dosen = new mainModel("Data_Dosen");
const Data_Kelas = new mainModel("Data_Kelas");
const Data_Dosen_Wali = new mainModel("Data_Dosen_Wali");
const Data_Mahasiswa = new mainModel("Data_Mahasiswa");
const XLSX = require('xlsx');


// Mengambil semua data dosen
exports.getAllDataDosen = async (req, res) => {
  try {
    const dataDosen = await Data_Dosen.getAll(); // Menggunakan metode 'getAll'

    res.send({
      message: "Data Dosen sent successfully",
      data: dataDosen
    });

    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// post(data){
//   return this.models.create(data,{
//       fields:Object.keys(data)
//   })
// }

//Insert
exports.createDataDosen = async (req, res) => {
  try {
    await Data_Dosen.post(req.body);
    res.status(201).json({ msg: 'Data Dosen created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// delete(where){
//   return this.models.destroy({
//       where:where
//   })
// }

//Delete
exports.deleteDataDosen = async (req, res) => {
  try {
    const whereClause = { id: req.params.id }; // Contoh: menghapus data berdasarkan ID
    const deletedRowCount = await Data_Dosen.delete(whereClause);

    if (deletedRowCount === 0) {
      return res.status(404).json({ msg: 'Data Dosen not found' });
    }

    res.status(200).json({ msg: 'Data Dosen deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editDosen = async (req, res) => {
  try {
      const { id } = req.params; 
      const dosen = await Data_Dosen.get({
          where: { id: id },
      });

      if (!dosen) {
          return res.status(404).json({ error: 'Dosen tidak ditemukan' });
      }

      // Menangani data lainnya
      const { Nama_Dosen, Email_Dosen } = req.body;
      const filename = req.body.filename;
      dosen.Foto_Profil = filename;
      dosen.Nama_Dosen = Nama_Dosen;
      dosen.Email_Dosen = Email_Dosen;

      await dosen.save();

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Edit
exports.editDataDosen = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const newData = req.body; // Data yang akan digunakan untuk mengganti data yang ada
    const whereClause = { id }; // Kriteria untuk menentukan data yang akan diedit

    const [updatedRowCount] = await Data_Dosen.patch(newData, whereClause);

    if (updatedRowCount === 0) {
      return res.status(404).json({ msg: 'Data Dosen not found' });
    }

    res.status(200).json({ msg: 'Data Dosen updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mendapatkan satu data dosen berdasarkan ID
exports.getOneDataDosen = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const dataDosen = await Data_Dosen.get({ // Menggunakan metode 'get' dengan kriteria ID
      where: { id: id },
    });

    if (dataDosen) {
      res.send({
        message: "Data Dosen found successfully",
        data: dataDosen,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Data Dosen not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getoneDosenFormatted = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const dataDosen = await Data_Dosen.get({ // Menggunakan metode 'get' dengan kriteria ID
      where: { id: id },
    });

    const classes = await Data_Kelas.getAll();
    const currentYear = new Date().getFullYear();

    // Ubah format setiap kelas
    const dataKelas = classes.map((kelas) => {
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

    // res.send({
    //   message: "Classes sent successfully",
    //   data: formattedClasses
    // });

    if (dataDosen) {
      res.send({
        message: "Data Dosen found successfully",
        data: dataDosen,
        dataKelas: dataKelas,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Data Dosen not found" });
    }    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getDosenClass = async (req, res) => {
  try {
    const { id } = req.params;
    const dataDosen = await Data_Dosen.get({
      where: { id: id },
    });

    if (!dataDosen) {
      return res.status(404).json({ message: "Data Dosen not found" });
    }

    const dosenWali = await Data_Dosen_Wali.get({
      where: { id: dataDosen.id },
    });

    const kelas = await Data_Kelas.get({
      where: { id: id },
    });

    if (!kelas) {
      return res.status(404).json({ message: "Data Kelas not found" });
    }

    // Ambil semua mahasiswa yang memiliki ID_Kelas yang sama dengan ID kelas
    const dataMahasiswa = await Data_Mahasiswa.getAll({
      where: { ID_Kelas: kelas.id },
    });

    const currentYear = new Date().getFullYear();
    let dataKelas = await Data_Kelas.get({
      where: { ID_Dosen_Wali: dataDosen.id },
    });

    if (!Array.isArray(dataKelas)) {
      dataKelas = [dataKelas]; // Konversi objek tunggal menjadi array
    }

    // Ubah format setiap kelas
    const formattedDataKelas = dataKelas.map((kelas) => {
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
        updatedAt: kelas.updatedAt,
      };
    });
    
    // Ambil Nama_Kelas dari dataKelas pertama (jika ada)
    const dataNamaKelas = formattedDataKelas.length > 0 ? formattedDataKelas[0].Nama_Kelas : '';
    
    res.send({
      message: "Dosen and Classes found successfully",
      dataDosen: dataDosen,
      dataKelas: formattedDataKelas,
      dataWaliDosen: dosenWali,
      dataMahasiswa: dataMahasiswa,
      dataNamaKelas: dataNamaKelas, // Menambahkan dataNamaKelas ke res.send
    });

    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//edit pada getDosenClass
exports.editDosenClass = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const newData = req.body; // Data yang akan digunakan untuk mengganti data yang ada
    const whereClause = { id }; // Kriteria untuk menentukan data yang akan diedit

    const [updatedRowCountDosen] = await Data_Dosen.patch(newData, whereClause);

    if (updatedRowCountDosen === 0) {
      return res.status(404).json({ msg: 'Data Dosen not found' });
    }

    // Jika ada perubahan pada Nama_Kelas, lakukan update pada Data_Kelas
    if (newData.Nama_Kelas) {
      // Temukan ID_Kelas berdasarkan ID_Dosen_Wali
      const existingKelas = await Data_Kelas.get({
        where: { ID_Dosen_Wali: id },
      });

      if (!existingKelas) {
        return res.status(404).json({ msg: 'Data Kelas not found' });
      }

      // Update Nama_Kelas pada Data_Kelas
      const [updatedRowCountKelas] = await Data_Kelas.patch(
        { Nama_Kelas: newData.Nama_Kelas },
        { id: existingKelas.id }
      );

      if (updatedRowCountKelas === 0) {
        return res.status(500).json({ msg: 'Failed to update Data Kelas' });
      }
    }

    res.status(200).json({ msg: 'Data Dosen and Kelas updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.createDataDosenFormatted = async (req, res) => {
  try {
    // Data Dosen
    const {
      Nama_Dosen,
      NIP,
      Kode_Dosen,
      InitialID,
      Email_Dosen,
    } = req.body;

    if (!Nama_Dosen || !NIP || !Kode_Dosen || !InitialID || !Email_Dosen) {
      return res.status(400).json({ error: 'Nama Dosen, NIP, Kode Dosen, InitialID, and Email_Dosen are required' });
    }

    // Data Kelas
    const { Nama_Kelas } = req.body;

    if (!Nama_Kelas) {
      return res.status(400).json({ error: 'Nama Kelas is required' });
    }

    // Data Dosen Wali
    const { Password } = req.body;

    if (!Password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Simpan Data Dosen
    const dataDosen = await Data_Dosen.post({
      Nama_Dosen,
      NIP,
      Kode_Dosen,
      InitialID,
      Email_Dosen,
    });

    // Cari ID_Dosen
    const ID_Dosen = dataDosen.id;

    // Simpan Data Dosen Wali
    const dataDosenWali = await Data_Dosen_Wali.post({
      Password,
      ID_Dosen: ID_Dosen, // Menggunakan ID_Dosen yang ditemukan
    });

    // Simpan Data Kelas
    const dataKelas = await Data_Kelas.post({
      Nama_Kelas,
      ID_Dosen_Wali: ID_Dosen, // Menggunakan ID_Dosen yang ditemukan
    });

    if (dataDosen && dataKelas && dataDosenWali) {
      res.status(201).json({
        message: 'Data Dosen Formatted created',
        data: dataDosen,
        dataDosenWali: dataDosenWali,
        dataKelas: dataKelas,
      });
    } else {
      res.status(404).json({ message: 'Data Dosen, Data Kelas, or Data Dosen Wali not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllDataDosenFormatted = async (req, res) => {
  try {
    const dataDosen = await Data_Dosen.getAll(); // Menggunakan metode 'getAll'
    const dataDosenWali = await Data_Dosen_Wali.getAll();
    const dataKelas = await Data_Kelas.getAll();

    res.send({
      message: "Data Dosen Formatted sent successfully",
      data: dataDosen,
      dataDosenWali: dataDosenWali,
      dataKelas: dataKelas,
    });

    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllDosenExport = async (req, res) => {
  try {
    const dataDosen = await Data_Dosen.getAll();
    const dataDosenWali = await Data_Dosen_Wali.getAll();
    const dataKelas = await Data_Kelas.getAll();

    const combinedData = dataDosen.map((item, index) => {
      const correspondingWali = dataDosenWali.find((wali) => wali.ID_Dosen === item.id);
      const correspondingKelas = dataKelas.find((kelas) => kelas.ID_Dosen_Wali === item.id);

      return {
        No: index + 1, // Kolom nomor
        Nama_Dosen: item.Nama_Dosen,
        NIP: item.NIP,
        Kode_Dosen: item.Kode_Dosen,
        InitialID: item.InitialID,
        Email_Dosen: item.Email_Dosen,
        Password: correspondingWali ? correspondingWali.Password : '',
        Nama_Kelas: correspondingKelas ? correspondingKelas.Nama_Kelas : '',
      };
    });

    const dataToExport = {
      Data: combinedData,
    };

    const ws = XLSX.utils.json_to_sheet(dataToExport.Data, {
      header: ['No', 'Nama_Dosen', 'NIP', 'Kode_Dosen', 'InitialID', 'Email_Dosen', 'Password', 'Nama_Kelas'],
    });

    // Pengaturan lebar kolom
    ws['!cols'] = [
      { wch: 5 }, // Lebar kolom No
      { wch: 25 }, // Lebar kolom Nama_Dosen
      { wch: 15 }, // Lebar kolom NIP
      { wch: 15 }, // Lebar kolom Kode_Dosen
      { wch: 8 }, // Lebar kolom InitialID
      { wch: 30 }, // Lebar kolom Email_Dosen
      { wch: 20 }, // Lebar kolom Password
      { wch: 8 }, // Lebar kolom Nama_Kelas
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exported Data');

    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', 'attachment; filename=data-dosen.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.end(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getJmlDosen = async (req, res) => {
  try {
    const dataDosen = await Data_Dosen.getAll(); // Menggunakan metode 'getAll'

    res.send({
      message: "Data Dosen sent successfully",
      data: dataDosen.length
    });

    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
