import { DataTypes } from "sequelize"
import {sequelize} from "../config/database.js"

const User = new sequelize.define("User",{
    id: { primaryKey: true, type:DataTypes.INTEGER, allowNull: false, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false }
})

export default User