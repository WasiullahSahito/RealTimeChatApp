import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Message = ({ message }) => {
    const { currentUser } = useAuth();
    const isSentByCurrentUser = message.sender._id === currentUser.id;

    // ... (styling classes remain the same)
    const wrapperClasses = `flex items-end gap-2 mb-4 ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`;
    const messageClasses = `relative py-2.5 px-4 rounded-3xl max-w-[70%] text-sm leading-relaxed shadow-md ${isSentByCurrentUser
            ? 'bg-blue-600 text-white rounded-br-lg'
            : 'bg-gray-700 text-gray-200 rounded-bl-lg'
        }`;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const renderContent = () => {
        // The message.content will now be a full URL like "http://localhost:5000/uploads/..."
        const fullUrl = message.content;

        switch (message.type) {
            case 'image':
                return (
                    <img
                        src={fullUrl} // Use the full URL directly
                        alt="Sent media"
                        className="rounded-lg max-w-xs cursor-pointer object-cover"
                        onClick={() => window.open(fullUrl, '_blank')}
                    />
                );
            case 'video':
                return (
                    <video controls className="rounded-lg max-w-xs">
                        <source src={fullUrl} />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'audio':
                return (
                    <audio controls className="w-64">
                        <source src={fullUrl} />
                        Your browser does not support the audio element.
                    </audio>
                );
            default:
                return <p className="break-words">{message.content}</p>;
        }
    };

    return (
        <div className={wrapperClasses}>
            <div className={messageClasses}>
                {renderContent()}
                <span className={`text-xs mt-1.5 block text-right ${isSentByCurrentUser ? 'text-blue-200' : 'text-gray-400'}`}>
                    {formatDate(message.createdAt)}
                </span>
            </div>
        </div>
    );
};

export default Message;