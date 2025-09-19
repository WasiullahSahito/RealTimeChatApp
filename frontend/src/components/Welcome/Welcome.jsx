import React from 'react';
import { RiMessage3Fill } from 'react-icons/ri';

const Welcome = () => {
    return (
        <div className="flex-grow flex flex-col justify-center items-center text-center bg-chat-pattern p-8">
            <div className="flex flex-col items-center bg-gray-800/50 p-12 rounded-2xl border border-gray-700 shadow-xl backdrop-blur-sm">
                <RiMessage3Fill className="text-blue-500 text-8xl mb-6" />
                <h1 className="text-3xl font-bold text-white">Welcome to WebApp Chat</h1>
                <p className="text-gray-400 mt-2 max-w-sm">
                    Select a conversation or start a new one to begin messaging.
                </p>
            </div>
        </div>
    );
};

export default Welcome;