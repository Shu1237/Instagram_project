import React from "react";
import LeftSideOptimized from "../home/LeftSideOptimized";
import MiddleSide from "../home/middleSide";
import RightSideOptimized from "../home/RightSideOptimized";
import MobileNavigation from "../ui/MobileNavigation";

function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="flex">
        {/* Left Sidebar - Hidden on mobile, Fixed on desktop */}
        <div className="hidden md:block">
          <LeftSideOptimized />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 md:ml-16 xl:ml-64 transition-all duration-300">
          <div className="flex max-w-5xl mx-auto">
            {/* Middle Section - Posts and Stories */}
            <div className="flex-1 max-w-lg mx-auto lg:mx-0">
              <MiddleSide />
            </div>

            {/* Right Sidebar - Hidden on smaller screens */}
            <div className="hidden lg:block lg:w-80 xl:w-80">
              <RightSideOptimized />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only visible on mobile */}
      <MobileNavigation />

      {/* Mobile spacing to prevent content from being hidden behind navigation */}
      <div className="h-16 md:hidden" />
    </div>
  );
}

export default Home;
