'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jadwal_Kelas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Hari_Jadwal: {
        type: Sequelize.STRING
      },
      ID_Jam_Pelajaran_Start: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Data_Jam_Pelajaran',
          key: 'id',
          as: 'ID_Jam_Pelajaran_Start',
        }
      },
      ID_Jam_Pelajaran_End: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Data_Jam_Pelajaran',
          key: 'id',
          as: 'ID_Jam_Pelajaran_End',
        }
      },
      ID_Matkul: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Data_Mata_Kuliah',
          key: 'id',
          as: 'ID_Matkul',
        }
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
      ID_Kelas: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Data_Kelas',
          key: 'id',
          as: 'ID_Kelas',
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
    await queryInterface.dropTable('Jadwal_Kelas');
  }
};