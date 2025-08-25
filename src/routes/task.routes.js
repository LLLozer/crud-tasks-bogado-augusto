import { Router } from "express"
const routerTask = Router()
import { createTask, findAllTasks, findTaskById, updateTask, deleteTask } from "../controllers/task.controllers.js"
import { createTaskValidation, updateTaskValidation, getTaskIDValidation, deleteTaskValidation} from "../middlewares/task.validations.js"
import { validationResult } from "../middlewares/validator/validator.js"

routerTask.post("/tasks", createTaskValidation, validationResult, createTask);
routerTask.get("/tasks", findAllTasks);
routerTask.get("/tasks/:id", getTaskIDValidation, validationResult, findTaskById);
routerTask.put("/tasks/:id", updateTaskValidation, validationResult, updateTask);
routerTask.delete("/tasks/:id", deleteTaskValidation, validationResult, deleteTask);

export default routerTask