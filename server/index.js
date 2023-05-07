const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { log } = require("console");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User id : ${socket.id}`);

    socket.on("join_room", (id) => {
        socket.join(id);
        console.log(`User id : ${socket.id} has joined id : ${id}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
    });

    socket.on("disconnect", () => {
        console.log("user disconneced..", socket.id);
    })
});


server.listen(3000, () => {
    console.log("Server is running....");
});