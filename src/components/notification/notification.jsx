import React from "react";
import { useSubscription } from "@apollo/client";
import { NEW_NOTIFICATIONS } from "../../graphql/subscriptions/notification.subcription";
import CloseIcon from "@material-ui/icons/Close";
export default function NotificationsDropdown({
  isOpen,
  onClose,
  senderId,
  receiverId,
}) {
  const { data, loading } = useSubscription(NEW_NOTIFICATIONS, {
    variables: { senderId: senderId, receiverId: receiverId },
  });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />
      <div className="relative w-[400px] h-full bg-white shadow-lg border-l border-gray-200">
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
                data?.newNotification && (
                  <NotificationItem
                    avatar={data.newNotification.sender.avatar}
                    username={data.newNotification.sender.username}
                    action="sent you a friend request."
                    time={data.newNotification.created_at}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ avatar, username, action, time }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <img src={avatar} alt="" className="w-11 h-11 rounded-full" />
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
