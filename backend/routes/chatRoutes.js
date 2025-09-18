// backend/routes/chatRoutes.js
import express from 'express';
// Import all exported functions from the controller file
import * as chatController from '../controllers/chatController.js';

const router = express.Router();

// Define the route and map it to the corresponding controller function
router.get('/:userId', chatController.getUserChats);
router.get('/messages/:chatId', chatController.getChatMessages);
router.post('/create', chatController.createChat);

export default router;