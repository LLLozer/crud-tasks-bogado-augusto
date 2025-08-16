import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Servers = sequelize.define("Servers", 
  {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  members: {
    type: DataTypes.INTEGER(100),
    allowNull: false,
  },
  server_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  levels: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
},
  {
    timestamps: false,
  }
);
