import { Router } from "express"
const routerUser = Router()
import { findAllUsers, createUser, findUserById } from "../controllers/user.controllers.js"

routerUser.get("/users", findAllUsers)
routerUser.post("/users", createUser)
routerUser.get("/users/:id", findUserById)

export default routerUser