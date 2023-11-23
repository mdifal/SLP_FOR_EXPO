'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Data_Pengajuan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID_Mahasiswa: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Data_Mahasiswa',
          key: 'id',
          as: 'ID_Mahasiswa'
        }
      },
      Keterangan: {
        type: Sequelize.TEXT
      },
      Jenis_Izin: {
        type: Sequelize.ENUM('Sakit', 'Izin'),
      },
      ID_Jadwal_Kelas: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Jadwal_Kelas',
          key: 'id',
          as: 'ID_Jadwal_Kelas'
        }
      },
      Tanggal_Pengajuan: {
        type: Sequelize.DATE
      },
      Tanggal_Izin: {
        type: Sequelize.DATE
      },
      File_Pengajuan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Status_Pengajuan: {
        type: Sequelize.ENUM('Delivered', 'On Progress', 'Accepted', 'Rejected'),
      },
      Alasan_Penolakan: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Data_Pengajuan');
  }
};