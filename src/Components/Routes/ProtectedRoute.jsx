import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const isAuthenticated = location.state && location.state.isAuthenticated;
  
  if (!isAuthenticated) {
    return <Navigate to="/"/>;
  }

  return children;
};

export default ProtectedRoute;