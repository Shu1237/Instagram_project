import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { X, Users, UserCheck, UserPlus, Search } from "lucide-react";
import { GET_USERS_QUERY } from "../../graphql/query/user.query";
import { FRIEND_REQUEST_QUERY } from "../../graphql/query/friendRequest.query";
import {
  SEND_FRIEND_REQUEST_MUTATION,
  CANCEL_FRIEND_REQUEST_MUTATION,
  ACCEPT_FRIEND_REQUEST_MUTATION,
} from "../../graphql/mutations/follow.mutation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import * as localStorageFunctions from "../../utils/localStorage.util";

const FollowersModal = ({
  isOpen,
  onClose,
  type,
  userConnections,
  profileUserId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [followStatus, setFollowStatus] = useState({});

  const userInfo = localStorageFunctions.getLocalStorage()?.user;

  // GraphQL operations
  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST_MUTATION);
  const [cancelFriendRequest] = useMutation(CANCEL_FRIEND_REQUEST_MUTATION);
  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST_MUTATION);

  const { data: friendRequestsData } = useQuery(FRIEND_REQUEST_QUERY);
  const { data: usersData } = useQuery(GET_USERS_QUERY, {
    variables: { pageQuery: 1, limitQuery: 100 },
  });

  // Get user details for connections
  const connectionUsers = useMemo(() => {
    if (!userConnections || !usersData?.users) return [];

    const connectionIds = userConnections.map((conn) => conn.user_id);
    return usersData.users.filter((user) =>
      connectionIds.includes(user.user_id)
    );
  }, [userConnections, usersData]);

  // Filter connections based on search and prioritize current user
  const filteredConnections = useMemo(() => {
    let filteredUsers = connectionUsers;

    // Apply search filter if searchTerm exists
    if (searchTerm) {
      filteredUsers = connectionUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort to put current user first if they exist in the list
    return filteredUsers.sort((a, b) => {
      const aIsCurrentUser =
        parseInt(a.user_id) === parseInt(userInfo?.user_id);
      const bIsCurrentUser =
        parseInt(b.user_id) === parseInt(userInfo?.user_id);

      if (aIsCurrentUser && !bIsCurrentUser) return -1;
      if (!aIsCurrentUser && bIsCurrentUser) return 1;
      return 0;
    });
  }, [connectionUsers, searchTerm, userInfo?.user_id]);

  // Initialize follow status
  useEffect(() => {
    if (friendRequestsData?.friendRequests && userInfo?.user_id) {
      const statusMap = {};

      friendRequestsData.friendRequests.forEach((request) => {
        if (parseInt(request.receiver_id) === userInfo.user_id) {
          statusMap[request.sender_id] = "Follow Back";
        } else if (parseInt(request.sender_id) === userInfo.user_id) {
          statusMap[request.receiver_id] = "Following";
        }
      });

      setFollowStatus(statusMap);
    }
  }, [friendRequestsData?.friendRequests, userInfo?.user_id]);

  const handleSendFriendRequest = async (receiverId) => {
    try {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Following" }));
      await sendFriendRequest({ variables: { receiverId } });
    } catch (error) {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Follow" }));
      console.error("Error sending friend request:", error);
    }
  };

  const handleCancelFriendRequest = async (receiverId) => {
    try {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Follow" }));
      await cancelFriendRequest({
        variables: { cancelFriendRequestId: receiverId },
      });
    } catch (error) {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Following" }));
      console.error("Error canceling friend request:", error);
    }
  };

  const handleAcceptFriendRequest = async (receiverId) => {
    try {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Following" }));
      await acceptFriendRequest({
        variables: { acceptFriendRequestId: receiverId },
      });
    } catch (error) {
      setFollowStatus((prev) => ({ ...prev, [receiverId]: "Follow Back" }));
      console.error("Error accepting friend request:", error);
    }
  };

  const getButtonAction = (userId) => {
    const status = followStatus[userId];
    if (status === "Following") return () => handleCancelFriendRequest(userId);
    if (status === "Follow Back")
      return () => handleAcceptFriendRequest(userId);
    return () => handleSendFriendRequest(userId);
  };

  const getButtonText = (userId) => {
    return followStatus[userId] || "Follow";
  };

  const getButtonVariant = (userId) => {
    const status = followStatus[userId];
    return status === "Following" ? "outline" : "default";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {type === "followers" ? "Followers" : "Following"}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {filteredConnections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm ? "No results found" : `No ${type} found`}
              </h4>
              <p className="text-gray-500 text-center">
                {searchTerm
                  ? `No ${type} match "${searchTerm}".`
                  : `This user doesn't have any ${type} yet.`}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {/* Show total count */}
              <div className="text-sm text-gray-500 mb-3">
                {filteredConnections.length} {type}
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
              {filteredConnections.map((user) => {
                const isCurrentUser =
                  parseInt(userInfo?.user_id) === parseInt(user.user_id);

                return (
                  <div
                    key={user.user_id}
                    className={`flex items-center justify-between ${
                      isCurrentUser
                        ? "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2"
                        : ""
                    }`}
                  >
                    <Link
                      to={`/profile/${user.user_id}`}
                      className="flex items-center space-x-3 flex-1 min-w-0"
                      onClick={onClose}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {user.username[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {user.username}
                          </span>
                          {isCurrentUser && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                              You
                            </span>
                          )}
                        </div>
                        {user.full_name && (
                          <span className="text-sm text-gray-500 truncate">
                            {user.full_name}
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Follow button - hide if it's current user */}
                    {!isCurrentUser && (
                      <Button
                        onClick={getButtonAction(user.user_id)}
                        variant={getButtonVariant(user.user_id)}
                        size="sm"
                        className="ml-3 flex-shrink-0"
                      >
                        {getButtonText(user.user_id) === "Following" ? (
                          <UserCheck className="h-4 w-4 mr-1" />
                        ) : (
                          <UserPlus className="h-4 w-4 mr-1" />
                        )}
                        {getButtonText(user.user_id)}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersModal;
