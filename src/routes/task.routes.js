import { Router } from "express"
const routerTask = Router()
import { createTask, findAllTasks, findTaskById, updateTask, deleteTask } from "../controllers/task.controllers.js"
import { createTaskValidation, updateTaskValidation, getTaskIDValidation, deleteTaskValidation} from "../middlewares/task.validations.js"
import { validator} from "../middlewares/validator/validator.js"

routerTask.post("/tasks", createTaskValidation, validator, createTask);
routerTask.get("/tasks", findAllTasks);
routerTask.get("/tasks/:id", getTaskIDValidation, validator, findTaskById);
routerTask.put("/tasks/:id", updateTaskValidation, validator, updateTask);
routerTask.delete("/tasks/:id", deleteTaskValidation, validator, deleteTask);

export default routerTask