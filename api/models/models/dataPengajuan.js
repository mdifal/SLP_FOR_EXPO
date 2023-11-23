'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Pengajuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Data_Pengajuan.belongsTo(models.Jadwal_Kelas, {
      //   foreignKey: 'ID_Jadwal_Kelas'
      // });
      // Data_Pengajuan.belongsTo(models.Mahasiswa, {
      //   foreignKey: 'ID_Mahasiswa'
      // });
    }
  }
  Data_Pengajuan.init({
    ID_Mahasiswa: DataTypes.INTEGER,
    Keterangan: DataTypes.TEXT,
    Jenis_Izin: DataTypes.ENUM('Sakit', 'Izin'),
    ID_Jadwal_Kelas: DataTypes.INTEGER,
    Tanggal_Pengajuan: DataTypes.DATE,
    Tanggal_Izin: DataTypes.DATE,
    File_Pengajuan: DataTypes.STRING,
    Status_Pengajuan: DataTypes.ENUM('Delivered', 'On Progress', 'Accepted', 'Rejected'),
    Alasan_Penolakan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Data_Pengajuan',
    freezeTableName: true
  });
  return Data_Pengajuan;
};