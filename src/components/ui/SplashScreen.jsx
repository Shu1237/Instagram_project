import React from "react";
import SocialWaveLogo from "./SocialWaveLogo";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center z-50">
      {/* Logo with animation */}
      <div className="mb-8 transform transition-all duration-1000 animate-bounce">
        <div className="bg-white rounded-full p-6 shadow-2xl">
          <SocialWaveLogo width={80} />
        </div>
      </div>

      {/* App name */}
      <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
        SocialWave
      </h1>

      {/* Tagline */}
      <p className="text-white/80 text-lg mb-8 animate-fade-in-delay">
        Connect. Share. Inspire.
      </p>

      {/* Loading dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div
          className="w-3 h-3 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>

      {/* Loading text */}
      <p className="text-white/60 text-sm mt-4 opacity-0 animate-fade-in-delay-2">
        Loading your experience...
      </p>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s forwards;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.6s forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
