import { Router } from "express";
const serverRouter = Router()
import { findAllServers, createServer, findServerById, updateServer, deleteServer } from "../controllers/servers.controllers.js";

serverRouter.get("/servers", findAllServers);
serverRouter.get("/servers/:id", findServerById);
serverRouter.post("/servers/", createServer);
serverRouter.put("/servers/:id", updateServer);
serverRouter.delete("/servers/:id", deleteServer);

export default serverRouter