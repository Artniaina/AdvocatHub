import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Hooks/AuthContext'; 
import Cookies from "universal-cookie";

const PartialProtectedRoute = () => {
    const cookies = new Cookies();
    const cookieSession = cookies.get('COOKIE_SESSION');
    const {isSimpleAuthenticated} =useAuth()

    if (cookieSession =="" || !isSimpleAuthenticated) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default PartialProtectedRoute;
