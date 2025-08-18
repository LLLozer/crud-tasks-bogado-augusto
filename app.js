import express from "express"
import routerTask from "./src/routes/task.routes.js"
import routerUser from "./src/routes/user.routes.js"
import serverRouter from "./src/routes/servers.routes.js"
import routerAccountInfo from "./src/routes/account.info.routes.js"
import userServerRouter from "./src/routes/user_server.routes.js"
const app = express()
const PORT = 3004

app.use(express.json())
app.use("/api", routerTask)
app.use("/api", routerUser)
app.use("/api", serverRouter)
app.use("/api", routerAccountInfo)
app.use("/api", userServerRouter)

app.listen(PORT, () => {
    DBStart()
    console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`)
})