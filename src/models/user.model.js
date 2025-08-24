import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { AccountInfo } from "../models/account.info.model.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

User.belongsTo(AccountInfo, { foreignKey: "account_id", as: "account", onDelete: "CASCADE" });
AccountInfo.hasOne(User, { foreignKey: "account_id", onDelete: "CASCADE" });
