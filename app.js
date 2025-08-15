import express from "express"
import routerTask from "./src/routes/task.routes.js"
import routerUser from "./src/routes/user.routes.js"
import { Servers } from "./src/models/servers.model.js"
import { User_Server } from "./src/models/user_server.model.js"
import { DBStart } from "./src/config/database.js"
const app = express()
const PORT = 3004

app.use(express.json())
app.use("/api", routerTask)
app.use("/api", routerUser)

app.listen(PORT, () => {
    DBStart()
    console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`)
})