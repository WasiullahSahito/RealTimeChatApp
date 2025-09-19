import React from 'react';
import { RiMessage3Fill } from 'react-icons/ri';

const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-full bg-gray-900 p-8">
            <div className="max-w-md w-full text-center bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
                <RiMessage3Fill className="text-blue-500 text-7xl mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-white mb-2">WebApp Chat</h1>
                <p className="text-lg text-gray-400 mb-10">
                    Connect and communicate instantly.
                </p>
                <button
                    onClick={handleLogin}
                    className="flex items-center justify-center gap-4 w-full py-3 px-6 text-base font-semibold border border-gray-600 rounded-lg bg-gray-700 cursor-pointer transition-all duration-300 hover:bg-gray-600 hover:shadow-lg hover:border-gray-500"
                >
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-6 h-6" />
                    Sign in with Google
                </button>
            </div>
            <p className="text-gray-500 mt-8 text-sm">A modern chat experience.</p>
        </div>
    );
};

export default LoginPage;