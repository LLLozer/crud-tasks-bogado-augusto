import { Router } from "express"
const routerUser = Router()
import { findAllUsers, createUser, findUserById, updateUser, deleteUser } from "../controllers/user.controllers.js"
import { createUserValidation, getUserIDValidation, updateUserValidation, deleteUserValidation} from "../middlewares/users.validations.js"
import { validator } from "../middlewares/validator/validator.js"

routerUser.get("/users", findAllUsers);
routerUser.post("/users", createUserValidation, validator, createUser);
routerUser.get("/users/:id", getUserIDValidation, validator, findUserById);
routerUser.put("/users/:id", updateUserValidation, validator, updateUser);
routerUser.delete("/users/:id", deleteUserValidation, validator, deleteUser);

export default routerUser