import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import { FiSearch, FiPhone, FiMoreVertical } from 'react-icons/fi';

const ChatHeader = ({ chat }) => {
    const { currentUser } = useAuth();
    const chatPartner = chat.participants.find(p => p._id !== currentUser.id);
    if (!chatPartner) return null;

    return (
        <header className="flex items-center p-4 bg-gray-800 border-b border-gray-700 shadow-sm flex-shrink-0">
            <Avatar user={chatPartner} size="sm" />
            <div className="flex-grow ml-4">
                <span className="font-semibold text-white">{chatPartner.displayName}</span>
                <p className="text-xs text-green-400">Online</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
                <button className="p-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors"><FiPhone size={20} /></button>
                <button className="p-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors"><FiSearch size={20} /></button>
                <button className="p-2 rounded-full hover:bg-gray-700 hover:text-white transition-colors"><FiMoreVertical size={20} /></button>
            </div>
        </header>
    );
};

export default ChatHeader;