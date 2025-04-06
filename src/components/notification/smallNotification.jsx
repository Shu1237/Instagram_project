import React, { useEffect } from "react";
import formatTime from "../../utils/formatTime.util.js";
const SmallNotification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-white text-black px-6 py-4 rounded-lg shadow-xl z-50 flex items-center space-x-4 border border-gray-200 hover:scale-105 transition-transform duration-200 ease-in-out">
      <img
        src={notification?.sender?.avatar}
        alt="Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col space-y-1">
        <p className="font-semibold text-lg text-gray-800">
          {notification?.sender?.username}
        </p>
        {(notification?.type === "follow" ||
          notification?.type === "accepted") && (
          <p className="text-gray-600">Đã bắt đầu follow bạn</p>
        )}
        {notification?.type === "comment" && (
          <p className="text-gray-600">Đã bình luận bài viết của bạn</p>
        )}
        {notification?.type === "reply" && (
          <p className="text-gray-600">Đã trả lời bình luận của bạn</p>
        )}
        {notification?.type === "mention" && (
          <p className="text-gray-600">Đã nhắc đến bạn trong bình luận</p>
        )}
        {notification?.type === "share" && (
          <p className="text-gray-600">Đã chia sẻ bài viết của bạn</p>
        )}
        {notification?.type === "like" && (
          <p className="text-gray-600">Đã thích bài viết của bạn</p>
        )}

        <p className="text-sm text-gray-400">
          {formatTime(notification?.create_at)}
        </p>
      </div>
    </div>
  );
};

export default SmallNotification;
