import React from 'react';

const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-full text-center text-text-primary">
            <h1 className="text-4xl font-bold mb-2">WebApp Chat</h1>
            <p className="text-lg text-text-secondary mb-10">Connect and communicate instantly.</p>
            <button
                onClick={handleLogin}
                className="flex items-center gap-4 py-3 px-6 text-base border border-divider rounded-lg bg-white cursor-pointer transition hover:bg-gray-50 hover:shadow-sm"
            >
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-6" />
                Sign in with Google
            </button>
        </div>
    );
};

export default LoginPage;