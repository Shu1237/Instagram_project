import React from "react";

export default function NotificationsDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="absolute left-[70px] top-[360px] w-[400px] bg-white rounded-xl shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 max-h-[362px] overflow-y-auto">
          <h3 className="font-semibold text-base mb-4">Notifications</h3>

          <div className="space-y-4">
            {/* This week */}
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">
                This Week
              </p>
              <div className="space-y-3">
                <NotificationItem
                  avatar="/path-to-avatar.jpg"
                  username="user123"
                  action="started following you."
                  time="2d"
                  isFollowBack
                />
              </div>
            </div>

            {/* This month */}
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">
                This Month
              </p>
              <div className="space-y-3">
                <NotificationItem
                  avatar="/path-to-avatar.jpg"
                  username="another_user"
                  action="liked your photo."
                  time="1w"
                  postImage="/path-to-post.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({
  avatar,
  username,
  action,
  time,
  isFollowBack,
  postImage,
}) {
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
      {isFollowBack && (
        <button className="px-4 py-1.5 bg-blue-500 text-white text-sm font-semibold rounded">
          Follow
        </button>
      )}
      {postImage && (
        <img src={postImage} alt="" className="w-11 h-11 object-cover" />
      )}
    </div>
  );
}
