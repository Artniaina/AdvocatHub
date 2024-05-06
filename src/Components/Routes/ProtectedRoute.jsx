import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const location = useLocation();
    const isAuthenticated = location.state && location.state.isAuthenticated;
    const isAlreadyAutheticated = location.state && location.state.isAlreadyAutheticated;
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;