import { Router } from "express"
const routerUser = Router()
import { findAllUsers, createUser, findUserById, updateUser, deleteUser } from "../controllers/user.controllers.js"

routerUser.get("/users", findAllUsers);
routerUser.post("/users", createUser);
routerUser.get("/users/:id", findUserById);
routerUser.put("/users/:id", updateUser);
routerUser.delete("/users/:id", deleteUser);

export default routerUser