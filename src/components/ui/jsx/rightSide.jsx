import React, { useState } from "react";
import "../css/rightSide.css";
import ProfileRight from "../../../assets/profilepic.png";
import { Link, useNavigate } from "react-router-dom";
import avatars from "../../../avatar.json";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../../../graphql/query/user.query";
import { removeCookies } from "../../../utils/cookie.util";
function RightSide() {
  const { loading, error, data } = useQuery(ME_QUERY);

  const navigate = useNavigate();
  const handleSwitch = () => {
    removeCookies();
    window.location.href = "/";
  };

  const hsr = "instagram from Meta";
  const [followStates, setFollowStates] = useState(avatars.map(() => "Follow"));
  const handleChangeFollow = (index) => {
    // setCount(c=>c+1)
    // Similarly
    setFollowStates((prevStates) => {
      //c1
      const newState = [...prevStates];
      if (newState[index] === "Follow") {
        newState[index] = "Followed";
      } else {
        newState[index] = "Follow";
      }
      return newState;

      //   c2 newState[index]=newState[index]==="Follow"? "Followed" :"Follow"
    });
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className="rightSideHome">
      <div className="topProfileRight">
        <div className="leftRightProfile">
          <div className="imageDivRight">
            <img
              className="imgeRightSideProfile"
              src={ProfileRight}
              alt="profileRight"
            />
          </div>
          <div className="userNameBlock">
            <div className="userNameRightSide">
              {data ? data.me.username : "Guest"}
            </div>
            <div className="userFullName">
              {data ? data.me.full_name : "Guest"}
            </div>
          </div>
        </div>
        <div className="switchBtn">
          <Link className="linkSwitch" onClick={handleSwitch}>
            {" "}
            Switch
          </Link>
        </div>
      </div>
      <div className="bottonRigtSide">
        <div className="suggestedBlock"> Suggested for you</div>
        <div className="seeAll">see All</div>
      </div>

      {avatars.map((avatar, index) => {
        return (
          <div key={index} className="inforFrineds">
            <div className="infoFriend">
              <div className="avatar">
                <img
                  className="avatar-frined"
                  src={avatar.img}
                  alt="imgFriend"
                />
              </div>
              <div className="text-info">
                <div className="nickname">{avatar.nickname}</div>
                <div className="Follow">{avatar.followby}</div>
              </div>
            </div>
            <div className="follow" onClick={() => handleChangeFollow(index)}>
              {followStates[index]}
            </div>
          </div>
        );
      })}

      <div className="support">
        <div className="before">
          About Help Press API Jobs Privacy Terms Locations Language Meta
          Verified
        </div>
        <div className="behind">
          &copy;{new Date().getFullYear()} {hsr.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default RightSide;
