import React from "react";
import SocialWaveLogo from "./SocialWaveLogo";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {/* Loading Animation */}
      <div className="mb-8">
        <div className="animate-pulse">
          <SocialWaveLogo width={120} />
        </div>
      </div>

      {/* Spinner */}
      <div className="relative mb-6">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{message}</h2>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 mt-6">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-blue-500 h-1 rounded-full animate-pulse"
            style={{ width: "100%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
