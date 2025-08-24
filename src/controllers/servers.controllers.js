import { Servers } from "../models/servers.model.js";

export const createServer = async (req, res) => {
  const { members, server_name, levels } = req.body;
  try {
    const serverExists = await Servers.findOne({
      where: { server_name: server_name },
    });
    if (serverExists) {
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
    const createNewServer = await Servers.create(req.body);
    res.status(200).json(createNewServer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const findAllServers = async (req, res) => {
  const findAll = await Servers.findAll();
  res.status(200).json(findAll);
};

export const findServerById = async (req, res) => {
  const serverId = parseInt(req.params.id);
  try {
    if (isNaN(serverId)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número",
        error: "Bad request",
        status: 400,
      });
    }
    const findID = await Servers.findByPk(serverId);
    if (!findID) {
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

export const updateServer = async (req, res) => {
  const serverID = parseInt(req.params.id);
  const { members, server_name, levels } = req.body;
  const serverNameLength = await server_name.length;
  if (serverNameLength > 30) {
    return res.status(400).json({
      message:
        "Error: El nombre del servidor no puede superar los 30 caracteres",
      error: "Bad request",
      statusCode: 400,
    });
  }
  if (isNaN(serverID)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número.",
      error: "Bad Request",
      statusCode: 400,
    });
  }
  if (!members && !server_name) {
    return res.status(400).json({
      message: "Error: Algunos campos están vacíos.",
      error: "Bad request",
      statusCode: 400,
    });
  }
  try {
    const findID = await Servers.findByPk(serverID);
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese ID no existe.",
        error: "Bad request",
        statusCode: 404,
      });
    }
    const checkIfServerExists = await Servers.findOne({
      where: { server_name: server_name },
    });
    if (checkIfServerExists) {
      return res.status(400).json({
        message: "Error: Ese server ya existe",
        error: "Bad request",
        statusCode: 400,
      });
    }
    await findID.update({ server_name, members, levels });
    res.status(200).json("Datos actualizados");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al actualizar los datos.",
      error: "Internal server error",
      statusCode: 500,
    });
  }
};

export const deleteServer = async (req, res) => {
  const serverID = parseInt(req.params.id);
  if (isNaN(serverID)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número.",
      error: "Bad Request",
      statusCode: 400,
    });
  }
  try {
    const findID = await Servers.findByPk(serverID);
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese ID no existe.",
        error: "Bad request",
        statusCode: 404,
      });
    }
    const deleteSv = await findID.destroy();
    res.status(200).json("Server eliminado.");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al eliminar el server.",
      error: "Internal server error",
      statusCode: 500,
    });
  }
};
