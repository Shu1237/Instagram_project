import React, { useState } from "react";
import "../css/rightSide.css";
import ProfileRight from "../../../assets/profilepic.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import avatars from "../../../avatar.json";
import { useQuery } from "@apollo/client";
import { ME_QUERY, GET_USERS_QUERY } from "../../../graphql/query/user.query";
import { removeCookies } from "../../../utils/cookie.util";
function RightSide() {
  const { loading, error, data } = useQuery(ME_QUERY);
  const { id } = useParams();
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS_QUERY, {
    variables: { pageQuery: 1, limitQuery: 5 },
  });
  const navigate = useNavigate();
  const handleSwitch = () => {
    removeCookies();
    window.location.href = "/";
  };

  const hsr = "instagram from Meta";

  if (loading || usersLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin">Loading...</div>
      </div>
    );

  return (
    <div className="flex flex-col w-full max-w-[320px] px-4">
      {/* Current User Section */}
      <div className="flex items-center justify-between py-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12">
            <Link to={`/profile/${data.me.user_id}`}>
              <img
                className="w-full h-full rounded-full object-cover"
                src={data?.me?.avatar || ProfileRight}
                alt="profileRight"
              />
            </Link>

            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {data ? data.me.username : "Guest"}
            </span>
            <span className="text-gray-500 text-sm">
              {data ? data.me.full_name : "Guest"}
            </span>
          </div>
        </div>

        <button
          onClick={handleSwitch}
          className="text-blue-500 text-sm font-semibold hover:text-blue-600"
        >
          Switch
        </button>
      </div>

      {/* Suggested Users Section */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-semibold text-sm">
            Suggested for you
          </span>
          <button className="text-xs font-semibold hover:text-gray-500">
            See All
          </button>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {usersData?.users?.map((user) => (
            <div
              key={user.user_id}
              className="flex items-center justify-between group py-2"
            >
              <div className="flex items-center space-x-3">
                <Link
                  to={`/profile/${user.user_id}`}
                  className="flex items-center space-x-3"
                >
                  <img
                    src={user.avatar || ProfileRight}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {user.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      Suggested for you
                    </span>
                  </div>
                </Link>
              </div>

              <button className="text-xs font-semibold text-blue-500 hover:text-blue-600">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightSide;
