import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "../models/user.model.js";
import { Servers } from "../models/servers.model.js";

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

User.belongsToMany(Servers, {
  through: User_Server,
  foreignKey: user_id,
  as: "servers",
});

Servers.belongsToMany(User, {
  through: User_Server,
  foreignKey: server_id,
  as: "users",
});
