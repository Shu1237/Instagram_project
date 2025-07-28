import React, { useEffect, useState } from "react";
import { CheckCircle, Share, Heart, MessageCircle, X } from "lucide-react";

const PostSuccessNotification = ({
  isVisible,
  onClose,
  postData,
  onViewPost,
  autoHideDelay = 5000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          onClose();
        }, 300);
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDelay, onClose]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleViewPost = () => {
    if (onViewPost) {
      onViewPost();
    }
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed top-4 right-4 bg-white text-black rounded-xl shadow-2xl z-50 border border-gray-100 overflow-hidden
        transition-all duration-300 ease-out
        ${
          isAnimating
            ? "opacity-100 transform translate-y-0 scale-100"
            : "opacity-0 transform translate-y-4 scale-95"
        }
      `}
      style={{ minWidth: "320px", maxWidth: "400px" }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 rounded-full p-1">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Post Shared!</h3>
              <p className="text-sm text-green-100">Your post is now live</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-green-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Post preview */}
        {postData?.mediaPreview && (
          <div className="flex items-start space-x-3 mb-4">
            <img
              src={postData.mediaPreview}
              alt="Post preview"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm text-gray-800 line-clamp-2">
                {postData.caption || "Your post has been shared successfully!"}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">0</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">0</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share className="w-4 h-4" />
                  <span className="text-xs">0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={handleViewPost}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            View Post
          </button>
          <button
            onClick={handleClose}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Continue Creating
          </button>
        </div>

        {/* Stats */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Followers will see this</span>
            <span className="text-green-600 font-medium">✓ Published</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSuccessNotification;
