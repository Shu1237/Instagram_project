// Home.js
import React from "react";

import "../ui/css/home.css";

import LeftSide from "../home/leftSide";
import MiddleSide from "../home/middleSide";
import RightSide from "../home/rightSide";

function Home() {
  return (
    <div className="font-montserrat p-0 m-0 box-border flex">
      <div className="p-[25px_10px] flex-[0.139]">
        <LeftSide />
      </div>
      <div className="flex flex-col flex-[0.6] border-l border-gray-300">
        <MiddleSide />
      </div>
      <div className="flex-[0.261]">
        <RightSide />
      </div>
    </div>
  );
}

export default Home;
