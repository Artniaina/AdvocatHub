import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, isAdminAuthenticated } = useAuth();

  if (!isAdminAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
