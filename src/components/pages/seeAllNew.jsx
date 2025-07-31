import React, { useState, useMemo } from "react";
import Layout from "../layout/Layout";
import { useQuery } from "@apollo/client";
import { GET_USERS_QUERY } from "../../graphql/query/user.query";
import { FRIEND_REQUEST_QUERY } from "../../graphql/query/friendRequest.query";
import * as localStorageFunctions from "../../utils/localStorage.util.js";
import { Button } from "../ui/button";
import { Search, Users, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserProfileCard from "../profile/UserProfileCard";

export default function SeeAll() {
  const navigate = useNavigate();
  const userInfo = localStorageFunctions.getLocalStorage()?.user;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // GraphQL queries
  const { loading: friendRequestsLoading, data: friendRequestsData } =
    useQuery(FRIEND_REQUEST_QUERY);
  const { loading: usersLoading, data: usersData } = useQuery(GET_USERS_QUERY, {
    variables: { pageQuery: 1, limitQuery: 50 },
  });

  // Get follow status map from friend requests
  const followStatusMap = useMemo(() => {
    if (!friendRequestsData?.friendRequests || !userInfo?.user_id) return {};

    const statusMap = {};
    friendRequestsData.friendRequests.forEach((request) => {
      if (parseInt(request.receiver_id) === userInfo.user_id) {
        statusMap[request.sender_id] = "Follow Back";
      } else if (parseInt(request.sender_id) === userInfo.user_id) {
        statusMap[request.receiver_id] = "Following";
      }
    });
    return statusMap;
  }, [friendRequestsData?.friendRequests, userInfo?.user_id]);

  // Filter users based on search and category
  const filteredUsers = useMemo(() => {
    if (!usersData?.users) return [];

    return usersData.users.filter((user) => {
      // Exclude current user
      if (parseInt(user.user_id) === parseInt(userInfo?.user_id)) return false;

      const matchesSearch =
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());

      if (selectedCategory === "all") return matchesSearch;
      if (selectedCategory === "suggested")
        return matchesSearch && !followStatusMap[user.user_id];
      if (selectedCategory === "following")
        return matchesSearch && followStatusMap[user.user_id] === "Following";
      if (selectedCategory === "pending")
        return matchesSearch && followStatusMap[user.user_id] === "Follow Back";

      return matchesSearch;
    });
  }, [
    usersData?.users,
    searchTerm,
    selectedCategory,
    followStatusMap,
    userInfo?.user_id,
  ]);

  // Categories with counts
  const categories = useMemo(
    () => [
      { id: "all", label: "All", count: filteredUsers?.length || 0 },
      {
        id: "suggested",
        label: "Suggested",
        count:
          usersData?.users?.filter(
            (u) =>
              parseInt(u.user_id) !== parseInt(userInfo?.user_id) &&
              !followStatusMap[u.user_id]
          )?.length || 0,
      },
      {
        id: "following",
        label: "Following",
        count:
          usersData?.users?.filter(
            (u) => followStatusMap[u.user_id] === "Following"
          )?.length || 0,
      },
      {
        id: "pending",
        label: "Pending",
        count:
          usersData?.users?.filter(
            (u) => followStatusMap[u.user_id] === "Follow Back"
          )?.length || 0,
      },
    ],
    [
      usersData?.users,
      followStatusMap,
      userInfo?.user_id,
      filteredUsers?.length,
    ]
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
            <Users className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">
              {filteredUsers?.length || 0} people
            </span>
          </div>
        </div>

        {/* Search */}
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
            <UserProfileCard
              key={user.user_id}
              user={user}
              currentUserId={userInfo?.user_id}
              showFollowButton={true}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredUsers?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <Users className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              {searchTerm
                ? `No users match your search for "${searchTerm}".`
                : "No users to display in this category."}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
