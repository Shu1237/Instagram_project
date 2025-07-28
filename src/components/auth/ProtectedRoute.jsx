import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getLocalStorage } from "../../utils/localStorage.util";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check authentication status
  const checkAuth = () => {
    try {
      const userInfo = getLocalStorage()?.user;
      return userInfo && userInfo.user_id;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  };

  const isAuthenticated = checkAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
