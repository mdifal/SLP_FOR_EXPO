const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'postgres',
  logging: false, // Disable logging SQL queries to the console
});

module.exports = sequelize;
