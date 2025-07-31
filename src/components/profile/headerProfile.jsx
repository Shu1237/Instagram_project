import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Settings,
  UserPlus,
  UserCheck,
  UserMinus,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import FollowersModal from "./FollowersModal";
import { useFollowStatus } from "../hooks/useFollowStatus";

const HeaderProfile = ({ data, meData }) => {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const isOwnProfile =
    parseInt(meData?.user_id) === parseInt(data?.user?.user_id);
  const profileUserId = data?.user?.user_id;

  const {
    followStatus,
    isLoading,
    handleFollowAction,
    getFollowButtonConfig,
    isFollowing,
  } = useFollowStatus(profileUserId, meData?.user_id);

  const buttonConfig = getFollowButtonConfig();

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
    <>
      <div className="flex items-start py-8 gap-4">
        {/* Avatar Section */}
        <div className="flex-shrink-0 mr-8">
          <div className="w-[150px] h-[150px] rounded-full border border-gray-200 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={data?.user?.avatar}
              alt={data?.user?.username}
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-grow">
          <div className="flex items-center mb-4 space-x-4">
            <h2 className="text-xl font-light">{data?.user?.username}</h2>

            {/* Action Buttons */}
            {isOwnProfile ? (
              <Link to="/dashboardPage">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleFollowAction}
                  disabled={isLoading}
                  variant={buttonConfig.variant}
                  size="sm"
                  className={`flex items-center space-x-2 ${buttonConfig.className}`}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <IconComponent className="h-4 w-4" />
                  )}
                  <span>{buttonConfig.text}</span>
                </Button>

                {followStatus === "Following" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Message</span>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-row gap-10 font-sans text-gray-600 mb-4">
            <span>
              <strong>{data?.user?.posts?.length || 0}</strong> posts
            </span>
            <button
              onClick={() => setIsFollowersModalOpen(true)}
              className="hover:text-gray-900 cursor-pointer transition-colors"
            >
              <strong>{data?.user?.followers?.length || 0}</strong> followers
            </button>
            <button
              onClick={() => setIsFollowingModalOpen(true)}
              className="hover:text-gray-900 cursor-pointer transition-colors"
            >
              <strong>{data?.user?.following?.length || 0}</strong> following
            </button>
          </div>

          {/* Bio */}
          <div className="font-semibold">{data?.user?.full_name}</div>
        </div>
      </div>

      {/* Followers Modal */}
      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={() => setIsFollowersModalOpen(false)}
        type="followers"
        userConnections={data?.user?.followers}
        profileUserId={profileUserId}
      />

      {/* Following Modal */}
      <FollowersModal
        isOpen={isFollowingModalOpen}
        onClose={() => setIsFollowingModalOpen(false)}
        type="following"
        userConnections={data?.user?.following}
        profileUserId={profileUserId}
      />
    </>
  );
};
export default HeaderProfile;
