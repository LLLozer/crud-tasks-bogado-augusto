import { Router } from "express"
const routerTask = Router()
import { createTask, findAllTasks, findTaskById, updateTask, deleteTask } from "../controllers/task.controllers.js"

routerTask.post("/tasks", createTask)
routerTask.get("/tasks", findAllTasks)
routerTask.get("/tasks/:id", findTaskById)
routerTask.put("/tasks/:id", updateTask)
routerTask.delete("/tasks/:id", deleteTask)

export default routerTask