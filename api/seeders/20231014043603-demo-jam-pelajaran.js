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
    await queryInterface.bulkInsert('Data_Jam_Pelajaran', [{
      Jam_Ke: 1,
      Waktu_Mulai: '07:00:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Jam_Ke: 2,
      Waktu_Mulai: '07:50:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Jam_Ke: 3,
      Waktu_Mulai: '08:40:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Jam_Ke: 4,
      Waktu_Mulai: '09:50:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Jam_Ke: 5,
      Waktu_Mulai: '10:40:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Jam_Ke: 6,
      Waktu_Mulai: '11:30:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Jam_Ke: 7,
      Waktu_Mulai: '13:00:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Jam_Ke: 8,
      Waktu_Mulai: '13:50:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Jam_Ke: 9,
      Waktu_Mulai: '14:40:00',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Jam_Ke: 10,
      Waktu_Mulai: '15:50:00',
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
    await queryInterface.bulkDelete('Data_Jam_Pelajaran', null, {});
  }
};