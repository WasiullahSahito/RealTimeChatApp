import React from 'react';

// Pre-defined Tailwind gradient classes for beautiful default avatars
const gradients = [
    'from-blue-400 to-indigo-500',
    'from-green-400 to-cyan-500',
    'from-pink-500 to-rose-500',
    'from-amber-400 to-orange-500',
    'from-teal-400 to-emerald-500',
    'from-purple-500 to-violet-600',
];

// A simple hash function to get a consistent gradient for each user
const getGradient = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
};

const Avatar = ({ user, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-10 h-10 text-base',
        md: 'w-12 h-12 text-lg',
    };

    if (!user || !user.displayName) return null;

    const initial = user.displayName.charAt(0).toUpperCase();

    return (
        <div className="flex-shrink-0">
            {user.image ? (
                <img
                    className={`${sizeClasses[size]} rounded-full object-cover`}
                    src={user.image}
                    alt={user.displayName}
                />
            ) : (
                <div
                    className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-gradient-to-br ${getGradient(user.displayName)} text-white font-semibold`}
                >
                    {initial}
                </div>
            )}
        </div>
    );
};

export default Avatar;