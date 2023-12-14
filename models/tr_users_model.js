const { DataTypes } = require("sequelize");
const sequelize = require("./../database/connection");
const { v4: uuidv4 } = require("uuid");

const Tr_Users = sequelize.define(
    "tr_users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      client_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      client_data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      modified_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "tr_users",
      freezeTableName: true,
    }
  );

  module.exports = Tr_Users;