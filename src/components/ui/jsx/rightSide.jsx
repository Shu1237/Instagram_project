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
    <div className="flex flex-col pt-[12px] w-full">
      <div className="mt-10px] flex w-[90%] mt-[30px] items-center justify-between">
        <div className="flex items-center gap-[20px]">
          <div className="w-[45px] h-[45px] rounded-[50%]">
            <img
              className="w-full rounded-full"
              src={ProfileRight}
              alt="profileRight"
            />
          </div>
          <div className="flex flex-col items center">
            <div className="text-base font-500">
              {data ? data.me.username : "Guest"}
            </div>
            <div className="text-slate-500">
              {data ? data.me.full_name : "Guest"}
            </div>
          </div>
        </div>
        <div className=" cursor-pointer text-xl ">
          <Link className="no-underline text-[#34ABF8] font-semibold" to="/login">
            {" "}
            Switch
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between w-[90%] mt-5">
        <div className="text-slate-500 text-xl"> Suggested for you</div>
        <div className="font-medium text-xl">see All</div>
      </div>

      {avatars.map((avatar, index) => {
        return (
          <div
            key={index}
            className="mt-[25px] flex items-center justify-between w-[90%]"
          >
            <div className="flex gap-[15px] items-center">
              <div className="w-[60px] h-[60px] rounded-[50%]">
                <img
                  className="w-full h-[60px] rounded-[50%]"
                  src={avatar.img}
                  alt="imgFriend"
                />
              </div>
              <div className="text-info">
                <div className="font-bold">{avatar.nickname}</div>
                <div className="text-slate-500 ">{avatar.followby}</div>
              </div>
            </div>
            <div
              className="text-[#34ABF8] font-semibold cursor-pointer"
              onClick={() => handleChangeFollow(index)}
            >
              {followStates[index]}
            </div>
          </div>
        );
      })}

      <div className="mt-[80px] w-4/5">
        <div className="text-slate-500 text-sm">
          About Help Press API Jobs Privacy Terms Locations Language Meta
          Verified
        </div>
        <div className="text-slate-500 text-sm mt-[10px]">
          &copy;{new Date().getFullYear()} {hsr.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default RightSide;
