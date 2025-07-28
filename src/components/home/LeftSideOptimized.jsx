import React, { useState, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Compass,
  Video,
  MessageCircle,
  Heart,
  PlusSquare,
  Menu as MenuIcon,
  Instagram,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import * as localStorageFunctions from "../../utils/localStorage.util.js";
import { useAuth } from "../../hooks/useAuth";
import Menu from "./menu";
import SearchModal from "../ui/jsx/SearchModel.jsx";
import NotificationsDropdown from "../notification/notification";
import ModalCreate from "../create/modalCreate";
import InstagramCreatePost from "../create/InstagramCreatePost";

// Navigation item component
const NavItem = memo(
  ({ icon: Icon, label, onClick, isActive, className, showLabel = true }) => (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full justify-start h-12 px-3 rounded-xl transition-all duration-200",
        isActive && "bg-gray-100 dark:bg-gray-800",
        !showLabel && "w-12 px-0 justify-center",
        className
      )}
    >
      <Icon className={cn("h-6 w-6", showLabel && "mr-4")} />
      {showLabel && <span className="text-base font-normal">{label}</span>}
    </Button>
  )
);
NavItem.displayName = "NavItem";

// Profile section component
const ProfileSection = memo(
  ({ userInfo, onProfileClick, showLabel = true }) => (
    <Button
      variant="ghost"
      onClick={onProfileClick}
      className={cn(
        "w-full justify-start h-12 px-3 rounded-xl transition-all duration-200",
        !showLabel && "w-12 px-0 justify-center"
      )}
    >
      <Avatar className={cn("h-6 w-6", showLabel && "mr-4")}>
        <AvatarImage src={userInfo?.avatar} alt={userInfo?.username} />
        <AvatarFallback className="text-xs">
          {userInfo?.username?.[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showLabel && <span className="text-base font-normal">Profile</span>}
    </Button>
  )
);
ProfileSection.displayName = "ProfileSection";

// Logo component
const Logo = memo(({ isCompact, onClick }) => (
  <div className="flex items-center px-3 py-6 cursor-pointer" onClick={onClick}>
    {isCompact ? (
      <Instagram className="h-8 w-8" />
    ) : (
      <div className="flex items-center">
        <Instagram className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold">Instagram</span>
      </div>
    )}
  </div>
));
Logo.displayName = "Logo";

export default function LeftSide() {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = localStorageFunctions.getLocalStorage()?.user;
  const { isAuthenticated } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(window.innerWidth <= 1280);

  React.useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Debug effect to track location changes
  React.useEffect(() => {
    console.log("Current location:", location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    console.log(`Attempting to navigate to: ${path}`);
    try {
      navigate(path, { replace: true });
      // If navigate doesn't work, force a reload
      setTimeout(() => {
        if (window.location.pathname !== path) {
          console.log("Navigate failed, using window.location");
          window.location.href = path;
        }
      }, 100);
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.href = path;
    }
  };

  const navigationItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
      onClick: () => handleNavigation("/"),
    },
    {
      icon: Search,
      label: "Search",
      onClick: () => {
        console.log("Opening Search");
        setIsSearchOpen(true);
      },
    },
    {
      icon: Compass,
      label: "Explore",
      path: "/explore",
      onClick: () => handleNavigation("/explore"),
    },
    {
      icon: Video,
      label: "Reels",
      path: "/reels",
      onClick: () => handleNavigation("/reels"),
    },
  ];

  const userSpecificItems = userInfo
    ? [
        {
          icon: MessageCircle,
          label: "Messages",
          path: `/message/${userInfo.user_id}/0`,
          onClick: () => handleNavigation(`/message/${userInfo.user_id}/0`),
        },
        {
          icon: Heart,
          label: "Notifications",
          onClick: () => setIsNotificationsOpen(true),
        },
        {
          icon: PlusSquare,
          label: "Create",
          component: <InstagramCreatePost key="create-modal" />,
        },
      ]
    : [];

  return (
    <>
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-40 transition-all duration-300",
          isCompact ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Logo isCompact={isCompact} onClick={() => handleNavigation("/")} />

          {/* Navigation Items */}
          <nav className="flex-1 px-3 space-y-1">
            {navigationItems.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={item.onClick}
                isActive={location.pathname === item.path}
                showLabel={!isCompact}
              />
            ))}

            {/* User-specific items */}
            {userSpecificItems.map((item) =>
              item.component ? (
                <div key={item.label} className="w-full">
                  {item.component}
                </div>
              ) : (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  onClick={item.onClick}
                  isActive={location.pathname === item.path}
                  showLabel={!isCompact}
                />
              )
            )}

            {/* Profile */}
            {userInfo && (
              <ProfileSection
                userInfo={userInfo}
                onProfileClick={() =>
                  handleNavigation(`/profile/${userInfo.user_id}`)
                }
                showLabel={!isCompact}
              />
            )}
          </nav>

          {/* More Menu */}
          {userInfo && (
            <div className="p-3">
              <Menu />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {isNotificationsOpen && (
        <NotificationsDropdown
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          receiverId={userInfo?.user_id}
        />
      )}
    </>
  );
}
