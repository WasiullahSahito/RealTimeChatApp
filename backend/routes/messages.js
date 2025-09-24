import express from 'express';
import multer from 'multer';
import Message from '../models/Message.js';
import Chat from '../models/Chat.js';
import { getIO } from '../socket.js'; // This import will now work correctly

const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { chatId, senderId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // --- FIX: Dynamically construct the full URL ---
        // This is more robust than relying on a potentially unset process.env.SERVER_URL
        const serverUrl = `${req.protocol}://${req.get('host')}`;
        const fileUrl = `${serverUrl}/uploads/${file.filename}`;

        let fileType = 'image';
        if (file.mimetype.startsWith('video')) fileType = 'video';
        else if (file.mimetype.startsWith('audio')) fileType = 'audio';

        const newMessage = new Message({
            chatId,
            sender: senderId,
            content: fileUrl,
            type: fileType,
        });
        const savedMessage = await newMessage.save();

        await Chat.findByIdAndUpdate(chatId, { latestMessage: savedMessage._id });

        const populatedMessage = await Message.findById(savedMessage._id)
            .populate('sender', 'displayName image _id');

        const io = getIO(); // This call will now succeed
        io.to(chatId).emit('receiveMessage', populatedMessage);

        res.status(201).json(populatedMessage);

    } catch (error) {
        console.error("File upload error:", error);
        res.status(500).json({ message: 'Server error during file upload.' });
    }
});

export default router;