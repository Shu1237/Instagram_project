import React from "react";
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
import { Link } from "react-router-dom"; // Import Link tại đây

export default function LeftSide() {
  return (
    <div className="fixed ">
      <div className="w-full h-auto flex items-center justify-center">
        <img className="w-[150px] h-auto" src={logoInstagram} alt="logo" />
      </div>

      <div className="flex flex-col mt-[20px] w-full">
        <Link to="/" className="w-full">
          <MenuItem
            icon={<HomeIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />}
            label="Home"
          />
        </Link>
        <MenuItem
          icon={<SearchIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />}
          label="Search"
        />
        <MenuItem
          icon={<ExploreIcon sx={{ fontSize: "35px", margin: "0 20px 0 0" }} />}
          label="Explore"
        />
        <MenuItem
          icon={
            <SlowMotionVideoIcon
              sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
            />
          }
          label="Reels"
        />
        <MenuItem
          icon={
            <MapsUgcOutlinedIcon
              sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
            />
          }
          label="Messages"
        />
        <MenuItem
          icon={
            <FavoriteBorderOutlinedIcon
              sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
            />
          }
          label="Notifications"
        />
        <MenuItem
          icon={
            <AddBoxOutlinedIcon
              sx={{ fontSize: "35px", margin: "0 20px 0 0" }}
            />
          }
          label="Create"
        />

        <div className="flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full">
          <img
            src={profileImg}
            alt="Profile"
            className="w-[35px] h-[35px] rounded-full mr-[20px]"
          />
          <Link
            to="/profile"
            className="font-normal text-[16px] text-lg hover:text-blue-500"
          >
            Profile
          </Link>
        </div>

        <div className="mt-[20px] w-full">
          <MenuItem
            icon={
              <GestureIcon sx={{ fontSize: "30px", margin: "0 20px 0 0" }} />
            }
            label="Threads"
          />
          <Menu />
        </div>
      </div>
    </div>
  );
}
const MenuItem = ({ icon, label }) => (
  <div className="flex h-[40px] items-center px-[30px] rounded-[5px] cursor-pointer mb-[20px] hover:bg-[#ededed] w-full">
    {icon}
    <div className="font-normal text-[16px] text-lg">{label}</div>
  </div>
);
