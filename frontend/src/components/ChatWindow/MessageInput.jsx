import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IoSend } from 'react-icons/io5';
import { FiPaperclip, FiSmile } from 'react-icons/fi';

const MessageInput = ({ chatId, socket }) => {
    const [content, setContent] = useState('');
    const { currentUser } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim() === '' || !socket) return;
        const messageData = {
            chatId,
            senderId: currentUser.id,
            content: content.trim(),
        };
        socket.emit('sendMessage', messageData);
        setContent('');
    };

    return (
        <div className="p-4 bg-header-bg border-t border-divider-light">
            <form className="flex items-center gap-4" onSubmit={handleSubmit}>
                <button type="button" className="text-text-secondary hover:text-accent"><FiSmile size={22} /></button>
                <button type="button" className="text-text-secondary hover:text-accent"><FiPaperclip size={22} /></button>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-grow bg-gray-100 py-2 px-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button type="submit" className="bg-accent text-white p-2.5 rounded-full flex items-center justify-center hover:bg-accent-hover transition">
                    <IoSend size={18} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;