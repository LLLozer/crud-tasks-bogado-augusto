import { Router } from "express";
const serverRouter = Router()
import { findAllServers, createServer, findServerById, updateServer, deleteServer } from "../controllers/servers.controllers.js";
import { createServerValidation, getServerIDValidation, updateServerValidation, deleteServerValidation } from "../middlewares/servers.validations.js"
import { validator } from "../middlewares/validator/validator.js"

serverRouter.get("/servers", findAllServers);
serverRouter.get("/servers/:id", getServerIDValidation, validator, findServerById);
serverRouter.post("/servers/", createServerValidation, validator, createServer);
serverRouter.put("/servers/:id", updateServerValidation, validator, updateServer);
serverRouter.delete("/servers/:id", deleteServerValidation, validator, deleteServer);

export default serverRouter