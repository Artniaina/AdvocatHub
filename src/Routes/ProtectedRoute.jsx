import React from 'react';
import { Navigate,Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = location.state && location.state.isAuthenticated;
    console.log(`Protected Route ${isAuthenticated}`);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

  return <Outlet />;
};

export default ProtectedRoute;
