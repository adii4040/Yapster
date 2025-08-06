import { Server } from 'socket.io'
import { createServer } from 'http'
import { app } from './app.js'

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

io.on("connection", (socket) => {
    console.log(`User with id: ${socket.id} connected`)

    socket.on("disconnect", () => {
        console.log(`User with id: ${socket.id} disconnected`)
    })
})

export {io, server}