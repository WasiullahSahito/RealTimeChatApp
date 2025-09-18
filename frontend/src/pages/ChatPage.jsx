// (The logic remains the same, only the container class changes)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import Welcome from '../components/Welcome/Welcome';
import { useAuth } from '../context/AuthContext';

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [socket, setSocket] = useState(null);
    const { currentUser } = useAuth();

    // ... (All logic from the previous answer remains identical)
    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL);
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (socket && currentUser) {
            socket.emit('addUser', currentUser.id);
        }
    }, [socket, currentUser]);

    useEffect(() => {
        const fetchChats = async () => {
            if (!currentUser) return;
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/chats/${currentUser.id}`);
                setChats(data);
            } catch (error) { console.error("Failed to fetch chats", error); }
        };
        fetchChats();
    }, [currentUser]);

    useEffect(() => {
        if (!socket) return;
        const handleReceiveMessage = (message) => {
            setChats(prevChats => {
                const updatedChats = prevChats.map(chat =>
                    chat._id === message.chatId
                        ? { ...chat, latestMessage: message, updatedAt: new Date().toISOString() }
                        : chat
                );
                return updatedChats.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            });
        };
        socket.on('receiveMessage', handleReceiveMessage);
        return () => socket.off('receiveMessage', handleReceiveMessage);
    }, [socket]);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        if (socket && chat) {
            socket.emit('joinChat', chat._id);
        }
    };

    return (
        <div className="flex w-full h-full">
            <Sidebar
                chats={chats}
                onSelectChat={handleSelectChat}
                selectedChat={selectedChat}
                setChats={setChats}
            />
            <main className="flex-grow flex flex-col h-full">
                {selectedChat ? (
                    <ChatWindow chat={selectedChat} socket={socket} />
                ) : (
                    <Welcome />
                )}
            </main>
        </div>
    );
};

export default ChatPage;