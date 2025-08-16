import { Account_Info } from "../models/account.info.model.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

export const create_account = async (req, res) => {
  const { first_name, last_name, dni } = req.body;
  try {
    const account_exists = await Account_Info.findOne({ where: { dni: dni } });
    if (account_exists) {
      return res.status(400).json({
        message: "Error: Esa cuenta ya existe",
        error: "Bad request",
        statusCode: 400,
      });
    }
    const dni_length = await dni.length;
    if (dni_length > 8) {
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
    const create_new_account = await Account_Info.create(req.body);
    res.status(200).json(create_new_account);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const find_all_acounts = async (req, res) => {
  const findAll = await Account_Info.findAll({
    include: [
      {
        model: User,
        include: [
          {
            model: Task,
            as: "tasks",
          },
        ]
      },
    ],
  });
  res.status(200).json(findAll);
};

export const find_acc_by_id = async (req, res) => {
  const acc_id = parseInt(req.params.id);
  try {
    if (isNaN(acc_id)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número",
        error: "Bad request",
        status: 400,
      });
    }
    const find_id = await Account_Info.findByPk(acc_id, {
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
    if (!find_id) {
      return res.status(404).json({
        message: "Error: Ese ID no se ha encontrado",
        error: "Not found",
        status: 404,
      });
    }
    res.status(200).json(find_id);
  } catch (error) {
    return res.status(500).json("Error: No se pudo encontrar el ID");
  }
};

export const update_account = async (req, res) => {
  const user_id = parseInt(req.params.id);
  const { first_name, last_name, dni } = req.body;
  const dni_length = await dni.length;
  if (dni_length > 8) {
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
  if (isNaN(user_id)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    const find_id = await Account_Info.findByPk(user_id);
    if (!find_id) {
      return res.status(404).json({
        message: "Error: Ese ID no existe",
        error: "Not found",
        status: 404,
      });
    }
    await find_id.update({ first_name, last_name, dni });
    res.status(200).json("Datos actualizados");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al actualizar la cuenta",
      error: "Internal server error",
      status: 500,
    });
  }
};

export const delete_acc = async (req, res) => {
  const acc_id = parseInt(req.params.id);
  const find_id = await Account_Info.findByPk(acc_id);
  if (isNaN(acc_id)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    if (!find_id) {
      return res.status(404).json({
        message: "Error: Esa cuenta no existe",
        error: "Not found",
        status: 404,
      });
    }
    const delete_info = await find_id.destroy();
    res.status(200).json("Cuenta eliminada");
  } catch (error) {
    return res(500).json({
      message: "Error: Error al eliminar la cuenta",
      error: "Internal server error",
      status: 500,
    });
  }
};
