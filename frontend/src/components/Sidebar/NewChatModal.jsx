import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { IoClose } from 'react-icons/io5';
import Spinner from '../common/Spinner';

const NewChatModal = ({ onClose, onChatCreated }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    // Fetch all users when the modal opens
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
                // Filter out the current user from the list
                setUsers(data.filter(user => user._id !== currentUser.id));
            } catch (err) {
                setError('Failed to fetch users.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [currentUser.id]);

    // Handle clicking a user to create a new chat
    const handleUserClick = async (userId) => {
        try {
            const { data: chatData } = await axios.post(`${import.meta.env.VITE_API_URL}/api/chats/create`, {
                userId1: currentUser.id,
                userId2: userId,
            });
            onChatCreated(chatData); // Pass the new/existing chat data back to the parent
        } catch (err) {
            setError('Failed to start chat.');
            console.error(err);
        }
    };

    return (
        // Modal Overlay
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center backdrop-blur-sm">
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-divider">
                    <h2 className="text-xl font-semibold text-text-primary">New Chat</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-text-secondary hover:bg-gray-200">
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-2 h-96 overflow-y-auto">
                    {loading && <div className="flex justify-center items-center h-full"><Spinner /></div>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {!loading && !error && (
                        <ul>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <li
                                        key={user._id}
                                        onClick={() => handleUserClick(user._id)}
                                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                                    >
                                        <img src={user.image} alt={user.displayName} className="w-10 h-10 rounded-full mr-4" />
                                        <span className="font-medium text-text-primary">{user.displayName}</span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-text-secondary p-4">No other users found.</p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewChatModal;