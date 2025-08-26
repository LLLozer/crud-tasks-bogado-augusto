import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { matchedData } from "express-validator";

//===========================//
//      CREAR TAREA          //
//===========================//

export const createTask = async (req, res) => {
  const { title, description, is_complete, user_id } = req.body;
  try {
    const checkIfTitleExists = await Task.findOne({
      where: { title: title, id: { [Op.ne]: id } },
    });
    if (checkIfTitleExists) {
      return res.status(400).json({
        message: "Error: Esa tarea ya existe",
        error: "Bad request",
        statusCode: 400,
      });
    }
    const titleLength = await title.length;
    const descriptionLength = await description.length;
    if (titleLength > 100 || descriptionLength > 100) {
      return res.status(400).json({
        message: "Error: Hay atributos que superan los 100 caracteres",
        error: "Bad request",
        statusCode: 400,
      });
    }
    if (!title || !description) {
      return res.status(400).json({
        message: "Error: Algunos campos están vacíos.",
        error: "Bad request",
        statusCode: 400,
      });
    }
    if (typeof is_complete !== "boolean") {
      return res.status(400).json({
        message: "Error: is_complete debe ser booleano.",
        error: "Bad request",
        statusCode: 400,
      });
    }
    if (!user_id) {
      return res.status(400).json({
        message: "Se le debe asignar una tarea a un usuario",
        error: "Bad request",
        statusCode: 400,
      });
    }
    const validatedData = matchedData(req, { locations: ["body"] });
    console.log("Los datos validados son:", validatedData);
    const createNewTask = await Task.create(req.body);
    res.status(200).json(createNewTask);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//===========================//
// LISTAR TODAS LAS TAREAS   //
//===========================//

export const findAllTasks = async (req, res) => {
  const find = await Task.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: {
          exclude: ["password", "email"],
        },
      },
    ],
  });
  res.status(200).json(find);
};

//===========================//
//    LISTAR TAREA POR ID    //
//===========================//

export const findTaskById = async (req, res) => {
  const taskID = parseInt(req.params.id);
  try {
    if (isNaN(taskID)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número.",
        error: "Bad Request",
        statusCode: 400,
      });
    }
    const findID = await Task.findByPk(taskID, {
      include: [
        {
          model: User,
          as: "User",
          attributes: {
            exclude: ["password", "email"],
          },
        },
      ],
    });
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese ID no se ha encontrado",
        error: "Not found",
        statusCode: 404,
      });
    }
    res.status(200).json(findID);
  } catch (error) {
    return res.status(500).json("Error al encontrar el ID");
  }
};

//===========================//
//      ACTUALIZAR TAREA     //
//===========================//

export const updateTask = async (req, res) => {
  const taskID = parseInt(req.params.id);
  const { title, description, is_complete } = req.body;
  const titleLength = await title.length;
  const descriptionLength = await description.length;
  if (titleLength > 100 || descriptionLength > 100) {
    return res.status(400).json({
      message: "Error: Hay atributos que superan los 100 caracteres",
      error: "Bad request",
      statusCode: 400,
    });
  }
  if (isNaN(taskID)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número.",
      error: "Bad Request",
      statusCode: 400,
    });
  }
  if (!title && !description) {
    return res.status(400).json({
      message: "Error: Algunos campos están vacíos.",
      error: "Bad request",
      statusCode: 400,
    });
  }
  try {
    const findID = await Task.findByPk(taskID);
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese ID no existe.",
        error: "Bad request",
        statusCode: 404,
      });
    }
    if (typeof is_complete !== "boolean") {
      return res.status(400).json({
        message: "Error: is_complete debe ser booleano.",
        error: "Bad request",
        statusCode: 400,
      });
    }
    const checkIfTitleExists = await Task.findOne({
      where: { title: title, id: { [Op.ne]: id } },
    });
    if (checkIfTitleExists) {
      return res.status(400).json({
        message: "Error: Esa tarea ya existe",
        error: "Bad request",
        statusCode: 400,
      });
    }
    const validatedData = matchedData(req, { locations: ["body"] });
    console.log("Los datos validados son:", validatedData);
    await findID.update({ title, description, is_complete });
    res.status(200).json("Datos actualizados");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al actualizar los datos.",
      error: "Internal server error",
      statusCode: 500,
    });
  }
};

//===========================//
//      ELIMINAR TAREA       //
//===========================//

export const deleteTask = async (req, res) => {
  const taskID = parseInt(req.params.id);
  if (isNaN(taskID)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número.",
      error: "Bad Request",
      statusCode: 400,
    });
  }
  try {
    const findID = await Task.findByPk(taskID);
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese ID no existe.",
        error: "Bad request",
        statusCode: 404,
      });
    }
    const deleteData = await findID.destroy();
    res.status(200).json("Tarea eliminada.");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al eliminar la tarea.",
      error: "Internal server error",
      statusCode: 500,
    });
  }
};
