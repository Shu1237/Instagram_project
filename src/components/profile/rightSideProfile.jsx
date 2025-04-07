import React, { useState } from "react";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ModalPost from "../comment/modal.jsx";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
  GET_PROFILE,
  GET_USER_POST_PROFILE,
} from "../../graphql/query/user.query";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import FooterProfile from "./footerProfile";
import HeaderProfile from "./headerProfile";
import * as localStorageFunctions from "../../utils/localStorage.util.js";
import loadingEffect from "../ui/jsx/loading-effect.jsx";

export default function RightSideProfile() {
  const userInfo = localStorageFunctions.getLocalStorage()?.user;
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      userId: parseInt(id),
    },
    skip: !id,
  });
  const {
    loading: loadingPost,
    error: errorPost,
    data: dataPost,
  } = useQuery(GET_USER_POST_PROFILE, {
    variables: {
      userId: parseInt(id),
    },
    skip: !id,
  });

  const [state, setState] = useState(1);

  const handleClick = (number) => setState(number);

  if (loading && loadingPost) return loadingEffect();

  return (
    <div className="w-full max-w-[935px] mx-auto px-4 font-sans">
      {/* Profile Header */}
      <HeaderProfile data={data} meData={userInfo} />

      {/* Navigation Tabs */}
      <div className="border-t border-gray-200 ">
        <div className="flex justify-center space-x-16">
          <button
            className={`py-4 font-semibold text-sm tracking-wider flex items-center space-x-2 ${
              state === 1 ? "border-t border-black text-black" : "text-gray-500"
            }`}
            onClick={() => handleClick(1)}
          >
            <PostAddOutlinedIcon fontSize="small" />
            <span>MY POSTS</span>
          </button>
        </div>
      </div>

      {/* Posts */}
      {state === 1 ? (
        dataPost?.getUserPosts?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
            {dataPost.getUserPosts.map((post) => (
              <div
                key={post.id}
                className="relative w-full h-[350px] rounded-lg shadow-lg cursor-pointer overflow-hidden group"
              >
                <img
                  src={post?.media_urls[0]}
                  alt="Post"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-5">
                  <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <FavoriteOutlinedIcon sx={{ color: "white" }} />
                    <p className="text-white">{post.likes || 0}</p>
                  </div>
                  <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {/* <svg
                      aria-label="Comment"
                      className="text-white"
                      fill="currentColor"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <title>Comment</title>
                      <path
                        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg> */}
                    <ModalPost post={post} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center p-20">
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-bold text-3xl">No Posts Yet</h1>
              <p>When you create posts, they will appear here.</p>
            </div>
          </div>
        )
      ) : null}

      {/* Footer Links */}
      <FooterProfile />
    </div>
  );
}
