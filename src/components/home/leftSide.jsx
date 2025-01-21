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
import { Link,useNavigate } from "react-router-dom";
import ModalCreate from "../create/modalCreate";
import NotificationsDropdown from "../notification/notification";
import { useQuery } from "@apollo/client";
import { ME_QUERY, GET_USERS_QUERY } from "../../graphql/query/user.query";

export default function LeftSide() {
  const navigate = useNavigate();
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
  const linkProfile = `/profile/${data?.me?.user_id}`;
  return (
    <div>
      <div className="fixed left-0 h-screen border-r border-gray-600 bg-white z-40">
        <div className="flex flex-col h-full px-3 py-8 justify-between w-[244px]">
          {/* Logo Section */}
          <div className="p-2">
            <Link to="/">
              <img src={logoInstagram} alt="Instagram" className="w-30" />
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1">
            <nav className="space-y-1">
              <MenuItem icon={<HomeIcon className="text-2xl" />} label="Home" />
              {/* <Link
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
              </Link> */}

              <button
                onClick={() => setIsNotificationsOpen(true)}
                className="w-full flex items-center py-3 px-3 space-x-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FavoriteBorderOutlinedIcon className="text-2xl" />
                <span className="text-base font-medium">Notifications</span>
              </button>

              <ModalCreate />

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
    // <div className="fixed ">
    //   <div onClick={() => navigate('/')} className="w-full h-auto flex items-center justify-center cursor-pointer">
    //     <img className="w-[150px] h-auto" src={logoInstagram} alt="logo" />
    //   </div>

    //   <div className="flex flex-col mt-[20px] w-full">

        

    //       <MenuItem onClick={() => navigate('/')}
    //         icon={<HomeIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />}
    //         label="Home"
    //       />
      
    //     <MenuItem
    //       icon={<SearchIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />}
    //       label="Search"
    //     />
    //     <MenuItem onClick={()=>navigate('/explore')}
    //       icon={<ExploreIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />}
    //       label="Explore"
    //     />
    //     <MenuItem onClick={()=>navigate('/reels')}
    //       icon={ <SlowMotionVideoIcon
    //           sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
    //         />
    //       }
    //       label="Reels"
    //     />
    //     <MenuItem onClick={()=>navigate('/messages')}
    //       icon={
    //         <MapsUgcOutlinedIcon
    //           sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
    //         />
    //       }
    //       label="Messages"
    //     />
    //     <MenuItem onClick={()=>setIsNotificationsOpen(true)}
    //       icon={
    //         <FavoriteBorderOutlinedIcon
    //           sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
    //         />
    //       }
    //       label="Notifications"
    //     />
    //     <MenuItem onClick={()=>setIsModalOpen(true)}
    //       icon={
    //         <AddBoxOutlinedIcon
    //           sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
    //         />
    //       }
    //       label="Create"
    //     />

    //     <div className="flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full">
    //       <img
    //         src={profileImg}
    //         alt="Profile"
    //         className="w-[35px] h-[35px] rounded-full mr-[20px]"
    //       />
    //       <Link
    //         to="/profile"
    //         className="font-normal text-[16px] text-lg hover:text-blue-500"
    //       >
    //         Profile
    //       </Link>
    //     </div>

    //     <div className="mt-[50px] w-full">
    //       <MenuItem
    //         icon={
    //           <GestureIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
    //         }
    //         label="Threads"
    //       />
    //       <Menu />
    //     </div>
    //   </div>
    // </div>
  );
}

const MenuItem = ({ icon, label }) => (
  <div className="flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full">
    {icon}
    <div className="font-normal text-[16px] text-lg">{label}</div>
  </div>
);
