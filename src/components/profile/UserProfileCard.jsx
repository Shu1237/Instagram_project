import React, { memo } from "react";
import { Link } from "react-router-dom";
import { UserPlus, UserCheck, UserMinus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useFollowStatus } from "../hooks/useFollowStatus";

const UserProfileCard = memo(
  ({ user, currentUserId, showFollowButton = true }) => {
    const {
      followStatus,
      isLoading,
      handleFollowAction,
      getFollowButtonConfig,
    } = useFollowStatus(user.user_id, currentUserId);

    const buttonConfig = getFollowButtonConfig();
    const isOwnProfile = parseInt(currentUserId) === parseInt(user.user_id);

    const getIconComponent = () => {
      switch (followStatus) {
        case "Following":
          return UserCheck;
        case "Pending":
          return UserMinus;
        default:
          return UserPlus;
      }
    };

    const IconComponent = getIconComponent();

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Avatar */}
            <Link to={`/profile/${user.user_id}`}>
              <Avatar className="w-20 h-20 border-2 border-gray-100 dark:border-gray-800">
                <AvatarImage
                  src={user.avatar}
                  alt={user.username}
                  className="object-cover"
                />
                <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.username[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>

            {/* User Info */}
            <div className="space-y-1">
              <Link
                to={`/profile/${user.user_id}`}
                className="block font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {user.username}
              </Link>
              {user.full_name && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.full_name}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>
                <strong>{user.posts?.length || 0}</strong> posts
              </span>
              <span>
                <strong>{user.followers?.length || 0}</strong> followers
              </span>
            </div>

            {/* Follow Button */}
            {showFollowButton && !isOwnProfile && (
              <Button
                onClick={handleFollowAction}
                disabled={isLoading}
                variant={buttonConfig.variant}
                className={`w-full ${buttonConfig.className}`}
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <IconComponent className="h-4 w-4 mr-2" />
                )}
                {buttonConfig.text}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

UserProfileCard.displayName = "UserProfileCard";

export default UserProfileCard;
