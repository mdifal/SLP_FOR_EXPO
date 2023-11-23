'use strict';
const { Model, where } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jadwal_Kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Jadwal_Kelas.belongsTo(models.Data_Jam_Pelajaran, {
      //   foreignKey: 'ID_Jam_Pelajaran',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
      // Jadwal_Kelas.belongsTo(models.Data_Matkul, {
      //   foreignKey: 'ID_Matkul',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
      // Jadwal_Kelas.belongsTo(models.Data_Dosen, {
      //   foreignKey: 'ID_Dosen',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
      // Jadwal_Kelas.belongsTo(models.Data_Kelas, {
      //   foreignKey: 'ID_Kelas',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
    }
  }

  Jadwal_Kelas.init({
    Hari_Jadwal: DataTypes.STRING,
    ID_Jam_Pelajaran_Start: DataTypes.INTEGER,
    ID_Jam_Pelajaran_End: DataTypes.INTEGER,
    ID_Matkul: DataTypes.INTEGER,
    ID_Dosen: DataTypes.INTEGER,
    ID_Kelas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jadwal_Kelas',
    freezeTableName: true
  });

  return Jadwal_Kelas;
};