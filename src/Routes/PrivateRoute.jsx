import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
    const location = useLocation();
    const isAdminAuthenticated = location.state && location.state.isAdminAuthenticated;
    const isAuthenticated = location.state && location.state.isAuthenticated;

  if (!isAdminAuthenticated) {
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/" />;
  }
  }
  return <Outlet />;
};

export default PrivateRoute;