import React, { useState } from "react";
import "../ui/css/rightSide.css";
import ProfileRight from "../../assets/profilepic.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import avatars from "../../avatar.json";
import { useMutation, useQuery } from "@apollo/client";
import { ME_QUERY, GET_USERS_QUERY } from "../../graphql/query/user.query";
import { removeCookies } from "../../utils/cookie.util";
import { SEND_FRIEND_REQUEST_MUTATION } from "../../graphql/mutations/follow.mutation";
import { FRIEND_REQUEST_QUERY } from "../../graphql/query/friendRequest.query";
export default function RightSide() {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { loading, error, data } = useQuery(ME_QUERY);
  const { id } = useParams();
  const [sendFriendRequest, { error: errorSendFriendRequest }] = useMutation(
    SEND_FRIEND_REQUEST_MUTATION
  );
  const { loading: friendRequestsLoading, data: friendRequestsData } =
    useQuery(FRIEND_REQUEST_QUERY);
  // console.log(friendRequestsData);

  const checkFriendRequestStatus = (userId) => {
    const friendRequest = friendRequestsData?.friendRequests.find(
      (request) =>
        (request.sender_id === data?.me?.user_id &&
          request.receiver_id === userId) ||
        (request.receiver_id === data?.me?.user_id &&
          request.sender_id === userId)
    );

    if (friendRequest) {
      if (friendRequest.sender_id === data?.me?.user_id) {
        return "Following";
      } else if (friendRequest.receiver_id === data?.me?.user_id) {
        return "Follow Back";
      }
    }
    return "Follow";
  };
  const handleSendFriendRequest = async (receiverId) => {
    try {
      await sendFriendRequest({
        variables: { receiverId: receiverId },
      });
      setShowSuccess(true);
      setIsFollowing(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
      console.log(error);
    }
  };

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS_QUERY, {
    variables: { pageQuery: 1, limitQuery: 5 },
  });
  const navigate = useNavigate();
  const handleSwitch = () => {
    removeCookies("jwt-token");
    window.location.href = "/";
  };

  const hsr = "instagram from Meta";

  if (loading || usersLoading || friendRequestsLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[320px] px-4">
      {showError && (
        <div className="bg-red-500 text-white text-center py-2 mb-4">
          {errorSendFriendRequest.message}
        </div>
      )}
      {showSuccess && (
        <div className="bg-green-500 text-white text-center py-2 mb-4">
          Friend request sent successfully!
        </div>
      )}
      {/* Auth Section */}
      <div className="flex items-center justify-between py-4 mb-6">
        {data?.me ? (
          // Logged in user view
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12">
              <Link to={`/profile/${data.me.user_id}`}>
                <img
                  className="w-full h-full rounded-full object-cover hover:opacity-90 transition"
                  src={data.me.avatar || ProfileRight}
                  alt={data.me.username}
                />
              </Link>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex flex-col">
              <Link
                to={`/profile/${data.me.user_id}`}
                className="font-semibold text-sm hover:text-gray-500 transition"
              >
                {data.me.username}
              </Link>
              <span className="text-gray-500 text-sm">{data.me.full_name}</span>
            </div>
            <button
              onClick={handleSwitch}
              className="text-blue-500 text-sm font-semibold hover:text-blue-600"
            >
              Switch
            </button>
          </div>
        ) : (
          // Non-authenticated view
          <div className="flex flex-col w-full space-y-3">
            <span className="text-gray-500 text-sm">
              Log in to see your feed
            </span>
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="flex-1 py-1.5 px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition text-center"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="flex-1 py-1.5 px-4 border border-gray-200 text-sm font-semibold rounded hover:bg-gray-50 transition text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
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

              <button
                onClick={() => handleSendFriendRequest(user.user_id)}
                disabled={loading}
                className={`px-4 py-1.5 rounded font-semibold 
                  ${
                    checkFriendRequestStatus(user.user_id) === "Following"
                      ? "bg-gray-200 text-black"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } 
                  transition`}
              >
                {loading
                  ? "Sending..."
                  : checkFriendRequestStatus(user.user_id)}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 w-4/5">
          <div className="text-xs text-gray-500 flex justify-between">
            About Help Press API Jobs Privacy Terms Locations Language Meta
            Verified
          </div>
          <div className="mt-8 text-xs text-gray-500 flex justify-center">
            &copy;{new Date().getFullYear()} {hsr.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
