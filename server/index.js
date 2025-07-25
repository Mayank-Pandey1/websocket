import express from "express"
import { Server } from "socket.io"
import http from "http"

const app = express();

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send(`<h1>Hello World!</h1>`)
})

const server = http.createServer(app);

const socketio = new Server(server, {
    cors: {
        origin: "*"
    }
})

let playerScores = []

socketio.on("connection", (socket) => {    
    console.log("A user connected")                                         //socket is the connection between client and server
    console.log("Connection available: ", socket.id)

    socket.on("scores", (scores) => {
        playerScores.push({...scores, id: socket.id})
        console.log(playerScores)
        socket.emit('playerScores', playerScores)

        setInterval(() => {
            socket.emit('playerScores', playerScores)
        }, 5000)
    })
})    

server.listen(port, () => {
    console.log(`Server is listening on PORT ${port}`);
})