import { body, param } from "express-validator";
import { AccountInfo } from "../models/account.info.model.js";
import { Op } from "sequelize";

export const createAccValidation = [
  body("first_name")
    .notEmpty()
    .withMessage("El campo first_name debe ser obligatorio")
    .isString()
    .isLength({ min: 2, max: 15 })
    .withMessage("El first_name debe ser entre 2 y 15 caracteres"),
  body("last_name")
    .notEmpty()
    .withMessage("El campo last_name debe ser obligatorio")
    .isString()
    .isLength({ min: 2, max: 15 })
    .withMessage(
      "El campo last_name debe ser obligatorio y de 2 a 15 caracteres de longitud"
    ),
  body("dni")
    .notEmpty()
    .withMessage("El campo dni debe ser obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo DNI debe ser un numero entero positivo")
    .custom((value) => {
      if (value.toString().length < 8) {
        throw new Error("El campo DNI debe tener al menos 8 digitos");
      }
      return true;
    })
    .custom(async (value) => {
      const accountExists = await AccountInfo.findOne({
        where: { dni: value },
      });
      if (accountExists) {
        throw new Error("Ese DNI ya existe");
      }
      return true;
    }),
];

export const updateAccValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero")
    .custom(async (value) => {
      const account = await AccountInfo.findByPk(value);
      if (!account) {
        throw new Error("La cuenta no existe");
      }
    }),
  body("first_name")
    .optional()
    .isString()
    .withMessage("El campo first_name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 15 })
    .withMessage("El first_name debe ser entre 2 y 15 caracteres"),
  body("last_name")
    .optional()
    .isLength({ min: 2, max: 15 })
    .withMessage(
      "El campo last_name debe ser obligatorio y de 2 a 15 caracteres de longitud"
    ),
  body("dni")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El campo DNI debe ser un numero entero positivo")
    .custom((value) => {
      if (value.toString().length < 8) {
        throw new Error("El campo DNI debe tener al menos 8 digitos");
      }
      return true;
    })
    .custom(async (value) => {
      const accountExists = await AccountInfo.findOne({
        where: { dni: value, id: { [Op.ne]: req.params.id } },
      });
      if (accountExists) {
        throw new Error("Ese DNI ya existe");
      }
      return true;
    }),
];

export const getAccIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const account = await AccountInfo.findByPk(value);
      if (!account) {
        throw new Error("La cuenta no existe");
      }
    }),
];

export const deleteAccValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const account = await AccountInfo.findByPk(value);
      if (!account) {
        throw new Error("La cuenta no existe");
      }
    }),
];
