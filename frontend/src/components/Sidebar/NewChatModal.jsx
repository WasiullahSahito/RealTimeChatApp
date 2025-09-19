import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { IoClose } from 'react-icons/io5';
import Spinner from '../common/Spinner';
import Avatar from '../common/Avatar';

const NewChatModal = ({ onClose, onChatCreated }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
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

    const handleUserClick = async (userId) => {
        try {
            const { data: chatData } = await axios.post(`${import.meta.env.VITE_API_URL}/api/chats/create`, {
                userId1: currentUser.id,
                userId2: userId,
            });
            onChatCreated(chatData);
        } catch (err) {
            setError('Failed to start chat.');
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md flex flex-col border border-gray-700">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">Start a New Chat</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <IoClose size={24} />
                    </button>
                </div>

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
                                        className="flex items-center p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors"
                                    >
                                        <Avatar user={user} size="sm" />
                                        <span className="font-medium text-gray-200 ml-4">{user.displayName}</span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-gray-400 p-4">No other users found.</p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewChatModal;