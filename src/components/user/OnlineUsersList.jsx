import React from "react";
import { useOnlineUsers } from "../../hooks/useOnlineStatus";
import OnlineStatusIndicator from "../ui/OnlineStatusIndicator";

const OnlineUsersList = ({ className = "" }) => {
  const { onlineUsers, loading, error } = useOnlineUsers();

  if (loading) {
    return (
      <div className={`p-4 ${className}`}>
        <h3 className="text-lg font-semibold mb-3">Online Users</h3>
        <div className="animate-pulse">
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 ${className}`}>
        <h3 className="text-lg font-semibold mb-3">Online Users</h3>
        <p className="text-red-500 text-sm">Error loading online users</p>
      </div>
    );
  }

  return (
    <div className={`p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-3">
        Online Users ({onlineUsers.length})
      </h3>

      {onlineUsers.length === 0 ? (
        <p className="text-gray-500 text-sm">No users online</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {onlineUsers.map((user) => (
            <div
              key={user.user_id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.full_name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1">
                  <OnlineStatusIndicator
                    isOnline={user.is_online}
                    lastSeen={user.last_seen}
                    size="medium"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.full_name || user.username}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  @{user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnlineUsersList;
