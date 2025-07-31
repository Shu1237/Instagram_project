import "../ui/css/middleSide.css";
import Feed from "../post/Feed";

import * as localStorageFunctions from "../../utils/localStorage.util.js";

export default function MiddleSide() {
  const userInfo = localStorageFunctions.getLocalStorage()?.user;

  const handleStoryClick = (story) => {
    // Handle story click
    console.log("Story clicked:", story);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-lg mx-auto pt-6 pb-20 md:pb-6">
        {/* Posts Section */}
        <div className="space-y-6">
          <Feed />
        </div>
      </div>
    </div>
  );
}
