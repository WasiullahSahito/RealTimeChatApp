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
        <div className="p-4 bg-gray-800 border-t border-gray-700 flex-shrink-0">
            <form className="flex items-center gap-4" onSubmit={handleSubmit}>
                {/* Future feature buttons */}
                <button type="button" className="text-gray-400 hover:text-blue-500 transition-colors"><FiSmile size={22} /></button>
                <button type="button" className="text-gray-400 hover:text-blue-500 transition-colors"><FiPaperclip size={22} /></button>
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