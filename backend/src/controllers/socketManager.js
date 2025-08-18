const { Server } = require("socket.io");

const connections = {};
const messages = {};
const socketToRoom = {};

const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: "*",
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Handle joining a video call room
        socket.on("join-call", (path) => {
            // Initialize room if it doesn't exist
            if (!connections[path]) {
                connections[path] = [];
                messages[path] = [];
            }

            // Track room association
            socketToRoom[socket.id] = path;

            // Add user to room
            connections[path].push(socket.id);
            console.log(`${socket.id} joined room: ${path}`);

            // Notify all users in room about new participant
            connections[path].forEach(userId => {
                io.to(userId).emit("user-joined", socket.id, connections[path]);
            });

            // Send message history to new user
            messages[path].forEach(msg => {
                io.to(socket.id).emit("chat-message", msg.data, msg.sender, msg.socketId);
            });
        });

        // Handle WebRTC signaling
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        // Handle chat messages
        socket.on("chat-message", (data, sender) => {
            const roomPath = socketToRoom[socket.id];
            
            if (!roomPath || !connections[roomPath]) {
                console.error(`User ${socket.id} not in a valid room`);
                return;
            }

            // Create message object
            const message = {
                sender: sender,
                data: data,
                socketId: socket.id,
                timestamp: Date.now()
            };

            // Store message
            messages[roomPath].push(message);

            // Broadcast to all in room
            connections[roomPath].forEach(userId => {
                io.to(userId).emit("chat-message", data, sender, socket.id);
            });
        });

        // Handle disconnections
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            const roomPath = socketToRoom[socket.id];
            
            if (!roomPath || !connections[roomPath]) return;

            // Remove user from room
            const index = connections[roomPath].indexOf(socket.id);
            if (index > -1) {
                connections[roomPath].splice(index, 1);
            }

            // Notify room about user departure
            connections[roomPath].forEach(userId => {
                io.to(userId).emit("user-left", socket.id);
            });

            // Clean up empty rooms
            if (connections[roomPath].length === 0) {
                delete connections[roomPath];
                delete messages[roomPath];
            }

            // Clean up socket-room mapping
            delete socketToRoom[socket.id];
        });
    });

    return io;
};

module.exports = connectToSocket;