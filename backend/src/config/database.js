require('dotenv').config();

const { Sequelize } = require('sequelize');

// Conectar ao banco de dados MySQL
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
