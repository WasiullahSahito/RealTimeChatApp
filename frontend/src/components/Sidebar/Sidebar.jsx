import React, { useState } from 'react';
import UserProfile from './UserProfile';
import ChatList from './ChatList';
import NewChatModal from './NewChatModal';
import { RiChatNewLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ chats, onSelectChat, selectedChat, setChats }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { currentUser } = useAuth();

    const handleChatCreated = (newChat) => {
        setChats(prevChats => {
            const chatExists = prevChats.some(chat => chat._id === newChat._id);
            if (chatExists) {
                // If chat exists, move it to the top
                return [newChat, ...prevChats.filter(c => c._id !== newChat._id)];
            }
            // Otherwise, add it as a new chat at the top
            return [newChat, ...prevChats];
        });
        onSelectChat(newChat);
        setIsModalOpen(false);
    };

    const filteredChats = chats.filter(chat => {
        const partner = chat.participants.find(p => p._id !== currentUser.id);
        return partner?.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <aside className="flex flex-col h-full w-[30%] min-w-[320px] max-w-[420px] bg-gray-800 border-r border-gray-700">
                <UserProfile />
                <div className="p-4 border-b border-gray-700">
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search or start a new chat"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-900 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center px-4 pt-4 pb-2">
                    <h2 className="text-xl font-bold text-white">Chats</h2>
                    <button onClick={() => setIsModalOpen(true)} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors" title="New Chat">
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