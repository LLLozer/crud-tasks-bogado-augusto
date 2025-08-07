import Task from "../models/task.model.js"

const createTask = async (req , res) => {
    const task = req.body
    try {

        const createNewTask = await Task.create(task)
        res.status(200).json(createNewTask)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const findAllTasks = async (req , res) => {
        const find = await Task.findAll()
        res.status(200).json(find)
}

const findTaskById = async (req , res) => {
    const taskID = parseInt(req.params.id)
    const findID = await Task.findByPk(taskID)
    res.status(200).json(findID)
}