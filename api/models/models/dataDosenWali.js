'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Dosen_Wali extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Data_Dosen_Wali.belongsTo(models.Data_Dosen, {
      //   foreignKey: 'ID_Dosen',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
    }
  }
  Data_Dosen_Wali.init({
    // Nama_Dosen: DataTypes.STRING,
    // Email_Dosen: DataTypes.STRING,
    Password: DataTypes.STRING,
    ID_Dosen: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Data_Dosen_Wali',
    freezeTableName: true
  });
  return Data_Dosen_Wali;
};