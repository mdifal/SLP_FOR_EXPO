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
    await queryInterface.bulkInsert('Data_Dosen_Wali', [{
      Password: await bcrypt.hash('Agam Gemblong', 10),
      ID_Dosen: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Password: await bcrypt.hash('Fauza Ngiknguk', 10),
      ID_Dosen: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Password: await bcrypt.hash('Difa Batujajar', 10),
      ID_Dosen: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Password: await bcrypt.hash('Nisrina Gak Mau Tau', 10),
      ID_Dosen: 4,
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
    await queryInterface.bulkDelete('Data_Dosen_Wali', null, {})
  }
};
