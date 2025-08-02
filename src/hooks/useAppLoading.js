import { useState, useEffect } from "react";

export const useAppInitialization = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initializationError, setInitializationError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate app initialization tasks
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you can add any initialization logic like:
        // - Loading user preferences
        // - Checking for updates
        // - Warming up critical services

        setIsInitializing(false);
      } catch (error) {
        console.error("App initialization error:", error);
        setInitializationError(error);
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  return {
    isInitializing,
    initializationError,
  };
};

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (callback, delay = 800) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (callback) callback();
      setIsTransitioning(false);
    }, delay);
  };

  return {
    isTransitioning,
    startTransition,
  };
};
