import { useState, useEffect } from "react";
import { getLocalStorage } from "../utils/localStorage.util";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = getLocalStorage()?.user;
        if (userData && userData.user_id) {
          setIsAuthenticated(true);
          setUser(userData);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const requireAuth = (callback, fallback) => {
    if (isAuthenticated) {
      return callback;
    } else {
      return (
        fallback ||
        (() => {
          alert("Please login to perform this action");
          window.location.href = "/login";
        })
      );
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    requireAuth,
  };
};
