import { UserServer } from "../models/user_server.model.js";
import { User } from "../models/user.model.js";
import { Servers } from "../models/servers.model.js";

export const getAll = async (req, res) => {
  try {
    const getAllStuff = await UserServer.findAll({
      include: [
        {
          model: User,
          as: "users",
        },
        {
          model: Servers,
          as: "servers",
        },
      ],
    });
    res.status(200).json(getAllStuff);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

export const getById = async (req, res) => {
  const userServerId = parseInt(req.params.id);
  try {
    if (isNaN(userServerId)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número",
        error: "Bad request",
        status: 400,
      });
    }
    const findId = await UserServer.findByPk(userServerId);
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

export const createNewUserServer = async (req, res) => {
  const { user_id, server_id } = req.body;
  try {
    if (!user_id || !server_id) {
      return res.status(400).json({
        message: "Error: Algunos campos están vacíos",
        error: "Bad request",
        status: 400,
      });
    }
    const createNew = await UserServer.create(req.body);
    res.status(200).json(createNew);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUserServer = async (req, res) => {
  const userServerId = parseInt(req.params.id);
  const { user_id, server_id } = req.body;
  if (!user_id || !server_id) {
    return res.status(400).json({
      message: "Error: Algunos campos están vacíos",
      error: "Bad request",
      status: 400,
    });
  }
  if (isNaN(userServerId)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    const findId = await UserServer.findByPk(userServerId);
    if (!findId) {
      return res.status(404).json({
        message: "Error: Ese ID no existe",
        error: "Not found",
        status: 404,
      });
    }
    await findId.update({ server_id, user_id });
    res.status(200).json("Datos actualizados");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al actualizar los datos",
      error: "Internal server error",
      status: 500,
    });
  }
};

export const deleteUserServer = async (req, res) => {
  const userServerId = parseInt(req.params.id);
  const findId = await UserServer.findByPk(userServerId);
  if (isNaN(userServerId)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    if (!findId) {
      return res.status(404).json({
        message: "Error: Ese ID no existe",
        error: "Not found",
        status: 404,
      });
    }
    const deleteUsSv = await findId.destroy();
    res.status(200).json("Datos eliminados");
  } catch (error) {
    return res(500).json({
      message: "Error: Error al eliminar el usuario",
      error: "Internal server error",
      status: 500,
    });
  }
};
