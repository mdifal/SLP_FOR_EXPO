// api/models/associations/associatejs

'use strict';

module.exports = (models) => {
  const {
    Data_Dosen,
    Data_Dosen_Wali,
    Data_Jam_Pelajaran,
    Data_Kelas,
    Data_Mahasiswa,
    Data_Mata_Kuliah,
    Data_Pengajuan,
    Jadwal_Kelas
  } = models;

  // Define your associations here
  Data_Dosen.hasOne(Data_Dosen_Wali, {
    foreignKey: 'ID_Dosen',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });

  Data_Dosen_Wali.belongsTo(Data_Dosen, {
    foreignKey: 'ID_Dosen',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Data_Jam_Pelajaran.hasMany(Jadwal_Kelas, {
    foreignKey: 'ID_Jam_Pelajaran_Start',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Data_Jam_Pelajaran.hasMany(Jadwal_Kelas, {
    foreignKey: 'ID_Jam_Pelajaran_End',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Data_Kelas.hasMany(Data_Mahasiswa, {
    foreignKey: 'ID_Kelas',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });

  Data_Mahasiswa.belongsTo(Data_Kelas, {
    foreignKey: 'ID_Kelas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Data_Mata_Kuliah.hasMany(Jadwal_Kelas, {
    foreignKey: 'ID_Matkul'
  });

  
  Data_Kelas.hasMany(Jadwal_Kelas, {
    foreignKey: 'ID_Kelas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Data_Pengajuan.belongsTo(Jadwal_Kelas, {
    foreignKey: 'ID_Jadwal_Kelas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Data_Pengajuan.belongsTo(Data_Mahasiswa, {
    foreignKey: 'ID_Mahasiswa'
  });

  Data_Mahasiswa.hasMany(Data_Pengajuan, {
    foreignKey: 'ID_Mahasiswa',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  Jadwal_Kelas.hasMany(Data_Pengajuan, {
    foreignKey: 'ID_Jadwal_Kelas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })

  Jadwal_Kelas.belongsTo(Data_Jam_Pelajaran, {
    foreignKey: 'ID_Jam_Pelajaran_Start',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Jadwal_Kelas.belongsTo(Data_Jam_Pelajaran, {
    foreignKey: 'ID_Jam_Pelajaran_End',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Jadwal_Kelas.belongsTo(Data_Mata_Kuliah, {
    foreignKey: 'ID_Matkul',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Jadwal_Kelas.belongsTo(Data_Dosen, {
    foreignKey: 'ID_Dosen',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Jadwal_Kelas.belongsTo(Data_Kelas, {
    foreignKey: 'ID_Kelas',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // Data_Kelas.hasOne(Data_Dosen_Wali, {
  //   foreignKey: 'ID_Dosen_Wali',
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })

  // Data_Dosen_Wali.belongsTo(Data_Kelas, {
  //   foreignKey: 'ID_Dosen_Wali',
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // });

  // Define other associations here if needed
};
