import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  // Get the current user from the user context
  const { user } = useUser();
  const location = useLocation();

  // If there's no user (not logged in), redirect to login page
  if (!user.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user's role is not in the allowed roles, redirect to unauthorized page
  if (user.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If the user is logged in and authorized, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;