import React from "react";
import "../ui/css/middleSide.css";
import Post from "../post/post";
import StorySlider from "../stories/StorySlider";

export default function MiddleSide() {
  return (
    <div className="w-full border-l border-gray-400 px-12 box-border flex flex-col items-center">
      <StorySlider />
      <div className="w-3/5">
        <Post />
      </div>
    </div>
  );
}
