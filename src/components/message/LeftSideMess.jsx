import React, { useState, useRef, useEffect } from "react";
import logoInstagram from "../../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import profileImg from "../../assets/profilepic.png";
import Menu from "../home/menu";
import { Link, useNavigate } from "react-router-dom";
import ModalCreate from "../create/modalCreate";
import NotificationsDropdown from "../notification/notification";
import { useQuery } from "@apollo/client";
import { ME_QUERY, GET_USERS_QUERY } from "../../graphql/query/user.query";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
export default function LeftSide() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { loading, error, data } = useQuery(ME_QUERY);
  const modalRef = useRef();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const linkProfile = `/profile/${data?.me?.user_id}`;
  const linkMess = `/message/${data?.me?.user_id}/0`;
  return (
    <div className="fixed left-0 top-0 h-full border-r border-gray-200 bg-white p-4 flex flex-col">
      {/* Instagram Logo */}
      <div
        onClick={() => navigate("/")}
        className="h-[100px] flex items-center pl-3 cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faInstagram}
          className="text-4xl transition-transform hover:scale-105"
        />
      </div>

      {/* Main Menu Items */}
      <div className="flex-1 space-y-2">
        <MenuItem
          onClick={() => navigate("/")}
          icon={<HomeIcon sx={{ fontSize: 28 }} />}
          active={location.pathname === "/"}
        />

        <MenuItem
          icon={<SearchIcon sx={{ fontSize: 28 }} />}
          onClick={() => {
            /* Add search functionality */
          }}
        />

        <MenuItem
          onClick={() => navigate("/explore")}
          icon={<ExploreIcon sx={{ fontSize: 28 }} />}
          active={location.pathname === "/explore"}
        />

        <MenuItem
          onClick={() => navigate("/reels")}
          icon={<SlowMotionVideoIcon sx={{ fontSize: 28 }} />}
          active={location.pathname === "/reels"}
        />

        <MenuItem
          onClick={() => navigate(linkMess)}
          icon={<MapsUgcOutlinedIcon sx={{ fontSize: 28 }} />}
          active={location.pathname === "/messages"}
        />

        <MenuItem
          onClick={() => setIsNotificationsOpen(true)}
          icon={<FavoriteBorderOutlinedIcon sx={{ fontSize: 28 }} />}
        />

        {isNotificationsOpen && (
          <NotificationsDropdown
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
          />
        )}

        <MenuItem
          onClick={() => navigate("/create")}
          icon={<AddBoxOutlinedIcon sx={{ fontSize: 28 }} />}
        />
      </div>

      {/* Profile Section */}
      <div
        onClick={() => navigate(linkProfile)}
        className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <img
          src={profileImg}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>

      {/* More Menu */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <MenuItem
          icon={<MenuOutlinedIcon sx={{ fontSize: 28 }} />}
          onClick={() => {
            /* Handle more menu */
          }}
        />
      </div>
    </div>
  );
}

const MenuItem = ({ icon, onClick, active = false }) => (
  <div
    onClick={onClick}
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
      active ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
    }`}
  >
    <span className={`${active ? "text-black" : "text-gray-700"} mr-4`}>
      {icon}
    </span>
  </div>
);
