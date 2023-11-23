'use strict';

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
    await queryInterface.bulkInsert('Jadwal_Kelas', [{
      Hari_Jadwal: 'Senin',
      ID_Jam_Pelajaran_Start: 1,
      ID_Jam_Pelajaran_End: 2,
      ID_Matkul: 1,
      ID_Dosen: 1,
      ID_Kelas: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Hari_Jadwal: 'Selasa',
      ID_Jam_Pelajaran_Start: 3,
      ID_Jam_Pelajaran_End: 4,
      ID_Matkul: 2,
      ID_Dosen: 2,
      ID_Kelas: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Hari_Jadwal: 'Rabu',
      ID_Jam_Pelajaran_Start: 5,
      ID_Jam_Pelajaran_End: 6,
      ID_Matkul: 3,
      ID_Dosen: 3,
      ID_Kelas: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Hari_Jadwal: 'Kamis',
      ID_Jam_Pelajaran_Start: 7,
      ID_Jam_Pelajaran_End: 8,
      ID_Matkul: 4,
      ID_Dosen: 4,
      ID_Kelas: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Jadwal_Kelas', null, {})
  }
};