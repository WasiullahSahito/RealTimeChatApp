import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import { FiSearch, FiPhone, FiMoreVertical } from 'react-icons/fi';

const ChatHeader = ({ chat }) => {
    const { currentUser } = useAuth();
    const chatPartner = chat.participants.find(p => p._id !== currentUser.id);
    if (!chatPartner) return null;

    return (
        <header className="flex items-center p-4 bg-header-bg border-b border-divider-light shadow-sm">
            <Avatar user={chatPartner} size="sm" />
            <div className="flex-grow ml-4">
                <span className="font-semibold text-text-dark">{chatPartner.displayName}</span>
                {/* Optional: Add online status here */}
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
                <button className="p-2 rounded-full hover:bg-gray-100"><FiSearch size={20} /></button>
                <button className="p-2 rounded-full hover:bg-gray-100"><FiPhone size={20} /></button>
                <button className="p-2 rounded-full hover:bg-gray-100"><FiMoreVertical size={20} /></button>
            </div>
        </header>
    );
};

export default ChatHeader;