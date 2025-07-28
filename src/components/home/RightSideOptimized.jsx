import React, { useState, useEffect, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { ME_QUERY, GET_USERS_QUERY } from "../../graphql/query/user.query";
import { NEW_NOTIFICATIONS } from "../../graphql/subscriptions/notification.subcription";
import { removeCookies } from "../../utils/cookie.util";
import {
  SEND_FRIEND_REQUEST_MUTATION,
  CANCEL_FRIEND_REQUEST_MUTATION,
  ACCEPT_FRIEND_REQUEST_MUTATION,
} from "../../graphql/mutations/follow.mutation";
import { FRIEND_REQUEST_QUERY } from "../../graphql/query/friendRequest.query";
import SmallNotification from "../notification/smallNotification";
import * as localStorageFunctions from "../../utils/localStorage.util.js";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";

// Loading skeleton component
const UserSkeleton = memo(() => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
      <div className="space-y-1">
        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
        <div className="w-16 h-2 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
    <div className="w-16 h-7 bg-gray-200 rounded animate-pulse" />
  </div>
));
UserSkeleton.displayName = "UserSkeleton";

// User suggestion item component
const SuggestedUser = memo(
  ({ user, followStatus, onSendRequest, onCancelRequest, onAcceptRequest }) => {
    const getButtonText = () => {
      switch (followStatus) {
        case "Following":
          return "Following";
        case "Follow Back":
          return "Follow Back";
        default:
          return "Follow";
      }
    };

    const getButtonVariant = () => {
      return followStatus === "Following" ? "outline" : "default";
    };

    const handleClick = () => {
      switch (followStatus) {
        case "Following":
          onCancelRequest(user.user_id);
          break;
        case "Follow Back":
          onAcceptRequest(user.user_id);
          break;
        default:
          onSendRequest(user.user_id);
      }
    };

    return (
      <div className="flex items-center justify-between py-2 group">
        <Link
          to={`/profile/${user.user_id}`}
          className="flex items-center space-x-3 flex-1 min-w-0"
        >
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="text-xs">
              {user.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-gray-900 truncate">
              {user.username}
            </span>
            <span className="text-xs text-gray-500 truncate">
              Suggested for you
            </span>
          </div>
        </Link>

        <Button
          size="sm"
          variant={getButtonVariant()}
          onClick={handleClick}
          className="ml-3 flex-shrink-0 text-xs px-3 py-1"
        >
          {getButtonText()}
        </Button>
      </div>
    );
  }
);
SuggestedUser.displayName = "SuggestedUser";

// User profile section component
const UserProfileSection = memo(({ userInfo, onSwitch }) => (
  <Card className="mb-6 border-0 shadow-none">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <Link
          to={`/profile/${userInfo?.user_id}`}
          className="flex items-center space-x-3 flex-1 min-w-0"
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={userInfo?.avatar} alt={userInfo?.username} />
            <AvatarFallback>
              {userInfo?.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-gray-900 truncate">
              {userInfo?.username}
            </span>
            <span className="text-sm text-gray-500 truncate">
              {userInfo?.full_name}
            </span>
          </div>
        </Link>

        <Button
          variant="link"
          size="sm"
          onClick={onSwitch}
          className="text-blue-500 text-xs font-semibold p-0 h-auto"
        >
          Switch
        </Button>
      </div>
    </CardContent>
  </Card>
));
UserProfileSection.displayName = "UserProfileSection";

// Non-authenticated section component
const NonAuthSection = memo(() => (
  <Card className="mb-6 border-0 shadow-none">
    <CardContent className="p-4">
      <div className="text-center space-y-3">
        <span className="text-gray-500 text-sm">Log in to see your feed</span>
        <div className="flex space-x-2">
          <Button asChild className="flex-1" size="sm">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1" size="sm">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
));
NonAuthSection.displayName = "NonAuthSection";

export default function RightSide() {
  const userInfo = localStorageFunctions.getLocalStorage()?.user;
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notification, setNotification] = useState(null);
  const [followStatus, setFollowStatus] = useState({});

  // GraphQL operations
  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST_MUTATION);
  const [cancelFriendRequest] = useMutation(CANCEL_FRIEND_REQUEST_MUTATION);
  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST_MUTATION);

  const { loading: friendRequestsLoading, data: friendRequestsData } =
    useQuery(FRIEND_REQUEST_QUERY);
  const { loading: usersLoading, data: usersData } = useQuery(GET_USERS_QUERY, {
    variables: { pageQuery: 1, limitQuery: 5 },
  });

  // Initialize follow status
  useEffect(() => {
    if (friendRequestsData?.friendRequests && userInfo?.user_id) {
      const status = {};
      friendRequestsData.friendRequests.forEach((request) => {
        if (request.status === "accepted") {
          status[request.sender_id] = "Following";
          status[request.receiver_id] = "Following";
        } else {
          if (request.sender_id == userInfo.user_id) {
            status[request.receiver_id] = "Following";
          } else if (request.receiver_id == userInfo.user_id) {
            status[request.sender_id] = "Follow Back";
          }
        }
      });
      setFollowStatus(status);
    }
  }, [friendRequestsData, userInfo?.user_id]);

  // Action handlers
  const handleSendFriendRequest = async (receiverId) => {
    try {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Following" }));
      await sendFriendRequest({ variables: { receiverId } });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Follow" }));
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleCancelFriendRequest = async (receiverId) => {
    try {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Follow" }));
      await cancelFriendRequest({
        variables: { cancelFriendRequestId: receiverId },
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Following" }));
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleAcceptFriendRequest = async (receiverId) => {
    try {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Following" }));
      await acceptFriendRequest({
        variables: { acceptFriendRequestId: receiverId },
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Follow Back" }));
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleSwitch = () => {
    removeCookies("jwt-token");
    localStorageFunctions.removeLocalStorage();
    window.location.href = "/";
  };

  // Subscription for notifications
  useSubscription(NEW_NOTIFICATIONS, {
    variables: { receiverId: userInfo?.user_id },
    onData: (x) => {
      const notification = x?.data?.data?.notificationAdded;
      setNotification(notification);
    },
  });

  return (
    <div className="w-80 p-6 h-screen overflow-y-auto">
      {/* Status Messages */}
      {showError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Something went wrong. Please try again.
        </div>
      )}

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Action completed successfully!
        </div>
      )}

      {notification && (
        <div className="mb-4">
          <SmallNotification
            notification={notification}
            onClose={() => setNotification(null)}
          />
        </div>
      )}

      {/* User Section */}
      {userInfo ? (
        <UserProfileSection userInfo={userInfo} onSwitch={handleSwitch} />
      ) : (
        <NonAuthSection />
      )}

      {/* Suggested Users */}
      {userInfo && (
        <Card className="border-0 shadow-none">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-semibold text-sm">
                Suggested for you
              </span>
              <Link
                to="/see-all"
                className="text-xs font-semibold text-gray-700 hover:text-gray-500 p-0 h-auto"
              >
                See All
              </Link>
            </div>

            <div className="space-y-2">
              {usersLoading || friendRequestsLoading
                ? // Loading skeletons
                  Array.from({ length: 3 }).map((_, index) => (
                    <UserSkeleton key={index} />
                  ))
                : // User suggestions
                  usersData?.users?.map((user) => (
                    <SuggestedUser
                      key={user.user_id}
                      user={user}
                      followStatus={followStatus[user.user_id]}
                      onSendRequest={handleSendFriendRequest}
                      onCancelRequest={handleCancelFriendRequest}
                      onAcceptRequest={handleAcceptFriendRequest}
                    />
                  ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="mt-8 space-y-4">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex flex-wrap gap-x-2">
            {["About", "Help", "Press", "API", "Jobs", "Privacy"].map(
              (item) => (
                <span key={item} className="hover:underline cursor-pointer">
                  {item}
                </span>
              )
            )}
          </div>
          <div className="flex flex-wrap gap-x-2">
            {["Terms", "Locations", "Language", "Meta", "Verified"].map(
              (item) => (
                <span key={item} className="hover:underline cursor-pointer">
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} Instagram from Meta
        </div>
      </div>
    </div>
  );
}
