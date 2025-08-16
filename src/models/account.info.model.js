import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Account_Info = sequelize.define(
  "Account_Info",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
