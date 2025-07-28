import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";

const MediaPreview = ({ media, onRemove, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!media || media.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const currentMedia = media[currentIndex];
  const isVideo = currentMedia?.type?.startsWith("video/");

  const toggleVideoPlay = () => {
    const video = document.getElementById(`preview-video-${currentIndex}`);
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
    >
      {/* Media Display */}
      <div className="aspect-square relative">
        {isVideo ? (
          <div className="relative w-full h-full">
            <video
              id={`preview-video-${currentIndex}`}
              src={currentMedia.url}
              className="w-full h-full object-cover"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              muted
              loop
            />
            <button
              onClick={toggleVideoPlay}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200"
            >
              {!isVideoPlaying && (
                <div className="bg-black bg-opacity-50 rounded-full p-3">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              )}
            </button>
          </div>
        ) : (
          <img
            src={currentMedia.url}
            alt={`Preview ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        )}

        {/* Navigation arrows for multiple media */}
        {media.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Remove button */}
        {onRemove && (
          <button
            onClick={() => onRemove(currentIndex)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Media type indicator */}
        {isVideo && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            VIDEO
          </div>
        )}
      </div>

      {/* Media indicators */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Media count */}
      {media.length > 1 && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {currentIndex + 1} / {media.length}
        </div>
      )}
    </div>
  );
};

export default MediaPreview;
