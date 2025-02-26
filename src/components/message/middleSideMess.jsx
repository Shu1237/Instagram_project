import React from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import Avatar from "../../assets/profilepic.png";
import story from "../../story.json";
import UserAvatar from "../../assets/p15.jpg";
import { useNavigate } from "react-router-dom";
import { ME_QUERY, GET_USERS_QUERY } from "../../graphql/query/user.query";
import { GET_ROOMCHATS_QUERY } from "../../graphql/query/roomChat.query";
import { useQuery } from "@apollo/client";

const MiddleSideMess = () => {
  const stories = story.story;
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
    <div className="border-r border-gray-300 px-6 py-4 w-[350px] h-screen flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <div className="flex justify-between items-center max-md:hidden">
          <span className="text-xl font-bold">{userName}</span>
          <EditNoteOutlinedIcon sx={{ fontSize: 30 }} />
        </div>

        {/* Story Section */}
        <div className="mt-6 max-md:hidden">
          <div className="flex flex-row gap-4 overflow-y-auto scrollbar-hide max-w-full">
            <div className="relative flex flex-col items-center">
              <div className="absolute right-3 top-[-8px] pt-2 bg-white rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="Note..."
                  className="w-10 rounded-lg h-auto"
                />
              </div>
              <div className="w-[60px] h-[60px] rounded-full border border-gray-300 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={avatar}
                  alt="story"
                />
              </div>
              <span className="text-sm text-gray-500 mt-1">Your note</span>
            </div>
            {stories.map((story, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="w-[60px] h-[60px] rounded-full border border-gray-300 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={story.img}
                    alt={story.name}
                  />
                </div>
                <span className="text-sm text-gray-700 mt-1">{story.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Header */}
        <div className="mt-6 max-md:hidden">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Messages</span>
            <span className="text-sm text-gray-500 cursor-pointer">
              Requests
            </span>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {roomChats?.map((roomChat) => (
          <div
            key={roomChat._id}
            onClick={() => navigate(`/message/${id}/${roomChat._id}`)}
            className="group flex items-center gap-3 p-2 transition-all duration-300 hover:bg-gray-100 rounded-lg cursor-pointer relative overflow-hidden"
          >
            {/* Hover effect layer */}
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full border-2 border-white ring-1 ring-gray-200 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={roomChat?.roomInfo?.avatar}
                  alt="User"
                />
              </div>
              {/* Online status indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800 truncate">
                  {roomChat.roomInfo.username}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1" />
                Active 7m ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiddleSideMess;
