'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Data_Mahasiswa', [
      {
      NIM: 221511001,
      Nama: 'Agam Andika',
      Password: await bcrypt.hash('Agam Gemblong', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'agamganteng@polban.ac.id',
      ID_Kelas: 1,
      Nama_Ortu: 'Ortu Agam',
      Nomor_Telp_Ortu: '088888888888',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511002,
      Nama: 'Aryagara Kristandy Rukaman Putra',
      Password: await bcrypt.hash('Arya Gemblong', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'aryajelek@polban.ac.id',
      ID_Kelas: 1,
      Nama_Ortu: 'Ortu Agam',
      Nomor_Telp_Ortu: '088888888888',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511003,
      Nama: 'Athalie Aurora Puspanegara',
      Password: await bcrypt.hash('Auouououo', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'athalieauououo@polban.ac.id',
      ID_Kelas: 1,
      Nama_Ortu: 'Ortu Agam',
      Nomor_Telp_Ortu: '088888888888',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511034,
      Nama: 'Adinda',
      Password: await bcrypt.hash('Adinda Wakwaw', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'adindakelasbe@polban.ac.id',
      ID_Kelas: 2,
      Nama_Ortu: 'Ortu Agam',
      Nomor_Telp_Ortu: '088888888888',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511035,
      Nama: 'Adhiya',
      Password: await bcrypt.hash('Adhiya Icikiwir', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'adhiyakelasbejuga@polban.ac.id',
      ID_Kelas: 2,
      Nama_Ortu: 'Ortu Agam',
      Nomor_Telp_Ortu: '088888888888',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511036,
      Nama: 'Afyar',
      Password: await bcrypt.hash('Afyar Blubukblubuk', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'afyarkelasbelagi@polban.ac.id',
      ID_Kelas: 2,
      Nama_Ortu: 'Ortu Agam',
      Nomor_Telp_Ortu: '088888888888',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221524036,
      Nama: 'Dinda',
      Password: await bcrypt.hash('dinda123', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'dindaaja@polban.ac.id',
      ID_Kelas: 4,
      Nama_Ortu: 'Ortu Agam',
      Nomor_Telp_Ortu: '088888888888',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221524016,
      Nama: 'Agus',
      Password: await bcrypt.hash('agus456', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'agusdoang@polban.ac.id',
      ID_Kelas: 3,
      Nama_Ortu: 'Ortu Agam',
      Nomor_Telp_Ortu: '088888888888',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Data_Mahasiswa', null, {});
  }
};