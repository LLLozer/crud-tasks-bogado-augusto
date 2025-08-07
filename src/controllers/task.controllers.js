import Task from "../models/task.model.js"

//===========================//
//      CREAR TAREA          //
//===========================//

export const createTask = async (req , res) => {
    const { title , description } = req.body
    try {
        const checkIfTitleExists = await Task.findOne({ where: { title: title } })
        if (checkIfTitleExists) {
            return res.status(400).json ({
                message: "Error: Esa tarea ya existe",
                error: "Bad request",
                status: 400
            })
        }
        const titleLength = await title.length 
        const descriptionLength = await description.length
        if (titleLength>100) {
            return res.status(400).json ({
                message: "Error: El atributo title no puede superar los 100 caracteres",
                error: "Bad request",
                status: 400
            })
        }
        if (descriptionLength>100) {
            return res.status(400).json ({
                message: "Error: El atributo description no puede superar los 100 caracteres",
                error: "Bad request",
                status: 400
            })
        }
        if (!title || !description) {
        return res.status(400).json ({
            message: "Error: Algunos campos están vacíos.",
            error: "Bad request",
            statusCode: 400
        })
    }
        const createNewTask = await Task.create(req.body)
        res.status(200).json(createNewTask)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//===========================//
// LISTAR TODAS LAS TAREAS   //
//===========================//

export const findAllTasks = async (req , res) => {
        const find = await Task.findAll()
        res.status(200).json(find)
}

//===========================//
//    LISTAR TAREA POR ID    //
//===========================//

export const findTaskById = async (req , res) => {
    const taskID = parseInt(req.params.id)
    try {
        const findID = await Task.findByPk(taskID)
        if (isNaN(taskID)) {
            return res.status(400).json ({
                message:"Error: El ID debe ser un número.",
                error:"Bad Request",
                statusCode: 400
        })
        }
        if (!findID) {
            return res.status(404).json ({
                message: "Error: Ese ID no existe.",
                error: "Bad request",
                statusCode: 404
            })
        }
    }catch (error) {
        return res.status(404).json("Error al encontrar el ID")
    }
    
    res.status(200).json(findID)
}

//===========================//
//      ACTUALIZAR TAREA     //
//===========================//

export const updateTask = async (req , res) => {
    const taskID = parseInt(req.params.id)
    const { title, description, isComplete } = req.body
    if (isNaN(taskID)) {
        return res.status(400).json ({
            message:"Error: El ID debe ser un número.",
            error:"Bad Request",
            statusCode: 400
        })
    }
    if (!title && !description) {
        return res.status(400).json ({
            message: "Error: Algunos campos están vacíos.",
            error: "Bad request",
            statusCode: 400
        })
    }
    try {
        const findID = await Task.findByPk(taskID)
        if (!findID) {
            return res.status(404).json ({
                message: "Error: Ese ID no existe.",
                error: "Bad request",
                statusCode: 404
            })
        }
        if (isComplete !== (true || false)) {
            return res.status(400).json ({
                message: "Error: isComplete debe ser booleano.",
                error: "Bad request",
                statusCode: 400
            })
        }
        await findID.update({ title, description, isComplete})
        res.status(200).json("Datos actualizados")
    } catch (error) {
        return res.status(400).json ({
            message: "Error: Error al actualizar los datos.",
            error: "Bad request",
            statusCode: 400
        })
    }
}

//===========================//
//      ELIMINAR TAREA       //
//===========================//

export const deleteTask = async (req , res) => {
    const taskID = parseInt(req.params.id)
    if (isNaN(taskID)) {
        return res.status(400).json ({
            message:"Error: El ID debe ser un número.",
            error:"Bad Request",
            statusCode: 400
        })
    }
    try {
        const findID = await Task.findByPk(taskID)
        if (!findID) {
            return res.status(404).json ({
                message: "Error: Ese ID no existe.",
                error: "Bad request",
                statusCode: 404
            })
        }
        const deleteData = await findID.destroy()
        res.status(200).json("Tarea eliminada.")
    } catch (error) {
        return res.status(400).json("Error al eliminar la tarea.")
    }
}