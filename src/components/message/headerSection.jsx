import { FiVideo, FiPhone } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function HeaderSection({ myFriendInfo }) {
  const navigate = useNavigate();
  const { idfr } = useParams();
  const startVideoCall = () => {
    navigate("/video-call/" + idfr);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={myFriendInfo?.avatar}
            alt="User avatar"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {myFriendInfo?.full_name}
          </h2>
          <p className="text-sm text-green-500 font-medium">Active now</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
          <FiPhone className="w-5 h-5 text-gray-600 hover:text-blue-500" />
        </button>
        <button
          className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          onClick={startVideoCall}
        >
          <FiVideo className="w-5 h-5 text-gray-600 hover:text-blue-500" />
        </button>
        <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
          <BsThreeDotsVertical className="w-5 h-5 text-gray-600 hover:text-blue-500" />
        </button>
      </div>
    </div>
  );
}
