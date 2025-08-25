import { body, param } from "express-validator";
import { Servers } from "../models/servers.model.js";
import { Op } from "sequelize";

export const createServerValidation = [
  body("members")
    .notEmpty()
    .withMessage("El campo members debe ser obligatorio")
    .isInt({ min: 1, max: 100 })
    .withMessage("El campo members debe ser entero"),
  body("server_name")
    .notEmpty()
    .withMessage("El campo server_name debe ser obligatorio")
    .isString()
    .isLength({ min: 2, max: 30 })
    .custom(async (value) => {
      const serverExists = await Servers.findOne({
        where: { server_name: value },
      });
      if (serverExists) {
        throw new Error("Ese server ya existe");
      }
      return true;
    }),
  body("levels")
    .notEmpty()
    .withMessage("El campo levels debe ser obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo levels debe ser un entero"),
];

export const updateServerValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero")
    .custom(async (value) => {
      const server = await Servers.findByPk(value);
      if (!server) {
        throw new Error("El server no existe");
      }
    }),
  body("members")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("El campo members debe ser un entero"),
  body("server_name")
    .optional()
    .isString()
    .isLength({ min: 2, max: 30 })
    .withMessage("El campo server_name debe ser de 2 a 30 caracteres")
    .custom(async (value) => {
      const serverExists = await Servers.findOne({
        where: { server_name: value, id: { [Op.ne]: req.params.id } },
      });
      if (serverExists) {
        throw new Error("Ese server ya existe");
      }
      return true;
    }),
  body("levels")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El campo levels debe ser un entero"),
];

export const getServerIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const server = await Servers.findByPk(value);
      if (!server) {
        throw new Error("El server no existe");
      }
    }),
];

export const deleteServerValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const server = await Servers.findByPk(value);
      if (!server) {
        throw new Error("El server no existe");
      }
    }),
];
