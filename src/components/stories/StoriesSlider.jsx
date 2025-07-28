import React, { memo } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { cn } from "../../lib/utils";

// Memoized Story component
const StoryItem = memo(({ story, onClick, isOwnStory = false }) => (
  <div className="flex flex-col items-center space-y-1 cursor-pointer group">
    <div
      className={cn(
        "relative",
        !isOwnStory &&
          "p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"
      )}
      onClick={() => onClick(story)}
    >
      <Avatar
        className={cn(
          "h-16 w-16 border-2",
          isOwnStory ? "border-gray-300" : "border-white"
        )}
      >
        <AvatarImage
          src={story.img}
          alt={story.name}
          className="object-cover"
        />
        <AvatarFallback className="text-sm font-medium">
          {story.name?.[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Add story plus icon for own story */}
      {isOwnStory && (
        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>

    <span className="text-xs text-center text-gray-900 max-w-[4rem] truncate group-hover:text-gray-600 transition-colors">
      {isOwnStory ? "Your story" : story.name}
    </span>
  </div>
));
StoryItem.displayName = "StoryItem";

// Main Stories component
const StoriesSlider = memo(({ stories = [], userStory, onStoryClick }) => {
  const handleStoryClick = (story) => {
    onStoryClick?.(story);
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 py-2">
        {/* User's own story */}
        {userStory && (
          <div className="flex-shrink-0">
            <StoryItem
              story={userStory}
              onClick={handleStoryClick}
              isOwnStory={true}
            />
          </div>
        )}

        {/* Other stories */}
        {stories.map((story, index) => (
          <div key={story.id || index} className="flex-shrink-0">
            <StoryItem story={story} onClick={handleStoryClick} />
          </div>
        ))}
      </div>
    </div>
  );
});
StoriesSlider.displayName = "StoriesSlider";

export default StoriesSlider;
