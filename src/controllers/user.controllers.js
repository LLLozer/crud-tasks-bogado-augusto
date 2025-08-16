import { User } from "../models/user.model.js";

//===========================//
//      CREAR USUARIO        //
//===========================//

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkIfEmailExists = await User.findOne({ where: { email: email } });
    if (checkIfEmailExists) {
      return res.status(400).json({
        message: "Error: Ese email ya existe",
        error: "Bad request",
        status: 400,
      });
    }
    const emailLength = await email.length;
    const nameLength = await name.length;
    const passwordLength = await password.length;
    if (emailLength > 100 || nameLength > 100 || passwordLength > 100) {
      return res.status(400).json({
        message: "Error: Los atributos superan los 100 caracteres",
        error: "Bad request",
        status: 400,
      });
    }
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Error: Algunos campos están vacíos",
        error: "Bad request",
        status: 400,
      });
    }
    const createNewUser = await User.create(req.body);
    res.status(200).json(createNewUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//===========================//
// LISTAR TODOS LOS USUARIOS //
//===========================//

export const findAllUsers = async (req, res) => {
  const findAll = await User.findAll();
  res.status(200).json(findAll);
};

//===========================//
//    LISTAR USUARIO POR ID  //
//===========================//

export const findUserById = async (req, res) => {
  const userID = parseInt(req.params.id);
  try {
    if (isNaN(userID)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número",
        error: "Bad request",
        status: 400,
      });
    }

    const findID = await User.findByPk(userID);

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

//===========================//
//      ACTUALIZAR USUARIO   //
//===========================//

export const updateUser = async (req, res) => {
  const userID = parseInt(req.params.id);
  const { name, email, password } = req.body;
  const emailLength = await email.length;
  const nameLength = await name.length;
  const passwordLength = await password.length;
  if (emailLength > 100 || nameLength > 100 || passwordLength > 100) {
    return res.status(400).json({
      message: "Error: Los atributos superan los 100 caracteres",
      error: "Bad request",
      status: 400,
    });
  }
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Error: Algunos campos están vacíos",
      error: "Bad request",
      status: 400,
    });
  }
  if (isNaN(userID)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    const findID = await User.findByPk(userID);
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese ID no existe",
        error: "Not found",
        status: 404,
      });
    }
    const checkIfEmailExists = await User.findOne({ where: { email: email } });
    if (checkIfEmailExists) {
      return res.status(400).json({
        message: "Error: Ese usuario ya existe",
        error: "Bad request",
        status: 400,
      });
    }
    await findID.update({ name, email, password });
    res.status(200).json("Datos actualizados");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al actualizar usuario",
      error: "Internal server error",
      status: 500,
    });
  }
};

//===========================//
//      ELIMINAR USUARIO     //
//===========================//

export const deleteUser = async (req, res) => {
  const userID = parseInt(req.params.id);
  const findID = await User.findByPk(userID);
  if (isNaN(userID)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese usuario no existe",
        error: "Not found",
        status: 404,
      });
    }
    const deleteData = await findID.destroy();
    res.status(200).json("Usuario eliminado.");
  } catch (error) {
    return res(500).json({
      message: "Error: Error al eliminar el usuario",
      error: "Internal server error",
      status: 500,
    });
  }
};