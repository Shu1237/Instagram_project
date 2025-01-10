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
import { useQuery } from "@apollo/client";
import { ME_QUERY, GET_USERS_QUERY } from "../../../graphql/query/user.query";
import NotificationsDropdown from "./Notification";

export default function LeftSide() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { loading, error, data } = useQuery(ME_QUERY);
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="relative w-12 h-12">
          {/* Outer Circle */}
          <div className="absolute inset-0 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
          {/* Inner Circle (optional for aesthetic) */}
          <div className="absolute inset-[4px] border-4 border-gray-100 rounded-full"></div>
        </div>
      </div>
    );

  const linkProfile = `/profile/${data?.me?.user_id}`;
  return (
    <>
      <div
        className={`fixed left-0 h-screen border-r border-gray-300 bg-white z-40 transition-transform duration-300 ${
          isNotificationsOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
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

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <AddBoxOutlinedIcon className="text-2xl" />
                <span className="text-base font-medium">Create</span>
              </button>

              <Link
                to={linkProfile}
                className="flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img
                  src={data?.me?.avatar || profileImg}
                  alt="profile"
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

        {/* Create Modal */}
        {isModalOpen && (
          <ModalCreate
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>

      {/* Notifications Modal */}
      <div
        ref={modalRef}
        className={`fixed left-[70px] h-screen w-[400px] bg-white border-r border-gray-300 z-30 transition-transform duration-300 ${
          isNotificationsOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          {/* Notifications content */}
        </div>
      </div>

      {/* Overlay */}
      {isNotificationsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20"
          onClick={() => setIsNotificationsOpen(false)}
        />
      )}
    </>
  );
}
