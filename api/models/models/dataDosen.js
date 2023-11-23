'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Dosen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Data_Dosen.hasOne(models.Data_Dosen_Wali, {
      //   foreignKey: 'ID_Dosen'
      // });
    }
  }
  Data_Dosen.init({
    Nama_Dosen: DataTypes.STRING,
    NIP: DataTypes.STRING,
    Kode_Dosen: DataTypes.CHAR(6),
    InitialID: DataTypes.CHAR(2),
    Email_Dosen: DataTypes.STRING,
    Foto_Profil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Data_Dosen',
    freezeTableName: true
  });
  return Data_Dosen;
};