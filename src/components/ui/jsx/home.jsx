// Home.js
import React from "react";
import "../css/home.css";
import LeftSide from "../jsx/leftSide";
import MiddleSide from "../jsx/middleSide";
import RightSide from "../jsx/rightSide";

function Home() {
  return (
    <div className="homePage">
      <div className="leftSideHome">
        <LeftSide />
      </div>
      <div className="midSideHome">
        <MiddleSide />
      </div>
      <div className="rightSide">
        <RightSide />
      </div>
    </div>
  );
}

export default Home;
