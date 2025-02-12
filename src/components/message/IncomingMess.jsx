import React from "react";
import formatTime from "../../utils/formatTime.util";
const IncomingMessage = ({ message }) => {
  const timeAgo = formatTime(message?.createdAt);
  return (
    <div className="flex items-start mb-4">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={message?.user?.avatar}
          alt="User"
        />
      </div>
      <div className="ml-3">
        <p className="text-xs text-gray-500 mb-1 font-semibold">
          {message?.user?.username}
        </p>
        <div className="bg-gray-100 p-2 px-4 rounded-3xl rounded-tl-sm max-w-xs text-sm shadow-sm">
          <p>{message?.content}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1">{timeAgo}</span>
      </div>
    </div>
  );
};

export default IncomingMessage;
