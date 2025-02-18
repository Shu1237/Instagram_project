import React, { useState, useRef, useEffect } from "react";
import logoInstagram from "../../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import profileImg from "../../assets/profilepic.png";
import GestureIcon from "@mui/icons-material/Gesture";
import Menu from "./menu";
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
      setIsSmallScreen(window.innerWidth <= 1280);
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
    <div className="fixed">
      <div
        onClick={() => navigate("/")}
        className="w-full h-auto flex items-center justify-center cursor-pointer max-lg:justify-start max-lg:w-8"
      >
        {isSmallScreen ? (
          <FontAwesomeIcon icon={faInstagram} className="text-[38px]" /> //
        ) : (
          <img
            src={logoInstagram}
            alt="Instagram"
            className="w-[150px] h-auto max-xl:w-full"
          />
        )}
      </div>

      <div className="flex flex-col mt-[20px] w-full ">
        <MenuItem
          onClick={() => navigate("/")}
          icon={<HomeIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />}
          label="Home"
        />

        <MenuItem
          icon={<SearchIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />}
          label="Search"
        />
        <MenuItem
          onClick={() => navigate("/explore")}
          icon={<ExploreIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />}
          label="Explore"
        />
        <MenuItem
          onClick={() => navigate("/reels")}
          icon={
            <SlowMotionVideoIcon
              sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
            />
          }
          label="Reels"
        />
        <MenuItem
          onClick={() => navigate(linkMess)}
          icon={
            <MapsUgcOutlinedIcon
              sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
            />
          }
          label="Messages"
        />
        <MenuItem
          onClick={() => setIsNotificationsOpen(true)}
          icon={
            <FavoriteBorderOutlinedIcon
              sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
            />
          }
          label="Notifications"
        />

        {isNotificationsOpen && (
          <NotificationsDropdown
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            receiverId={data?.me?.user_id}
          />
        )}

        <ModalCreate />

        <div
          onClick={() => navigate(linkProfile)}
          className=" max-xl:w-8 max-xl:px-0 flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full"


        >
          <img
            src={profileImg}
            alt="Profile"
            className="w-[35px] h-[35px] rounded-full mr-[20px]"
          />
          <div className="font-normal text-[16px] text-lg max-xl:hidden">
            Profile
          </div>
        </div>

        <div className="mt-[50px] w-full ">
          {/* <MenuItem
            className="max-xl:hidden" 
            icon={
              <GestureIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
            }
            label="Threads"
          /> */}
          <Menu />
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full 
    max-xl:w-8 max-xl:px-0
   "
  >
    {icon}
    <div className="font-normal text-[16px] text-lg max-xl:hidden">{label}</div>
  </div>
);
