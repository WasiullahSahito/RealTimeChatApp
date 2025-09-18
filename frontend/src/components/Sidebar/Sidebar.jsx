import React, { useState } from 'react';
import UserProfile from './UserProfile';
import ChatList from './ChatList';
import NewChatModal from './NewChatModal';
import { RiChatNewLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';

const Sidebar = ({ chats, onSelectChat, selectedChat, setChats }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChatCreated = (newChat) => {
        setChats(prevChats => {
            const chatExists = prevChats.some(chat => chat._id === newChat._id);
            if (chatExists) {
                return [newChat, ...prevChats.filter(c => c._id !== newChat._id)];
            }
            return [newChat, ...prevChats];
        });
        onSelectChat(newChat);
        setIsModalOpen(false);
    };

    const filteredChats = chats.filter(chat => {
        const partner = chat.participants.find(p => p.googleId !== 'currentUserId'); // Simplified logic
        return partner?.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <aside className="flex flex-col h-full w-[30%] min-w-[320px] max-w-[420px] bg-sidebar-bg text-text-primary">
                <UserProfile />
                <div className="p-4">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#374151] rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center px-4 pt-2 pb-2">
                    <h2 className="text-lg font-semibold">Chats</h2>
                    <button onClick={() => setIsModalOpen(true)} className="p-2 rounded-full hover:bg-[#374151]" title="New Chat">
                        <RiChatNewLine size={20} />
                    </button>
                </div>
                <ChatList chats={filteredChats} onSelectChat={onSelectChat} selectedChatId={selectedChat?._id} />
            </aside>
            {isModalOpen && <NewChatModal onClose={() => setIsModalOpen(false)} onChatCreated={handleChatCreated} />}
        </>
    );
};

export default Sidebar;