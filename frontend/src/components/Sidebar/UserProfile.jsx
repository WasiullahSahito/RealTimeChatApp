import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';
import Avatar from '../common/Avatar'; // Import our new Avatar component

const UserProfile = () => {
    const { currentUser, logout } = useAuth();
    if (!currentUser) return null;

    return (
        <div className="flex items-center p-4 border-b border-divider">
            <Avatar user={currentUser} size="sm" />
            <div className="flex-grow ml-4">
                <span className="font-semibold">{currentUser.name}</span>
            </div>
            <button onClick={logout} className="p-2 rounded-full text-text-secondary hover:bg-[#374151] hover:text-white" title="Logout">
                <FiLogOut size={20} />
            </button>
        </div>
    );
};

export default UserProfile;