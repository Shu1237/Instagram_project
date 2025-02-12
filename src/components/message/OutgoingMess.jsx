import React from "react";
import formatTime from "../../utils/formatTime.util";
const OutgoingMessage = ({ message }) => {
  const timeAgo = formatTime(message?.createdAt);
  return (
    <div className="flex items-end justify-end mb-4">
      <div className="flex flex-col items-end ">
        {/* <p className="text-xs text-gray-500 mb-1 font-semibold">
          {message?.user.username}
        </p> */}
        <div className="bg-blue-400 text-white p-2 px-4 rounded-3xl rounded-tr-sm max-w-xs text-sm shadow-sm ">
          <p>{message?.content}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1">{timeAgo}</span>
      </div>
      <div className="w-8 h-8 rounded-full overflow-hidden ml-2">
        <img
          className="w-full h-full object-cover"
          src={message?.user.avatar}
          alt="User"
        />
      </div>
    </div>
  );
};

export default OutgoingMessage;
