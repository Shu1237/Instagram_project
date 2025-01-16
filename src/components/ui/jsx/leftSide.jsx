import React, { useState, useRef, useEffect } from "react";
import logoInstagram from "../../../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import profileImg from "../../../assets/profilepic.png";
import GestureIcon from "@mui/icons-material/Gesture";
import Menu from "../jsx/menu";
import { Link } from "react-router-dom";
import ModalCreate from "./modalCreate";
import NotificationsDropdown from "./notification";

export default function LeftSide() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="fixed left-0 h-screen border-r border-gray-300 bg-white z-40">
        <div className="flex flex-col h-full px-3 py-8 justify-between w-[244px]">
          {/* Logo Section */}
          <div className="pt-2.5 pb-4">
            <Link to="/">
              <img src={logoInstagram} alt="Instagram" className="w-28" />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1">
            <nav className="space-y-1">
              <Link
                to="/"
                className="flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <HomeIcon className="text-2xl" />
                <span className="text-base font-medium">Home</span>
              </Link>

              <button className="w-full flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors">
                <SearchIcon className="text-2xl" />
                <span className="text-base font-medium">Search</span>
              </button>

              <Link
                to="/explore"
                className="flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ExploreIcon className="text-2xl" />
                <span className="text-base font-medium">Explore</span>
              </Link>

              <Link
                to="/reels"
                className="flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SlowMotionVideoIcon className="text-2xl" />
                <span className="text-base font-medium">Reels</span>
              </Link>

              <Link
                to="/messages"
                className="flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MapsUgcOutlinedIcon className="text-2xl" />
                <span className="text-base font-medium">Messages</span>
              </Link>

              <button
                onClick={() => setIsNotificationsOpen(true)}
                className="w-full flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FavoriteBorderOutlinedIcon className="text-2xl" />
                <span className="text-base font-medium">Notifications</span>
              </button>

              <ModalCreate />

              <Link
                to="/profile"
                className="flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-base font-medium">Profile</span>
              </Link>
            </nav>
          </div>

          {/* Menu Button */}
          <div className="mt-auto">
            <button className="w-full flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors">
              <GestureIcon className="text-2xl" />
              <span className="text-base font-medium">More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      <NotificationsDropdown
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Create Modal */}
      {isModalOpen && (
        <ModalCreate
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

const MenuItem = ({ icon, label }) => (
  <div className="flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full">
    {icon}
    <div className="font-normal text-[16px] text-lg">{label}</div>
  </div>
);
