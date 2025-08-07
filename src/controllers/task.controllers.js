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
