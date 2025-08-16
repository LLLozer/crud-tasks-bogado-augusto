import express from "express"
import routerTask from "./src/routes/task.routes.js"
import routerUser from "./src/routes/user.routes.js"
import serverRouter from "./src/routes/servers.routes.js"
import routerAccountInfo from "./src/routes/account.info.routes.js"
import { User_Server } from "./src/models/user_server.model.js"
import { DBStart } from "./src/config/database.js"
const app = express()
const PORT = 3004

app.use(express.json())
app.use("/api", routerTask)
app.use("/api", routerUser)
app.use("/api", serverRouter)
app.use("/api", routerAccountInfo)

app.listen(PORT, () => {
    DBStart()
    console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`)
})