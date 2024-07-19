import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/AuthContext";

const PartialProtectedRoute = () => {
  const { isSimpleAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSimpleAuthenticated) {
    console.log("Retour a la page de login");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PartialProtectedRoute;

