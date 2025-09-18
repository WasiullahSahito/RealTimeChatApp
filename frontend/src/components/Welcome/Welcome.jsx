import React from 'react';
import { RiMessage3Fill } from 'react-icons/ri';

const Welcome = () => {
    return (
        <div className="flex-grow flex flex-col justify-center items-center text-center bg-chat-bg p-8">
            <div className="flex flex-col items-center">
                <RiMessage3Fill className="text-accent text-8xl mb-6" />
                <h1 className="text-3xl font-bold text-text-dark">WebApp Chat</h1>
                <p className="text-text-secondary mt-2 max-w-sm">
                    Select a conversation from your sidebar to start chatting, or begin a new conversation with any user.
                </p>
            </div>
        </div>
    );
};

export default Welcome;