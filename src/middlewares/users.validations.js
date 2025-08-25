import { body, param } from "express-validator";
import { User } from "../models/user.model.js";
import { Op } from "sequelize";

export const createUserValidation = [
  body("name")
    .notEmpty()
    .withMessage("El campo name debe ser obligatorio")
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("El campo email debe ser obligatorio")
    .isString()
    .isLength({ min: 8, max: 100 })
    .custom(async (value) => {
      const userExists = await User.findOne({
        where: { email: value },
      });
      if (userExists) {
        throw new Error("Ese usuario ya existe");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("El campo password debe ser obligatorio")
    .isString()
    .isLength({ min: 5, max: 100 }),
  body("account_id")
    .notEmpty()
    .withMessage("El campo account_id debe ser obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo account_id debe ser un entero"),
];

export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
  body("name")
    .optional()
    .isString()
    .withMessage("El campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 100 })
    .withMessage("El name debe ser entre 2 y 100 caracteres"),
  body("email")
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("El campo email debe ser de 2 a 100 caracteres")
    .custom(async (value, {req} ) => {
      const userExists = await User.findOne({
        where: { email: value, id: { [Op.ne]: req.params.id } },
      });
      if (userExists) {
        throw new Error("Ese usuario ya existe");
      }
      return true;
    }),
  body("password")
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("El campo password debe ser de 2 a 100 caracteres"),
];

export const getUserIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
];

export const deleteUserValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El usuario no existe");
      }
    }),
];
