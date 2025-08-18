import { Router } from "express";
const serverRouter = Router()
import { findAllServers, createServer, findServerById } from "../controllers/servers.controllers.js";

serverRouter.get("/servers", findAllServers)
serverRouter.get("/servers/:id", findServerById)
serverRouter.post("/servers/", createServer)

export default serverRouter