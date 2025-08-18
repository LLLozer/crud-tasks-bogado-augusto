import { Router } from "express";
const userServerRouter = Router()
import { getAll, getById, createNewUserServer } from "../controllers/user_server.controllers.js";

userServerRouter.get("/user_server", getAll);
userServerRouter.get("/user_server/:id", getById);
userServerRouter.post("/user_server", createNewUserServer);