import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Message = ({ message }) => {
    const { currentUser } = useAuth();
    const isSentByCurrentUser = message.sender._id === currentUser.id;

    const wrapperClasses = `flex mb-4 ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`;
    const messageClasses = `py-2 px-4 rounded-2xl max-w-[70%] text-sm ${isSentByCurrentUser
            ? 'bg-message-sent text-white rounded-br-lg'
            : 'bg-message-received text-text-dark shadow-sm rounded-bl-lg'
        }`;

    return (
        <div className={wrapperClasses}>
            <div className={messageClasses}>
                <p>{message.content}</p>
                {/* Optional: Add timestamp here */}
            </div>
        </div>
    );
};

export default Message;