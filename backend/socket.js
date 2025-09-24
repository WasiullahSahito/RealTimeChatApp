import { Server } from 'socket.io';

let io;

export function initSocket(httpServer) {
    // Create a new Socket.IO server instance and store it in the module-scoped 'io' variable.
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });
    // Return the instance so index.js can use it.
    return io;
}

// This function allows any other file in our application to get the single, initialized 'io' instance.
export function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}