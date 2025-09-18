// server.js
import 'dotenv/config'; // Use this for cleaner .env loading
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import http from 'http';
import { Server } from "socket.io";

// Import models to ensure they are registered with Mongoose
import './models/User.js';
import './models/Chat.js';
import './models/Message.js';

// Import Passport config (runs the code in the file)
import './config/passport-setup.js';

// Import routes (remember the .js extension!)
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Import the specific models we need for socket logic
import Message from './models/Message.js';
import Chat from './models/Chat.js';


// --- SERVER & APP SETUP ---
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(passport.initialize());

// --- API ROUTES ---
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

// --- SOCKET.IO SETUP ---
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('addUser', (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} is online.`);
    });

    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`User ${socket.id} joined chat: ${chatId}`);
    });

    socket.on('sendMessage', async (data) => {
        const { chatId, senderId, content } = data;
        try {
            const newMessage = new Message({ chatId, sender: senderId, content });
            const savedMessage = await newMessage.save();
            await Chat.findByIdAndUpdate(chatId, { latestMessage: savedMessage._id });
            const messageToSend = await Message.findById(savedMessage._id).populate('sender', 'displayName image');
            io.to(chatId).emit('receiveMessage', messageToSend);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
        console.log('User disconnected:', socket.id);
    });
});


// --- DATABASE CONNECTION & SERVER START ---
// Using top-level await for cleaner startup
try {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit if DB connection fails
}