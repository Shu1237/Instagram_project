import React, { useState, useRef, useEffect } from "react";
import LeftSideOptimized from "../home/LeftSideOptimized";
import { Card } from "../ui/card";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export default function Reels() {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef([]);

  // Mock data for reels
  const reels = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    video: `https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4`,
    poster: `https://picsum.photos/360/640?random=${i + 1}`,
    user: {
      id: i + 1,
      username: `user${i + 1}`,
      avatar: `https://picsum.photos/50/50?random=${i + 100}`,
    },
    caption: `Amazing reel content #${i + 1} 🔥`,
    likes: Math.floor(Math.random() * 10000) + 1000,
    comments: Math.floor(Math.random() * 500) + 50,
    shares: Math.floor(Math.random() * 100) + 10,
    audio: `Original audio - user${i + 1}`,
  }));

  useEffect(() => {
    const currentVideo = videoRefs.current[currentReel];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play();
      } else {
        currentVideo.pause();
      }
    }
  }, [currentReel, isPlaying]);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newCurrentReel = Math.round(scrollTop / itemHeight);

    if (newCurrentReel !== currentReel) {
      setCurrentReel(newCurrentReel);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const currentVideo = videoRefs.current[currentReel];
    if (currentVideo) {
      currentVideo.muted = !isMuted;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <LeftSideOptimized />

      <main className="ml-16 xl:ml-64 transition-all duration-300">
        <div
          className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
        >
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="h-screen snap-start relative flex items-center justify-center"
            >
              {/* Video */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={reel.video}
                poster={reel.poster}
                className="w-full h-full object-cover max-w-sm mx-auto"
                loop
                muted={isMuted}
                playsInline
                onClick={togglePlayPause}
              />

              {/* Play/Pause overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={togglePlayPause}
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-16 h-16"
                  >
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              )}

              {/* User info and controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
                <div className="flex items-end justify-between max-w-sm mx-auto">
                  {/* Left side - User info and caption */}
                  <div className="flex-1 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage
                          src={reel.user.avatar}
                          alt={reel.user.username}
                        />
                        <AvatarFallback>
                          {reel.user.username[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">
                        {reel.user.username}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-white text-white hover:bg-white hover:text-black h-6 text-xs px-2"
                      >
                        Follow
                      </Button>
                    </div>
                    <p className="text-sm mb-2">{reel.caption}</p>
                    <div className="flex items-center space-x-2 text-xs opacity-80">
                      <span>♪</span>
                      <span>{reel.audio}</span>
                    </div>
                  </div>

                  {/* Right side - Action buttons */}
                  <div className="flex flex-col space-y-4 ml-4">
                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                      >
                        <Heart className="h-6 w-6" />
                      </Button>
                      <span className="text-white text-xs mt-1">
                        {reel.likes}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                      >
                        <MessageCircle className="h-6 w-6" />
                      </Button>
                      <span className="text-white text-xs mt-1">
                        {reel.comments}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                      >
                        <Send className="h-6 w-6" />
                      </Button>
                      <span className="text-white text-xs mt-1">
                        {reel.shares}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                    >
                      <Bookmark className="h-6 w-6" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="text-white hover:bg-white/20 rounded-full w-12 h-12"
                    >
                      {isMuted ? (
                        <VolumeX className="h-6 w-6" />
                      ) : (
                        <Volume2 className="h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="absolute top-4 right-4">
                <div className="text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                  {index + 1} / {reels.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
