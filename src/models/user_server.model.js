import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "../models/user.model.js";
import { Servers } from "../models/servers.model.js";

export const UserServer = sequelize.define(
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
    timestamps: true,
    paranoid: true,
  }
);

User.belongsToMany(Servers, {
  through: UserServer,
  foreignKey: "user_id",
  as: "servers",
});

Servers.belongsToMany(User, {
  through: UserServer,
  foreignKey: "server_id",
  as: "users",
});

UserServer.belongsTo(Servers, { foreignKey: "server_id", as: "servers" });
UserServer.belongsTo(User, { foreignKey: "user_id", as: "users" });
