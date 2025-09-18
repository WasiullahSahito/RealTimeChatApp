import React from 'react';
import ChatListItem from './ChatListItem';

const ChatList = ({ chats, onSelectChat, selectedChatId }) => {
    return (
        <ul className="flex-grow overflow-y-auto">
            {chats.map(chat => (
                <ChatListItem
                    key={chat._id}
                    chat={chat}
                    onSelectChat={onSelectChat}
                    isActive={chat._id === selectedChatId}
                />
            ))}
        </ul>
    );
};
export default ChatList;