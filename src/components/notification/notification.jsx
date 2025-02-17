import React from "react";
import { useQuery } from "@apollo/client";
import CloseIcon from "@material-ui/icons/Close";
import { GET_NOTIFICATIONS_QUERY } from "../../graphql/query/notification.query";
import formatTime from "../../utils/formatTime.util.js";
import { Link } from "react-router-dom";
export default function NotificationsDropdown({ isOpen, onClose, receiverId }) {
  const { loading, data } = useQuery(GET_NOTIFICATIONS_QUERY);
  if (!isOpen) return null;
  // console.log(data);
  const dataArray = data?.myNotifications;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />
      <div className="relative w-[400px] h-full bg-white shadow-lg border-l border-gray-200 ">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-base font-semibold">Notifications</h1>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <CloseIcon className="text-lg" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="h-[calc(100vh-60px)] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-500 mb-3">
              This Week
            </h2>
            <div className="space-y-4">
              {loading ? (
                <p>Loading...</p>
              ) : (
                dataArray.map((data) => {
                  return (
                    <NotificationItem
                      key={data.id}
                      avatar={data.sender.avatar}
                      username={data.sender.username}
                      action="starting to follow you"
                      time={formatTime(data.create_at)}
                      sender_id={data.sender.user_id}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ avatar, username, action, time, sender_id }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <Link to={`/profile/${sender_id}`}>
          <img src={avatar} alt="" className="w-11 h-11 rounded-full" />
        </Link>

        <div>
          <p className="text-sm">
            <span className="font-semibold">{username}</span> {action}
            <span className="text-gray-500 ml-1">{time}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
