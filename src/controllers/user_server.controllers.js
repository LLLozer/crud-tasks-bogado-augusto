import { UserServer } from "../models/user_server.model.js";
import { User } from "../models/user.model.js";
import { Servers } from "../models/servers.model.js";

export const getAll = async (req, res) => {
  const getAllStuff = await UserServer.findAll();
  res.status(200).json(getAllStuff);
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
