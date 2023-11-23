'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Data_Dosen_Wali', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // Nama_Dosen: {
      //   type: Sequelize.STRING
      // },
      // Email_Dosen: {
      //   type: Sequelize.STRING
      // },
      Password: {
        type: Sequelize.STRING
      },
      ID_Dosen: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Data_Dosen',
          key: 'id',
          as: 'ID_Dosen',
        }

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
    await queryInterface.dropTable('Data_Dosen_Wali');
  }
};