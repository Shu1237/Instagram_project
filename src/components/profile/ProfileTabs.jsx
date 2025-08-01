import React, { memo } from "react";
import { Grid, Bookmark, Users, Heart } from "lucide-react";

const ProfileTabs = memo(
  ({ activeTab, onTabChange, postsCount, isOwnProfile }) => {
    const tabs = [
      {
        id: 1,
        label: "POSTS",
        icon: Grid,
        count: postsCount,
      },
      ...(isOwnProfile
        ? [
            {
              id: 2,
              label: "SAVED",
              icon: Bookmark,
              count: null,
            },
            {
              id: 3,
              label: "LIKED",
              icon: Heart,
              count: null,
            },
          ]
        : []),
    ];

    return (
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center space-x-16">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`py-4 font-semibold text-sm tracking-wider flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-t border-black dark:border-white text-black dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className="ml-1 text-xs opacity-75">({tab.count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

ProfileTabs.displayName = "ProfileTabs";

export default ProfileTabs;
