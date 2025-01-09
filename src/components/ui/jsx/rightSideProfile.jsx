import React, { useState } from "react";
import Image from "../../../assets/img1.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import { GET_PROFILE, ME_QUERY } from "../../../graphql/query/user.query.js";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

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

  const footers = [
    "Meta",
    "About",
    "Blog",
    "Jobs",
    "Help",
    "API",
    "Privacy",
    "Terms",
    "Locations",
    "Instagram Lite",
    "Threads",
    "Contact Uploading & Non-Users",
    "Meta Verified",
  ];
  const [state, setState] = useState(1);
  const handeleClick = (number) => [setState(number)];

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin">Loading...</div>
      </div>
    );

  return (
    <div className="w-full max-w-[935px] mx-auto px-4 font-sans">
      {/* Profile Header */}
      <div className="flex items-start py-8 border-b border-gray-200">
        {/* Avatar Section */}
        <div className="flex-shrink-0 mr-8">
          <div className="w-[150px] h-[150px] rounded-full border border-gray-200 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={data?.user?.avatar}
              alt={data?.user?.username}
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-grow">
          <div className="flex items-center mb-4 space-x-4">
            <h2 className="text-xl font-light">{data?.user?.username}</h2>
            {parseInt(meData?.me?.user_id) !==
              parseInt(data?.user?.user_id) && (
              <button className="px-4 py-1.5 bg-blue-500 text-white font-semibold rounded">
                Follow
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex space-x-8 mb-4">
            <span>
              <strong>0</strong> posts
            </span>
            <span>
              <strong>0</strong> followers
            </span>
            <span>
              <strong>0</strong> following
            </span>
          </div>

          <div className="font-semibold">{data?.user?.full_name}</div>
        </div>
      </div>

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
      <div className="border-t border-gray-200">
        <div className="flex justify-center space-x-16">
          <button
            className={`py-4 font-semibold text-sm tracking-wider flex items-center space-x-2 ${
              state === 1 ? "border-t border-black text-black" : "text-gray-500"
            }`}
            onClick={() => handeleClick(1)}
          >
            <PostAddOutlinedIcon fontSize="small" />
            <span>POSTS</span>
          </button>
          <button
            className={`py-4 font-semibold text-sm tracking-wider flex items-center space-x-2 ${
              state === 2 ? "border-t border-black text-black" : "text-gray-500"
            }`}
            onClick={() => handeleClick(2)}
          >
            <BookmarkBorderOutlinedIcon fontSize="small" />
            <span>SAVED</span>
          </button>
          <button
            className={`py-4 font-semibold text-sm tracking-wider flex items-center space-x-2 ${
              state === 3 ? "border-t border-black text-black" : "text-gray-500"
            }`}
            onClick={() => handeleClick(3)}
          >
            <SwitchAccountOutlinedIcon fontSize="small" />
            <span>TAGGED</span>
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-8">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
          {footers.map((footer, index) => (
            <a key={index} href="#" className="hover:underline">
              {footer}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
