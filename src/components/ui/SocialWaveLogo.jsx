import React from "react";

const SocialWaveLogo = ({ width = 150, height = "auto", className = "" }) => {
  const isSmallSize = width < 50;

  if (isSmallSize) {
    // Icon version for small screens
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg
          width="38"
          height="38"
          viewBox="0 0 100 100"
          className="text-blue-500"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#667eea", stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#764ba2", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#f093fb", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
          <path
            d="M30 40 Q50 20 70 40 Q50 60 30 40"
            fill="white"
            opacity="0.9"
          />
          <path
            d="M30 60 Q50 40 70 60 Q50 80 30 60"
            fill="white"
            opacity="0.7"
          />
        </svg>
      </div>
    );
  }

  // Full logo version
  return (
    <div className={`flex items-center ${className}`}>
      <svg width="40" height="40" viewBox="0 0 100 100" className="mr-3">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#667eea", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#764ba2", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#f093fb", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#gradient)" />
        <path d="M30 40 Q50 20 70 40 Q50 60 30 40" fill="white" opacity="0.9" />
        <path d="M30 60 Q50 40 70 60 Q50 80 30 60" fill="white" opacity="0.7" />
      </svg>
      <span
        className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        SocialWave
      </span>
    </div>
  );
};

export default SocialWaveLogo;
