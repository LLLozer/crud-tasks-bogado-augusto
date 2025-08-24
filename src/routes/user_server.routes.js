import { Router } from "express";
const userServerRouter = Router()
import { getAll, getById, createNewUserServer, updateUserServer, deleteUserServer } from "../controllers/user_server.controllers.js";

userServerRouter.get("/user_server", getAll);
userServerRouter.get("/user_server/:id", getById);
userServerRouter.post("/user_server", createNewUserServer);
userServerRouter.put("/user_server/:id", updateUserServer);
userServerRouter.delete("/user_server/:id", deleteUserServer);

export default userServerRouter;