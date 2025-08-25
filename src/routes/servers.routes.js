import { Router } from "express";
const serverRouter = Router()
import { findAllServers, createServer, findServerById, updateServer, deleteServer } from "../controllers/servers.controllers.js";
import { createServerValidation, getServerIDValidation, updateServerValidation, deleteServerValidation } from "../middlewares/servers.validations.js"
import { validationResult } from "../middlewares/validator/validator.js"

serverRouter.get("/servers", findAllServers);
serverRouter.get("/servers/:id", getServerIDValidation, validationResult, findServerById);
serverRouter.post("/servers/", createServerValidation, validationResult, createServer);
serverRouter.put("/servers/:id", updateServerValidation, validationResult, updateServer);
serverRouter.delete("/servers/:id", deleteServerValidation, validationResult, deleteServer);

export default serverRouter