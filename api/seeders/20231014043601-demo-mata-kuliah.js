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
    await queryInterface.bulkInsert('Data_Mata_Kuliah', [{
      Nama_Mata_Kuliah: 'Basis Data',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Pemrograman Web',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Pemrograman Berorientasi Objek',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Algoritma',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Matematika Diskrit',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Bahasa Inggris',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Bahasa Indonesia',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Sistem Operasi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Manajemen Proyek',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Kewirausahaan',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Mata_Kuliah: 'Bahasa Jerman',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Data_Mata_Kuliah', null, {});
  }
};
