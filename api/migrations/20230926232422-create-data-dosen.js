'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Data_Dosen', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nama_Dosen: {
        type: Sequelize.STRING
      },
      NIP: {
        type: Sequelize.STRING
      },
      Kode_Dosen: {
        type: Sequelize.CHAR(6)
      },
      InitialID: {
        type: Sequelize.CHAR(2)
      },
      Email_Dosen: {
        type: Sequelize.STRING
      },
      Foto_Profil: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Data_Dosen');
  }
};