// Home.js
import React from "react";
import "../css/home.css";
import LeftSide from "../jsx/leftSide";
import MiddleSide from "../jsx/middleSide";
import RightSide from "../jsx/rightSide";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../../../graphql/query/user.query";
function Home() {
  // const { data, loading, error } = useQuery(ME_QUERY);
  // console.log(data.me.username);
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
