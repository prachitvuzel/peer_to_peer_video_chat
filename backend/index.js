import express from "express"
import { Server } from "socket.io"
import http from "http"
import ejs from "ejs"
import path from "path"
import dotenv from "dotenv"
dotenv.config()


const app = express()
const server = http.createServer(app)
const io = new Server(server)



io.on("connection", socket => {
    console.log(`user connected: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`)
    })
})

app.use(express.static(path.resolve("./public")))
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

const PORT = process.env.PORT



app.use("/", (req, res) => {
    return res.render("index")
})



server.listen(PORT, () => {

    console.log("Express Server started at port 8000")
})

