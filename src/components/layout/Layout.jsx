import React from "react";
import LeftSideOptimized from "../home/LeftSideOptimized";
import NotificationManager from "../notification/NotificationManager";

const Layout = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar */}
      <LeftSideOptimized />

      {/* Main Content */}
      <main
        className={`ml-16 xl:ml-64 transition-all duration-300 ${className}`}
      >
        {children}
      </main>

      {/* Notification Manager */}
      <NotificationManager />
    </div>
  );
};

export default Layout;
