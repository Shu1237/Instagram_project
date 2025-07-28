import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import * as localStorageFunctions from "../../utils/localStorage.util.js";

const MobileNavItem = ({ icon: Icon, isActive, onClick, className }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    className={cn(
      "h-12 w-12 transition-colors",
      isActive && "text-blue-500",
      className
    )}
  >
    <Icon className="h-6 w-6" />
  </Button>
);

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = localStorageFunctions.getLocalStorage()?.user;

  const navItems = [
    {
      icon: Home,
      path: "/",
      onClick: () => navigate("/"),
    },
    {
      icon: Search,
      onClick: () => {
        // Handle search
      },
    },
    {
      icon: PlusSquare,
      onClick: () => {
        // Handle create
      },
    },
    {
      icon: Heart,
      onClick: () => {
        // Handle notifications
      },
    },
    {
      icon: User,
      path: `/profile/${userInfo?.user_id}`,
      onClick: () => userInfo && navigate(`/profile/${userInfo.user_id}`),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item, index) => (
          <MobileNavItem
            key={index}
            icon={item.icon}
            isActive={location.pathname === item.path}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
