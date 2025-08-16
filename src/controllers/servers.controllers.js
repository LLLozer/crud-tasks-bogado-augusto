import { Servers } from "../models/servers.model.js";

export const create_server = async (req, res) => {
  const { members, server_name, levels } = req.body;
  try {
    const server_exists = await Servers.findOne({
      where: { server_name: server_name },
    });
    if (server_exists) {
      return res.status(400).json({
        message: "Error: Ese server ya existe",
        error: "Bad request",
        statusCode: 400,
      });
    }
    if (members > 100) {
      return res.status(400).json({
        message: "Error: No pueden haber más de 100 miembros",
        error: "Bad request",
        statusCode: 400,
      });
    }
    if (!members || !server_name || !levels) {
      return res.status(400).json({
        message: "Error: Algunos campos están vacíos",
        error: "Bad request",
        status: 400,
      });
    }
    const create_new_server = await Servers.create(req.body);
    res.status(200).json(create_new_server);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const find_all_servers = async (req, res) => {
  const findAll = await Servers.findAll();
  res.status(200).json(findAll);
};

export const find_server_by_id = async (req, res) => {
  const server_id = parseInt(req.params.id);
  try {
    if (isNaN(server_id)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número",
        error: "Bad request",
        status: 400,
      });
    }
    const find_id = await Servers.findByPk(server_id);
    if (!find_id) {
      return res.status(404).json({
        message: "Error: Ese ID no se ha encontrado",
        error: "Not found",
        status: 404,
      });
    }
    res.status(200).json(findID);
  } catch (error) {
    return res.status(500).json("Error: No se pudo encontrar el ID");
  }
};
