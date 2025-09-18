import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            login(token);
            navigate('/chat');
        } else {
            navigate('/');
        }
    }, [searchParams, navigate, login]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <Spinner />
        </div>
    );
};

export default AuthCallback;