import React from "react";
import { formatDistanceToNow } from "date-fns";

const OnlineStatusIndicator = ({
  isOnline,
  lastSeen,
  size = "small",
  showText = false,
}) => {
  const sizeClasses = {
    small: "w-2 h-2",
    medium: "w-3 h-3",
    large: "w-4 h-4",
  };

  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return "Last seen unknown";
    return `Last seen ${formatDistanceToNow(new Date(lastSeen), {
      addSuffix: true,
    })}`;
  };

  if (showText) {
    return (
      <div className="flex items-center space-x-2">
        <div
          className={`${sizeClasses[size]} rounded-full ${
            isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        />
        <span className="text-sm text-gray-600">
          {isOnline ? "Online" : formatLastSeen(lastSeen)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full ${
        isOnline ? "bg-green-500" : "bg-gray-400"
      } border-2 border-white`}
      title={isOnline ? "Online" : formatLastSeen(lastSeen)}
    />
  );
};

export default OnlineStatusIndicator;
