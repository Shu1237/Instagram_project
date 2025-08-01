import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  GET_PROFILE,
  GET_USER_POST_PROFILE,
} from "../../graphql/query/user.query";
import FooterProfile from "./footerProfile";
import HeaderProfile from "./headerProfile";
import ProfileTabs from "./ProfileTabs";
import PostGrid from "./PostGrid";
import * as localStorageFunctions from "../../utils/localStorage.util.js";
import loadingEffect from "../ui/jsx/loading-effect.jsx";

export default function RightSideProfile() {
  const userInfo = localStorageFunctions.getLocalStorage()?.user;
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      userId: parseInt(id),
    },
    skip: !id,
  });

  const {
    loading: loadingPost,
    error: errorPost,
    data: dataPost,
  } = useQuery(GET_USER_POST_PROFILE, {
    variables: {
      userId: parseInt(id),
    },
    skip: !id,
  });

  // Check if this is the current user's profile
  const isOwnProfile = useMemo(
    () => parseInt(userInfo?.user_id) === parseInt(id),
    [userInfo?.user_id, id]
  );

  const handleTabChange = (tabId) => setActiveTab(tabId);

  if (loading && loadingPost) return loadingEffect();

  if (error || errorPost) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[935px] mx-auto px-4 font-sans">
      {/* Profile Header */}
      <HeaderProfile data={data} meData={userInfo} />

      {/* Navigation Tabs */}
      <ProfileTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        postsCount={dataPost?.getUserPosts?.length || 0}
        isOwnProfile={isOwnProfile}
      />

      {/* Content based on active tab */}
      <div className="min-h-[400px]">
        {activeTab === 1 && (
          <PostGrid posts={dataPost?.getUserPosts} isLoading={loadingPost} />
        )}

        {activeTab === 2 && isOwnProfile && (
          <div className="flex justify-center p-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>
              </div>
              <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
                No Saved Posts
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Save posts to see them here.
              </p>
            </div>
          </div>
        )}

        {activeTab === 3 && isOwnProfile && (
          <div className="flex justify-center p-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 rounded"></div>
              </div>
              <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
                No Liked Posts
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Posts you like will appear here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <FooterProfile />
    </div>
  );
}
