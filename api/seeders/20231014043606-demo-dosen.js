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
    await queryInterface.bulkInsert('Data_Dosen', [{
      Nama_Dosen: 'Dr. Agam Gemblong',
      NIP: '111111111',
      Kode_Dosen: 'KO001A',
      InitialID: 'AG',
      Email_Dosen: 'dragamgemblong@polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Drs. Fauza Ngiknguk',
      NIP: '222222222',
      Kode_Dosen: 'KO001B',
      InitialID: 'FN',
      Email_Dosen: 'drsfauzangiknguk@polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Dr. Difa Batujajar',
      NIP: '333333333',
      Kode_Dosen: 'KO001C',
      InitialID: 'DB',
      Email_Dosen: 'drdifabatujajar@polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Drs. Nisrina Gak Mau Tau',
      NIP: '444444444',
      Kode_Dosen: 'KO001D',
      InitialID: 'NS',
      Email_Dosen: 'dragamgemblong@polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Dr. Jacky Lucu Banget',
      NIP: '555555555',
      Kode_Dosen: 'KO001E',
      InitialID: 'JL',
      Email_Dosen: 'drjackylucubanget@polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Drs. Aul Sariasih',
      NIP: '666666666',
      Kode_Dosen: 'KO001F',
      InitialID: 'AS',
      Email_Dosen: 'drsaulsariasih@polban.ac.id',
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
    await queryInterface.bulkDelete('Data_Dosen', null, {})
  }
};