import User from "../models/user.model.js"

export const createUser = async (req , res) => {
    const { name , email , password } = req.body
    try {
        const checkIfEmailExists = await User.findOne({ where: { email: email } })
        if (checkIfEmailExists) {
            res.status(400).json ({
                message: "Error: Ese email ya existe",
                error: "Bad request",
                status: 400
            })
        }
        if (req.body>100) {
            res.status(400).json ({
                message: "Error: El atributo no puede superar los 100 caracteres",
                error: "Bad request",
                status: 400
            })
        }
        const createNewUser = await User.create(req.body)
        res.status(200).json("Usuario creado")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

