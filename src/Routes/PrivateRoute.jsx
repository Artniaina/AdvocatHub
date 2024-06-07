import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
    const location = useLocation();
    const isAdminAuthenticated = location.state && location.state.isAdminAuthenticated;
  if (!isAdminAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default PrivateRoute;