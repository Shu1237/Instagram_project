import React, { useState } from "react";
import Image from "../../assets/img3.png";
import Image1 from "../../assets/img2.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import { GET_PROFILE, ME_QUERY } from "../../graphql/query/user.query";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import FooterProfile from './footerProfile'
import HeaderProfile from "./headerProfile";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
export default function RightSideProfile() {
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(ME_QUERY);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      userId: parseInt(id),
    },
    skip: !id,
  });


  const [state, setState] = useState(1);
  const handeleClick = (number) => [setState(number)];

  if (loading)
    return (
      <div className="flex justify-center items-center h-full bg-gray-50">
        <div className="relative w-16 h-16">
          {/* Gradient Spinner */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-transparent border-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
          {/* Inner Circle */}
          <div className="absolute inset-[6px] bg-white rounded-full"></div>
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-[935px] mx-auto px-4 font-sans">
      {/* Profile Header */}
      <HeaderProfile data={data} meData={meData} />

      {/* Story Highlights */}
      <div className="py-8">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col items-center">
            <div className="w-[77px] h-[77px] rounded-full border-2 border-gray-300 flex items-center justify-center mb-2">
              <div className="w-[72px] h-[72px] rounded-full bg-gray-100 flex items-center justify-center">
                <PostAddOutlinedIcon className="text-gray-500" />
              </div>
            </div>
            <span className="text-xs">New</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-gray-200 ">
        <div className="flex justify-center space-x-16">
          <button
            className={`py-4 font-semibold text-sm tracking-wider flex items-center space-x-2 ${state === 1 ? "border-t border-black text-black" : "text-gray-500"
              }`}
            onClick={() => handeleClick(1)}
          >
            <PostAddOutlinedIcon fontSize="small" />
            <span>POSTS</span>
          </button>
          <button
            className={`py-4 font-semibold text-sm tracking-wider flex items-center space-x-2 ${state === 2 ? "border-t border-black text-black" : "text-gray-500"
              }`}
            onClick={() => handeleClick(2)}
          >
            <BookmarkBorderOutlinedIcon fontSize="small" />
            <span>SAVED</span>
          </button>
          <button
            className={`py-4 font-semibold text-sm tracking-wider flex items-center space-x-2 ${state === 3 ? "border-t border-black text-black" : "text-gray-500"
              }`}
            onClick={() => handeleClick(3)}
          >
            <SwitchAccountOutlinedIcon fontSize="small" />
            <span>TAGGED</span>
          </button>
        </div>
      </div>

      {/* post*/}
      {
        state === 1 &&
        <div className="flex justify-center   p-20"  >
          <div className="flex flex-col items-center gap-4">
            <div className="w-[75px] h-[71px] ">
              <svg
                aria-label="Photos of you"
                className="x1lliihq x1n2onr6 x5n08af w-full"
                fill="currentColor"
                height="62"
                role="img"
                viewBox="0 0 96 96"
                width="62"
              >
                <title>Photos of you</title>
                <circle
                  cx="48"
                  cy="48"
                  fill="none"
                  r="47"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M56.826 44.119a8.824 8.824 0 1 1-8.823-8.825 8.823 8.823 0 0 1 8.823 8.825Z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  d="M63.69 67.999a9.038 9.038 0 0 0-9.25-8.998H41.56A9.038 9.038 0 0 0 32.31 68"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M48 20.215c-2.94 0-7.125 8.76-11.51 8.785h-4.705A8.785 8.785 0 0 0 23 37.784v22.428a8.785 8.785 0 0 0 8.785 8.785h32.43A8.785 8.785 0 0 0 73 60.212V37.784A8.785 8.785 0 0 0 64.215 29h-4.704c-4.385-.026-8.57-8.785-11.511-8.785Z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h1 className="font-bold text-3xl">Share Photos </h1>
            <p>When people tag you in photos, they'll appear here. </p>
            <div className="mt-4 text-[#0095F7] hover:text-black" >
              Share your First photo
            </div>
          </div>
        </div>

        

      }
   {/* post pciture */}
      {/* <div className="grid grid-cols-3   p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
        <div className="relative w-[280px] h-[350px] rounded-lg shadow-lg cursor-pointer overflow-hidden group">
          <img
            src={Image1}
            alt="Post"
            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
          />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-5">

            <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <FavoriteOutlinedIcon sx={{ color: 'white' }} />
              <p className="text-white">15</p>
            </div>
            <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <svg
                aria-label="Comment"
                className="x1lliihq x1n2onr6 x5n08af text-white"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Comment</title>
                <path
                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <p className="text-white">15</p>
            </div>
          </div>
        </div>
    
      </div> */}
      {state === 3 && <div className="flex justify-center   p-20"  >
        <div className="flex flex-col items-center gap-4">
          <div className="w-[75px] h-[71px] ">
            <svg
              aria-label="Photos of you"
              className="x1lliihq x1n2onr6 x5n08af w-full"
              fill="currentColor"
              height="62"
              role="img"
              viewBox="0 0 96 96"
              width="62"
            >
              <title>Photos of you</title>
              <circle
                cx="48"
                cy="48"
                fill="none"
                r="47"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M56.826 44.119a8.824 8.824 0 1 1-8.823-8.825 8.823 8.823 0 0 1 8.823 8.825Z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <path
                d="M63.69 67.999a9.038 9.038 0 0 0-9.25-8.998H41.56A9.038 9.038 0 0 0 32.31 68"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M48 20.215c-2.94 0-7.125 8.76-11.51 8.785h-4.705A8.785 8.785 0 0 0 23 37.784v22.428a8.785 8.785 0 0 0 8.785 8.785h32.43A8.785 8.785 0 0 0 73 60.212V37.784A8.785 8.785 0 0 0 64.215 29h-4.704c-4.385-.026-8.57-8.785-11.511-8.785Z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h1 className="font-bold text-3xl">Photo Of you</h1>
          <p>When people tag you in photos, they'll appear here. </p>

        </div>
      </div>}

     






      {/* Footer Links */}
      <FooterProfile />
    </div>
  );
}