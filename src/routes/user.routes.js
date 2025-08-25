import { Router } from "express"
const routerUser = Router()
import { findAllUsers, createUser, findUserById, updateUser, deleteUser } from "../controllers/user.controllers.js"
import { createUserValidation, getUserIDValidation, updateUserValidation, deleteUserValidation} from "../middlewares/users.validation.js"
import { validationResult } from "../middlewares/validator/validator.js"

routerUser.get("/users", findAllUsers);
routerUser.post("/users", createUserValidation, validationResult, createUser);
routerUser.get("/users/:id", getUserIDValidation, validationResult, findUserById);
routerUser.put("/users/:id", updateUserValidation, validationResult, updateUser);
routerUser.delete("/users/:id", deleteUserValidation, validationResult, deleteUser);

export default routerUser