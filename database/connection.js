const { Sequelize } = require("sequelize");
require("dotenv").config();

const database = process.env.DATABASE;
const root = process.env.USER_NAME;
const pass = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;


// Set up Sequelize with MySQL database connection
const sequelize = new Sequelize(database, root, pass, {
    host: host,
    dialect: dialect,
  });

  module.exports = sequelize;