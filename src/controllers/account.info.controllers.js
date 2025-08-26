import { AccountInfo } from "../models/account.info.model.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import { matchedData } from "express-validator";

export const createAccount = async (req, res) => {
  const { first_name, last_name, dni } = req.body;
  try {
    const accountExists = await AccountInfo.findOne({ where: { dni: dni } });
    if (accountExists) {
      return res.status(400).json({
        message: "Error: Esa cuenta ya existe",
        error: "Bad request",
        statusCode: 400,
      });
    }
    const dniLength = await dni.length;
    if (dniLength > 8) {
      return res.status(400).json({
        message: "Error: El DNI no puede superar los 8 dígitos",
        error: "Bad request",
        statusCode: 400,
      });
    }
    if (!first_name || !last_name || !dni) {
      return res.status(400).json({
        message: "Error: Algunos campos están vacíos",
        error: "Bad request",
        status: 400,
      });
    }
    const validatedData = matchedData(req, { locations: ["body"] });
    console.log("Los datos validados son:", validatedData);
    const createNewAccount = await AccountInfo.create(req.body);
    res.status(200).json(createNewAccount);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const findAllAccounts = async (req, res) => {
  const findAll = await AccountInfo.findAll({
    include: [
      {
        model: User,
        include: [
          {
            model: Task,
            as: "tasks",
          },
        ],
      },
    ],
  });
  res.status(200).json(findAll);
};

export const findAccById = async (req, res) => {
  const accId = parseInt(req.params.id);
  try {
    if (isNaN(accId)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número",
        error: "Bad request",
        status: 400,
      });
    }
    const findId = await AccountInfo.findByPk(accId, {
      include: [
        {
          model: User,
          include: [
            {
              model: Task,
              as: "tasks",
            },
          ],
        },
      ],
    });
    if (!findId) {
      return res.status(404).json({
        message: "Error: Ese ID no se ha encontrado",
        error: "Not found",
        status: 404,
      });
    }
    res.status(200).json(findId);
  } catch (error) {
    return res.status(500).json("Error: No se pudo encontrar el ID");
  }
};

export const updateAccount = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { first_name, last_name, dni } = req.body;
  const dniLength = await dni.length;
  if (dniLength > 8) {
    return res.status(400).json({
      message: "Error: El DNI no puede superar los 8 dígitos",
      error: "Bad request",
      status: 400,
    });
  }
  if (!first_name || !last_name || !dni) {
    return res.status(400).json({
      message: "Error: Algunos campos están vacíos",
      error: "Bad request",
      status: 400,
    });
  }
  if (isNaN(userId)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    const findId = await AccountInfo.findByPk(userId);
    if (!findId) {
      return res.status(404).json({
        message: "Error: Ese ID no existe",
        error: "Not found",
        status: 404,
      });
    }
    const validatedData = matchedData(req, { locations: ["body"] });
    console.log("Los datos validados son:", validatedData);
    await findId.update({ first_name, last_name, dni });
    res.status(200).json("Datos actualizados");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al actualizar la cuenta",
      error: "Internal server error",
      status: 500,
    });
  }
};

export const deleteAcc = async (req, res) => {
  const accId = parseInt(req.params.id);
  const findId = await AccountInfo.findByPk(accId);
  if (isNaN(accId)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    if (!findId) {
      return res.status(404).json({
        message: "Error: Esa cuenta no existe",
        error: "Not found",
        status: 404,
      });
    }
    const deleteInfo = await findId.destroy();
    res.status(200).json("Cuenta eliminada");
  } catch (error) {
    return res(500).json({
      message: "Error: Error al eliminar la cuenta",
      error: "Internal server error",
      status: 500,
    });
  }
};
