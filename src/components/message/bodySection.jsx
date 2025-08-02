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
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Chat introduction */}
      <div className="flex flex-col items-center py-6 px-6 border-b border-gray-100">
        <div className="w-16 h-16">
          <img
            className="w-full h-full rounded-full object-cover"
            src={myFriendInfo?.avatar}
            alt=""
          />
        </div>
        <h1 className="mt-2 text-lg font-semibold text-gray-900">
          {myFriendInfo?.full_name}
        </h1>
        <p className="text-sm text-gray-500">
          {myFriendInfo?.username} · SocialWave
        </p>
        <div className="mt-3">
          <button
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            onClick={() => navigate(`/profile/${myFriendInfo?.user_id}`)}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4">
        {messages?.map((message) =>
          message.user.user_id !== id ? (
            <IncomingMessage key={message.id} message={message} />
          ) : (
            <OutgoingMessage key={message.id} message={message} />
          )
        )}
        {/* Auto scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      {typingStatus && (
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-2 text-gray-500 text-sm max-w-[70%]">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={myFriendInfo?.avatar}
                alt=""
              />
            </div>
            <div className="bg-gray-200 p-3 rounded-2xl rounded-tl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
