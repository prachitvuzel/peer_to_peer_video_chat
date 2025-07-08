import express from "express";
import { Server } from "socket.io";
import http from "http";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = new Map();

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  users.set(socket.id, socket.id);

  io.emit("user:joined", socket.id);

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});


app.use(express.static(path.resolve("./public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/users", (req, res) => {
  return res.json(Array.from(users));
});

server.listen(PORT, () => {
  console.log("Express Server started at port 8000");
});
