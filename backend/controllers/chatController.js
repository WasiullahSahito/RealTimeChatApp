// backend/controllers/chatController.js
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

/**
 * @desc    Get all chats for a specific user
 * @route   GET /api/chats/:userId
 * @access  Private
 */
export const getUserChats = async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.params.userId })
            .populate('participants', 'displayName image')
            .populate({
                path: 'latestMessage',
                populate: { path: 'sender', select: 'displayName' }
            })
            .sort({ updatedAt: -1 });
        res.status(200).json(chats);
    } catch (err) {
        console.error('Error fetching user chats:', err);
        res.status(500).json({ message: 'Server error while fetching chats' });
    }
};

/**
 * @desc    Get all messages for a specific chat
 * @route   GET /api/chats/messages/:chatId
 * @access  Private
 */
export const getChatMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId })
            .populate('sender', 'displayName image')
            .sort({ createdAt: 'asc' });
        res.status(200).json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ message: 'Server error while fetching messages' });
    }
};

/**
 * @desc    Create a new 1-on-1 chat if it doesn't exist
 * @route   POST /api/chats/create
 * @access  Private
 */
export const createChat = async (req, res) => {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2) {
        return res.status(400).json({ message: 'Both user IDs are required.' });
    }

    try {
        // Find if a chat between these two users already exists
        let chat = await Chat.findOne({
            isGroupChat: false,
            participants: { $all: [userId1, userId2], $size: 2 }
        }).populate('participants', 'displayName image');

        // If chat exists, return it
        if (chat) {
            return res.status(200).json(chat);
        }

        // If not, create a new chat
        const newChat = new Chat({
            participants: [userId1, userId2]
        });

        const savedChat = await newChat.save();
        // Populate the participants' info before sending back
        const fullChat = await Chat.findById(savedChat._id).populate('participants', 'displayName image');

        res.status(201).json(fullChat);

    } catch (err) {
        console.error('Error creating chat:', err);
        res.status(500).json({ message: 'Server error while creating chat' });
    }
};