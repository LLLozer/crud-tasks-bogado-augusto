import Task from "../models/task.model.js"

//===========================//
//      CREAR TAREA          //
//===========================//

const createTask = async (req , res) => {
    const { title } = req.body
    try {
        const checkIfTitleExists = await Task.findOne({ where: { title: title } })
        if (checkIfTitleExists) {
            res.status(400).json ({
                message: "Error: Esa tarea ya existe",
                error: "Bad request",
                status: 400
            })
        }
        const createNewTask = await Task.create(req.body)
        res.status(200).json("Tarea creada")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//===========================//
// LISTAR TODAS LAS TAREAS   //
//===========================//

const findAllTasks = async (req , res) => {
        const find = await Task.findAll()
        res.status(200).json(find)
}

//===========================//
//    LISTAR TAREA POR ID    //
//===========================//

const findTaskById = async (req , res) => {
    const taskID = parseInt(req.params.id)
    const findID = await Task.findByPk(taskID)
    res.status(200).json("Listando todas las películas")
}

//===========================//
//      ACTUALIZAR TAREA     //
//===========================//

const updateTask = async (req , res) => {
    const taskID = parseInt(req.params.id)
    const { title, description, isComplete } = req.body
    if (isNaN(taskID)) {
        res.status(400).json ({
            message:"Error: El ID debe ser un número.",
            error:"Bad Request",
            statusCode: 400
        })
    }
    if (!title && !description) {
        res.status(400).json ({
            message: "Error: Algunos campos están vacíos.",
            error: "Bad request",
            statusCode: 400
        })
    }
    try {
        const findID = await Task.findByPk(taskID)
        if (!findID) {
            res.status(404).json ({
                message: "Error: Ese ID no existe.",
                error: "Bad request",
                statusCode: 404
            })
        }
        if (isComplete !== (true || false)) {
            res.status(400).json ({
                message: "Error: isComplete debe ser booleano.",
                error: "Bad request",
                statusCode: 400
            })
        }
        await findID.update({ title, description, isComplete})
        res.status(200).json("Datos actualizados")
    } catch (error) {
        res.status(400).json ({
            message: "Error: Error al actualizar los datos.",
            error: "Bad request",
            statusCode: 400
        })
    }
}

//===========================//
//      ELIMINAR TAREA       //
//===========================//

const deleteTask = async (req , res) => {
    const taskID = parseInt(req.params.id)
    if (isNaN(taskID)) {
        res.status(400).json ({
            message:"Error: El ID debe ser un número.",
            error:"Bad Request",
            statusCode: 400
        })
    }
    try {
        const findID = await Task.findByPk(taskID)
        if (!findID) {
            res.status(404).json ({
                message: "Error: Ese ID no existe.",
                error: "Bad request",
                statusCode: 404
            })
        }
        const deleteData = await findID.destroy()
        res.status(200).json("Tarea eliminada.")
    } catch (error) {
        res.status(400).json("Error al eliminar la tarea.")
    }
}