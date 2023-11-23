'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Data_Mahasiswa.belongsTo(models.Data_Kelas, {
      //   foreignKey: 'ID_Kelas',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
    }
  }
  Data_Mahasiswa.init({
    NIM: DataTypes.INTEGER,
    Nama: DataTypes.STRING,
    Password: DataTypes.STRING,
    Nomor_Telp: DataTypes.STRING,
    Email: DataTypes.STRING,
    ID_Kelas: DataTypes.INTEGER,
    Nama_Ortu: DataTypes.STRING,
    Nomor_Telp_Ortu: DataTypes.STRING,
    Foto_Profil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Data_Mahasiswa',
    freezeTableName: true
  });
  return Data_Mahasiswa;
};