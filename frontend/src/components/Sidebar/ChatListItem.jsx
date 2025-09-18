import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar'; // Use the new Avatar component

const ChatListItem = ({ chat, onSelectChat, isActive }) => {
    const { currentUser } = useAuth();
    const chatPartner = chat.participants.find(p => p._id !== currentUser.id);

    if (!chatPartner) return null;

    const activeClass = isActive ? 'bg-[#374151]' : 'hover:bg-[#374151]/50';

    return (
        <li
            className={`flex items-center p-4 cursor-pointer transition-colors duration-200 ${activeClass}`}
            onClick={() => onSelectChat(chat)}
        >
            <Avatar user={chatPartner} size="md" />
            <div className="flex-grow overflow-hidden ml-4">
                <span className="font-semibold text-text-primary block">{chatPartner.displayName}</span>
                <p className="text-sm text-text-secondary truncate">
                    {chat.latestMessage ? chat.latestMessage.content : "..."}
                </p>
            </div>
        </li>
    );
};

export default ChatListItem;