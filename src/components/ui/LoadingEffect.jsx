import React from "react";
import { cn } from "../../lib/utils";

const LoadingEffect = ({ className }) => {
  return (
    <div className={cn("flex justify-center items-center p-8", className)}>
      <div className="relative">
        {/* SocialWave-style loading spinner */}
        <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>

        {/* Pulse effect */}
        <div className="absolute inset-0 w-8 h-8 border-2 border-gray-200 rounded-full animate-ping opacity-20"></div>
      </div>
    </div>
  );
};

export default LoadingEffect;
