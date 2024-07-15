import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Hooks/AuthContext'; 

const ProtectedRoute1 = ({ children }) => {
    const { isSimpleAuthenticated } = useAuth();
    
    if (!isSimpleAuthenticated) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default ProtectedRoute1;
