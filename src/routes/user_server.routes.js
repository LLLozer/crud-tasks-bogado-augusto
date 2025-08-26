import { Router } from "express";
const userServerRouter = Router()
import { getAll, getById, createNewUserServer, updateUserServer, deleteUserServer } from "../controllers/user_server.controllers.js";
import { createUserServerValidation, getUserServerIDValidation, deleteUserServerValidation, updateUserServerValidation} from "../middlewares/user_server.validations.js"
import { validator } from "../middlewares/validator/validator.js"

userServerRouter.get("/user_server", getAll);
userServerRouter.get("/user_server/:id", getUserServerIDValidation, validator, getById);
userServerRouter.post("/user_server", createUserServerValidation, validator, createNewUserServer);
userServerRouter.put("/user_server/:id", updateUserServerValidation, validator, updateUserServer);
userServerRouter.delete("/user_server/:id", deleteUserServerValidation, validator, deleteUserServer);

export default userServerRouter;