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
    await queryInterface.bulkInsert('Data_Pengajuan', [
      {
      ID_Mahasiswa: 1,
      Keterangan: 'Sakit',
      Jenis_Izin: 'Sakit',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ID_Mahasiswa: 2,
      Keterangan: 'Izin',
      Jenis_Izin: 'Izin',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file2.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ID_Mahasiswa: 3,
      Keterangan: 'Sakit Hati',
      Jenis_Izin: 'Sakit',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file3.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ID_Mahasiswa: 4,
      Keterangan: 'Izin Off',
      Jenis_Izin: 'Izin',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file4.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ID_Mahasiswa: 7,
      Keterangan: 'Izin aja',
      Jenis_Izin: 'Izin',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file4.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ID_Mahasiswa: 7,
      Keterangan: 'sakit aja',
      Jenis_Izin: 'Sakit',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file5.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ID_Mahasiswa: 7,
      Keterangan: 'sakit terus',
      Jenis_Izin: 'Sakit',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file5.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ID_Mahasiswa: 8,
      Keterangan: 'sakit aja',
      Jenis_Izin: 'Sakit',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file5.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ID_Mahasiswa: 8,
      Keterangan: 'sakit terus',
      Jenis_Izin: 'Sakit',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file5.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ID_Mahasiswa: 8,
      Keterangan: 'Izin aja',
      Jenis_Izin: 'Izin',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file4.pdf',
      Status_Pengajuan: 'Delivered',
      Alasan_Penolakan: '-',
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
    await queryInterface.bulkDelete('Data_Pengajuan', null, {})
  }
};
