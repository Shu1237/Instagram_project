import { useNavigate } from "react-router-dom";
import IncomingMessage from "./IncomingMess";
import OutgoingMessage from "./OutgoingMess";
import { useEffect, useRef } from "react";

export default function BodySection({
  id,
  myFriendInfo,
  messages,
  typingStatus,
}) {
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 mt-6">
          <img
            className="w-full h-full rounded-[50%]"
            src={myFriendInfo?.avatar}
            alt=""
          />
        </div>
        <h1 className="mt-2 text-lg font-medium">{myFriendInfo?.full_name}</h1>
        <p className="text-base text-gray-400">
          {myFriendInfo?.username} · SocialWave
        </p>
        <div className="m-5">
          <button
            className="bg-gray-200 p-[5px_12px] rounded-md text-sm font-medium"
            onClick={() => navigate(`/profile/${myFriendInfo?.user_id}`)}
          >
            View Profile
          </button>
        </div>
      </div>
      {/* Messages */}
      <div className="w-full p-4 overflow-y-auto">
        {messages?.map((message) =>
          message.user.user_id !== id ? (
            <IncomingMessage key={message.id} message={message} />
          ) : (
            <OutgoingMessage key={message.id} message={message} />
          )
        )}
        {/* Thẻ ẩn để cuộn xuống */}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      {typingStatus && (
        <div className="text-gray-500 text-sm mt-2">
          {myFriendInfo?.username} is typing...
        </div>
      )}
    </div>
  );
}
