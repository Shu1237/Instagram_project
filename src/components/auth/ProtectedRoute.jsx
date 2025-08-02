import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getLocalStorage } from "../../utils/localStorage.util";
import LoadingScreen from "../ui/LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate authentication check with slight delay for smooth UX
    const checkAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Small delay for smooth UX
        const userInfo = getLocalStorage()?.user;
        const authenticated = userInfo && userInfo.user_id;
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
