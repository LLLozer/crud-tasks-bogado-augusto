import { Router } from "express";
const serverRouter = Router()
import { find_all_servers, create_server, find_server_by_id } from "../controllers/servers.controllers.js";

serverRouter.get("/servers", find_all_servers)
serverRouter.get("/servers/:id", find_server_by_id)
serverRouter.post("/servers/", create_server)

export default serverRouter