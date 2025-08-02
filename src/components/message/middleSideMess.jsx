import React from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import Avatar from "../../assets/profilepic.png";
import UserAvatar from "../../assets/p15.jpg";
import { useNavigate } from "react-router-dom";
import { ME_QUERY, GET_USERS_QUERY } from "../../graphql/query/user.query";
import { GET_ROOMCHATS_QUERY } from "../../graphql/query/roomChat.query";
import { useQuery } from "@apollo/client";

const MiddleSideMess = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(ME_QUERY);
  const {
    loading: roomChatLoading,
    error: roomChatError,
    data: roomChatData,
  } = useQuery(GET_ROOMCHATS_QUERY);
  //handle loading
  if (loading || roomChatLoading) {
    return <p>Loading...</p>;
  }
  //handle error
  if (error || roomChatError) {
    navigate("/login");
  }
  // user information
  const id = data?.me?.user_id;
  const userName = data?.me?.username;
  const avatar = data?.me?.avatar;

  // room chat information
  const roomChats = roomChatData?.roomChats.map((roomChat) => {
    const roomInfo = roomChat.users.find((user) => user.user_id !== id);
    return { ...roomChat, roomInfo };
  });

  // console.log(roomChats);

  return (
    <div className="bg-white border-r border-gray-200 px-6 py-4 w-[380px] h-screen flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-100 pb-4">
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-gray-900">{userName}</span>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <EditNoteOutlinedIcon sx={{ fontSize: 24 }} />
          </button>
        </div>

        {/* Messages Header */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Messages</span>
          <span className="text-sm text-blue-500 cursor-pointer hover:text-blue-600 font-medium">
            Requests
          </span>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto mt-4">
        {roomChats?.map((roomChat) => (
          <div
            key={roomChat._id}
            onClick={() => navigate(`/message/${id}/${roomChat._id}`)}
            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all duration-200 mb-2"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100">
                <img
                  className="w-full h-full object-cover"
                  src={roomChat?.roomInfo?.avatar}
                  alt="User"
                />
              </div>
              {/* Online status indicator */}
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-sm" />
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-base font-semibold text-gray-900 truncate">
                  {roomChat.roomInfo.username}
                </span>
                <span className="text-xs text-gray-500 font-medium">2m</span>
              </div>
              <p className="text-sm text-gray-600 truncate">Active now</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiddleSideMess;
