import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';
import Avatar from '../common/Avatar';

const UserProfile = () => {
    const { currentUser, logout } = useAuth();
    if (!currentUser) return null;

    return (
        <header className="flex items-center p-4 bg-gray-900/50">
            <Avatar user={currentUser} size="sm" />
            <div className="flex-grow ml-3">
                <span className="font-semibold text-white">{currentUser.displayName}</span>
                {/* Optional status indicator */}
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-400">Online</span>
                </div>
            </div>
            <button onClick={logout} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors" title="Logout">
                <FiLogOut size={20} />
            </button>
        </header>
    );
};

export default UserProfile;