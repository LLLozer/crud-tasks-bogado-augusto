import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const User_Server = sequelize.define(
  "User_Server",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);
