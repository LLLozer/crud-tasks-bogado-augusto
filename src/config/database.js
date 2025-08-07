import { Sequelize } from "sequelize"
import dotenv from "dotenv"
dotenv.config()

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
    )

export const DBStart = async () => {
        try {
            await sequelize.authenticate()
            console.log("Conexión exitosa a MySQL")
            await sequelize.sync()
        } catch (error) {
            console.log("Error al conectar con MySQL")
        }
    }