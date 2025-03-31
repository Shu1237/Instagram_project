import React, { useState, useEffect } from "react";
import LeftSide from "../home/leftSide";
import MiddleSide from "../home/middleSide";
import RightSide from "../home/rightSide";
import Darkmode from "../Darkmode/darkmode";
function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 867);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 867);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`${
        isSmallScreen
          ? "flex flex-col-reverse"
          : "flex w-full h-full font-montserrat p-0 m-0 box-border"
      }`}
    >
      {isSmallScreen ? (
        // Khi màn hình nhỏ, LeftSide sẽ nằm dưới MiddleSide
        <>
          <div className="">

            <LeftSide />
          </div>
          <div className="">
            <MiddleSide />
          </div>
        </>
      ) : (
        // Khi màn hình lớn, giao diện bình thường
        <div className="flex w-full h-full">
        
          {/* Left Side */}
          <div className="p-6 flex-[0.2] max-xl:flex-[0.05] min-w-0">
            <LeftSide />
          </div>

          {/* Middle Side */}
          <div className="flex flex-col flex-[0.6] max-xl:flex-[0.95] min-w-0">
            <MiddleSide />
          </div>

          {/* Right Side */}
          <div className="flex-[0.2] max-lg:hidden min-w-0">
            <RightSide />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
