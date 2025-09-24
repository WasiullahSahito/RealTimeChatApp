import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import http from 'http';

// --- 1. IMPORT FROM OUR CENTRALIZED SOCKET FILE ---
import { initSocket } from './socket.js';

// Import models
import Message from './models/Message.js';
import Chat from './models/Chat.js';

// Import Passport config
import './config/passport-setup.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messages.js'; // The file upload route

// --- SERVER & APP SETUP ---
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(passport.initialize());

// --- SERVE UPLOADED FILES ---
app.use('/uploads', express.static('uploads'));

// --- API ROUTES ---
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes); // Mount the messages route

// --- 2. SOCKET.IO INITIALIZATION ---
// We call initSocket and pass our server. It returns the configured 'io' instance.
const io = initSocket(server);

const onlineUsers = new Map();

// All socket event listeners are defined here, using the 'io' instance we just created.
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
            const newMessage = new Message({ chatId, sender: senderId, content, type: 'text' });
            const savedMessage = await newMessage.save();
            await Chat.findByIdAndUpdate(chatId, { latestMessage: savedMessage._id });
            const messageToSend = await Message.findById(savedMessage._id).populate('sender', 'displayName image _id');
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
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
}