import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';

const ChatListItem = ({ chat, onSelectChat, isActive }) => {
    const { currentUser } = useAuth();
    const chatPartner = chat.participants.find(p => p._id !== currentUser.id);

    if (!chatPartner) return null;

    const activeClass = isActive ? 'bg-blue-500/20' : 'hover:bg-gray-700/50';

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <li
            className={`flex items-center p-4 cursor-pointer transition-colors duration-200 border-b border-gray-700/50 ${activeClass}`}
            onClick={() => onSelectChat(chat)}
        >
            <Avatar user={chatPartner} size="md" />
            <div className="flex-grow overflow-hidden ml-4">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-white block">{chatPartner.displayName}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                        {formatDate(chat.latestMessage?.createdAt || chat.updatedAt)}
                    </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                    {chat.latestMessage ? chat.latestMessage.content : "No messages yet"}
                </p>
            </div>
        </li>
    );
};

export default ChatListItem;