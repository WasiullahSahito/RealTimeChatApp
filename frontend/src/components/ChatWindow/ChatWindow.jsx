import React from 'react';
import ChatHeader from './ChatHeader';
import MessageContainer from './MessageContainer';
import MessageInput from './MessageInput';

const ChatWindow = ({ chat, socket }) => {
    if (!chat) return null;
    return (
        <div className="flex flex-col h-full bg-gray-900">
            <ChatHeader chat={chat} />
            <MessageContainer chatId={chat._id} socket={socket} />
            <MessageInput chatId={chat._id} socket={socket} />
        </div>
    );
};

export default ChatWindow;