import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import Spinner from '../common/Spinner';

const MessageContainer = ({ chatId, socket }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    // ... (Logic is identical)
    useEffect(() => {
        setMessages([]);
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/chats/messages/${chatId}`);
                setMessages(data);
            } catch (error) { console.error("Failed to fetch messages", error); }
            finally { setLoading(false); }
        };
        fetchMessages();
    }, [chatId]);

    useEffect(() => {
        if (!socket) return;
        const messageListener = (newMessage) => {
            if (newMessage.chatId === chatId) {
                setMessages(prev => [...prev, newMessage]);
            }
        };
        socket.on('receiveMessage', messageListener);
        return () => socket.off('receiveMessage', messageListener);
    }, [socket, chatId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    if (loading) return <div className="flex justify-center items-center h-full"><Spinner /></div>;

    return (
        <div className="flex-grow p-4 md:p-6 lg:p-8 overflow-y-auto bg-chat-pattern">
            {messages.map(msg => (
                <Message key={msg._id || Date.now()} message={msg} />
            ))}
            <div ref={scrollRef} />
        </div>
    );
};
export default MessageContainer;