import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { IoSend } from 'react-icons/io5';
import { FiPaperclip, FiSmile } from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';

const MessageInput = ({ chatId, socket }) => {
    const [content, setContent] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { currentUser } = useAuth();
    const fileInputRef = useRef(null);

    const handleEmojiClick = (emojiObject) => {
        setContent(prev => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim() === '' || !socket) return;
        const messageData = {
            chatId,
            senderId: currentUser.id,
            content: content.trim(),
            type: 'text',
        };
        socket.emit('sendMessage', messageData);
        setContent('');
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('chatId', chatId);
        formData.append('senderId', currentUser.id);

        try {
            // The frontend sends the file, but the backend handles DB creation
            // and emits the final message object via socket for real-time update.
            await axios.post(`${import.meta.env.VITE_API_URL}/api/messages/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } catch (error) {
            console.error("File upload failed", error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <div className="p-4 bg-gray-800 border-t border-gray-700 relative">
            {showEmojiPicker && (
                <div className="absolute bottom-20 left-4 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
                </div>
            )}
            <form className="flex items-center gap-4" onSubmit={handleSubmit}>
                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-gray-400 hover:text-blue-500 transition-colors">
                    <FiSmile size={22} />
                </button>

                {/* Hidden file input, triggered by the paperclip button */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,video/*,audio/*"
                />
                <button type="button" onClick={() => fileInputRef.current.click()} className="text-gray-400 hover:text-blue-500 transition-colors">
                    <FiPaperclip size={22} />
                </button>

                <input
                    type="text"
                    placeholder="Type a message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-grow bg-gray-900 py-3 px-5 rounded-full text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    disabled={!content.trim()}
                >
                    <IoSend size={18} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;