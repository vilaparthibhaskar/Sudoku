import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children }){
    const isAuthenticated = useSelector((state) => state.user.loggedin);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
