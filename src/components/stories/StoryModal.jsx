import React, { useState, useEffect, useRef } from "react";
import {
  IoClose,
  IoPlay,
  IoPause,
  IoVolumeMute,
  IoVolumeHigh,
} from "react-icons/io5";

export default function StoryModal({ story, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (story?.type === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, story?.type]);

  if (!story) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
      onClick={onClose}
    >
      {/* Story container */}
      <div
        className="relative w-[380px] h-[680px] bg-black rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-4 left-4 flex items-center space-x-3">
          <img
            src={story.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="text-white text-sm font-semibold">{story.name}</div>
          <span className="text-gray-400 text-xs">{story.time}</span>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-transform transform hover:scale-110"
          onClick={onClose}
        >
          <IoClose />
        </button>

        {/* Story Content */}
        {story.type === "image" ? (
          <img
            src={story.img}
            alt="story"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            src={story.video}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            poster={story.img} // Hiển thị ảnh khi video chưa tải
          />
        )}

        {/* Progress Bar */}
        <div className="absolute top-2 left-0 w-full h-1 bg-gray-700">
          <div className="h-full bg-white w-2/3 rounded-full transition-all duration-300"></div>
        </div>

        {/* Video Controls */}
        {story.type === "video" && (
          <div className="absolute bottom-24 left-6 flex space-x-4 text-white">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-3xl hover:text-gray-300 transition-transform transform hover:scale-110"
            >
              {isPlaying ? <IoPause /> : <IoPlay />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-3xl hover:text-gray-300 transition-transform transform hover:scale-110"
            >
              {isMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
            </button>
          </div>
        )}

        {/* Comment Input */}
        <div className="absolute bottom-4 w-[90%] mx-auto flex items-center bg-gray-900 bg-opacity-75 p-3 rounded-full">
          <input
            type="text"
            placeholder={`Reply to ${story.name}...`}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-3 text-sm"
          />
          <button className="text-blue-400 font-semibold px-4 hover:text-blue-300 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
