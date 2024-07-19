import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/AuthContext";
import Cookies from "universal-cookie";

const ProtectedRoute = () => {
  const cookies = new Cookies();
  const cookieSession = cookies.get("COOKIE_SESSION");
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!cookieSession) {
    console.log("Retour a la page de login");
    return <Navigate to="/" />;
  }

  console.log("Hello non retour");
  return <Outlet />;
};

export default ProtectedRoute;
