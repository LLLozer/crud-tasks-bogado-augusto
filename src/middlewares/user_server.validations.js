import { body, param } from "express-validator";
import { UserServer } from "../models/user_server.model.js";

export const createUserServerValidation = [
  body("user_id")
    .notEmpty()
    .withMessage("El campo user_id debe ser obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo user_id debe ser un número entero positivo"),
  body("server_id")
    .notEmpty()
    .withMessage("El campo server_id debe ser obligatorio")
    .isInt({ min: 1 })
    .withMessage("El campo server_id debe ser un número entero positivo"),
];

export const updateUserServerValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero")
    .custom(async (value) => {
      const findRegister = await UserServer.findByPk(value);
      if (!findRegister) {
        throw new Error("El campo no existe");
      }
    }),
  body("user_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El campo user_id debe ser un número entero positivo"),
  body("server_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El campo server_id debe ser un número entero positivo"),
];

export const getUserServerIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const findRegister = await UserServer.findByPk(value);
      if (!findRegister) {
        throw new Error("El campo no existe");
      }
    }),
];

export const deleteUserServerValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const findRegister = await UserServer.findByPk(value);
      if (!findRegister) {
        throw new Error("El campo no existe");
      }
    }),
];
