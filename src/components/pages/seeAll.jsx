import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS_QUERY } from "../../graphql/query/user.query";
import { FRIEND_REQUEST_QUERY } from "../../graphql/query/friendRequest.query";
import {
  SEND_FRIEND_REQUEST_MUTATION,
  CANCEL_FRIEND_REQUEST_MUTATION,
  ACCEPT_FRIEND_REQUEST_MUTATION,
} from "../../graphql/mutations/follow.mutation";
import * as localStorageFunctions from "../../utils/localStorage.util.js";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Search, Users, UserPlus, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SeeAll() {
  const navigate = useNavigate();
  const userInfo = localStorageFunctions.getLocalStorage()?.user;

  const [followStatus, setFollowStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // GraphQL operations
  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST_MUTATION);
  const [cancelFriendRequest] = useMutation(CANCEL_FRIEND_REQUEST_MUTATION);
  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST_MUTATION);

  const { loading: friendRequestsLoading, data: friendRequestsData } =
    useQuery(FRIEND_REQUEST_QUERY);
  const { loading: usersLoading, data: usersData } = useQuery(GET_USERS_QUERY, {
    variables: { pageQuery: 1, limitQuery: 50 }, // Get more users for see all page
  });

  // Initialize follow status
  useEffect(() => {
    if (friendRequestsData?.friendRequests && userInfo?.user_id) {
      const statusMap = {};
      friendRequestsData.friendRequests.forEach((request) => {
        if (request.receiver_id === userInfo.user_id) {
          statusMap[request.sender_id] = "Follow Back";
        } else if (request.sender_id === userInfo.user_id) {
          statusMap[request.receiver_id] = "Following";
        }
      });

      // Only update if the status has actually changed
      setFollowStatus((prevStatus) => {
        const hasChanged =
          Object.keys(statusMap).some(
            (key) => statusMap[key] !== prevStatus[key]
          ) || Object.keys(prevStatus).length !== Object.keys(statusMap).length;

        return hasChanged ? statusMap : prevStatus;
      });
    }
  }, [friendRequestsData?.friendRequests, userInfo?.user_id]);

  // Filter users based on search and category
  const filteredUsers = useMemo(() => {
    return usersData?.users?.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());

      if (selectedCategory === "all") return matchesSearch;
      if (selectedCategory === "suggested")
        return matchesSearch && !followStatus[user.user_id];
      if (selectedCategory === "following")
        return matchesSearch && followStatus[user.user_id] === "Following";
      if (selectedCategory === "pending")
        return matchesSearch && followStatus[user.user_id] === "Follow Back";

      return matchesSearch;
    });
  }, [usersData?.users, searchTerm, selectedCategory, followStatus]);

  const handleSendFriendRequest = useCallback(
    async (receiverId) => {
      try {
        setFollowStatus((prev) => ({ ...prev, [receiverId]: "Following" }));
        await sendFriendRequest({
          variables: { receiverId: receiverId },
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } catch (error) {
        setFollowStatus((prev) => ({ ...prev, [receiverId]: "Follow" }));
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
        console.log(error);
      }
    },
    [sendFriendRequest]
  );

  const handleCancelFriendRequest = useCallback(
    async (receiverId) => {
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
        console.log(error);
      }
    },
    [cancelFriendRequest]
  );

  const handleAcceptFriendRequest = useCallback(
    async (receiverId) => {
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
        console.log(error);
      }
    },
    [acceptFriendRequest]
  );

  const getButtonText = useCallback(
    (userId) => {
      return followStatus[userId] || "Follow";
    },
    [followStatus]
  );

  const getButtonAction = useCallback(
    (userId) => {
      const status = followStatus[userId];
      if (status === "Following")
        return () => handleCancelFriendRequest(userId);
      if (status === "Follow Back")
        return () => handleAcceptFriendRequest(userId);
      return () => handleSendFriendRequest(userId);
    },
    [
      followStatus,
      handleCancelFriendRequest,
      handleAcceptFriendRequest,
      handleSendFriendRequest,
    ]
  );

  const categories = useMemo(
    () => [
      { id: "all", label: "All", count: usersData?.users?.length || 0 },
      {
        id: "suggested",
        label: "Suggested",
        count:
          usersData?.users?.filter((u) => !followStatus[u.user_id])?.length ||
          0,
      },
      {
        id: "following",
        label: "Following",
        count:
          usersData?.users?.filter(
            (u) => followStatus[u.user_id] === "Following"
          )?.length || 0,
      },
      {
        id: "pending",
        label: "Pending",
        count:
          usersData?.users?.filter(
            (u) => followStatus[u.user_id] === "Follow Back"
          )?.length || 0,
      },
    ],
    [usersData?.users, followStatus]
  );

  if (usersLoading || friendRequestsLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center space-x-4 p-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                  </div>
                  <div className="w-20 h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Suggested for you
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover new people to follow
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-500">
              {filteredUsers?.length || 0} people
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {category.label}
              <span className="ml-1 text-xs opacity-75">
                ({category.count})
              </span>
            </button>
          ))}
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers?.map((user) => (
            <Card
              key={user.user_id}
              className="hover:shadow-md transition-shadow"
            >
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
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <span>{user.posts_count || 0} posts</span>
                      <span>{user.followers_count || 0} followers</span>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <Button
                    onClick={getButtonAction(user.user_id)}
                    variant={
                      followStatus[user.user_id] === "Following"
                        ? "outline"
                        : "default"
                    }
                    className={`w-full ${
                      followStatus[user.user_id] === "Following"
                        ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                        : followStatus[user.user_id] === "Follow Back"
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {getButtonText(user.user_id)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers?.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        {/* Success/Error Messages */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Action completed successfully!
          </div>
        )}
        {showError && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Something went wrong. Please try again.
          </div>
        )}
      </div>
    </Layout>
  );
}
