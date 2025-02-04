import React from "react";

import LeftSide from "../home/leftSide";
import MiddleSide from "../home/middleSide";
import RightSide from "../home/rightSide";

function Home() {
  return (
    <div className="flex font-montserrat p-0 m-0 box-border">
      {/* Left Side */}
      <div className="p-6 flex-[0.14] max-lg:flex-[0.1]">
        <LeftSide />
      </div>

      {/* Middle Side */}
      <div className="flex flex-col flex-[0.6] border-l border-gray-300 max-lg:flex-[0.9]">
        <MiddleSide />
      </div>

      {/* Right Side */}
      <div className="max-lg:hidden flex-[0.26]  ">
        <RightSide />
      </div>
    </div>
  );
}

export default Home;
