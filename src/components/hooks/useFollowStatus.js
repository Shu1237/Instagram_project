import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FRIEND_REQUEST_QUERY } from "../../graphql/query/friendRequest.query";
import {
  SEND_FRIEND_REQUEST_MUTATION,
  CANCEL_FRIEND_REQUEST_MUTATION,
  ACCEPT_FRIEND_REQUEST_MUTATION,
} from "../../graphql/mutations/follow.mutation";

export const useFollowStatus = (profileUserId, currentUserId) => {
  const [followStatus, setFollowStatus] = useState("Follow");
  const [isLoading, setIsLoading] = useState(false);

  // GraphQL operations
  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST_MUTATION, {
    refetchQueries: [{ query: FRIEND_REQUEST_QUERY }],
  });
  const [cancelFriendRequest] = useMutation(CANCEL_FRIEND_REQUEST_MUTATION, {
    refetchQueries: [{ query: FRIEND_REQUEST_QUERY }],
  });
  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST_MUTATION, {
    refetchQueries: [{ query: FRIEND_REQUEST_QUERY }],
  });

  const { data: friendRequestsData } = useQuery(FRIEND_REQUEST_QUERY);

  // Determine follow status based on friend requests
  useEffect(() => {
    if (friendRequestsData?.friendRequests && profileUserId && currentUserId) {
      const request = friendRequestsData.friendRequests.find(
        (req) =>
          (parseInt(req.sender_id) === parseInt(currentUserId) &&
            parseInt(req.receiver_id) === parseInt(profileUserId)) ||
          (parseInt(req.receiver_id) === parseInt(currentUserId) &&
            parseInt(req.sender_id) === parseInt(profileUserId))
      );

      if (request) {
        if (request.status === "accepted") {
          setFollowStatus("Following");
        } else if (parseInt(request.receiver_id) === parseInt(currentUserId)) {
          setFollowStatus("Follow Back");
        } else if (parseInt(request.sender_id) === parseInt(currentUserId)) {
          setFollowStatus("Pending");
        }
      } else {
        setFollowStatus("Follow");
      }
    }
  }, [friendRequestsData?.friendRequests, profileUserId, currentUserId]);

  const handleFollowAction = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    const previousStatus = followStatus;

    try {
      switch (followStatus) {
        case "Follow":
          setFollowStatus("Pending");
          await sendFriendRequest({ variables: { receiverId: profileUserId } });
          break;
        case "Following":
        case "Pending":
          setFollowStatus("Follow");
          await cancelFriendRequest({
            variables: { cancelFriendRequestId: profileUserId },
          });
          break;
        case "Follow Back":
          setFollowStatus("Following");
          await acceptFriendRequest({
            variables: { acceptFriendRequestId: profileUserId },
          });
          break;
      }
    } catch (error) {
      console.error("Error handling follow action:", error);
      // Revert status on error
      setFollowStatus(previousStatus);
    } finally {
      setIsLoading(false);
    }
  }, [
    followStatus,
    isLoading,
    profileUserId,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
  ]);

  const getFollowButtonConfig = useCallback(() => {
    switch (followStatus) {
      case "Following":
        return {
          text: "Following",
          variant: "outline",
          className:
            "border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300",
        };
      case "Pending":
        return {
          text: "Pending",
          variant: "outline",
          className:
            "border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300",
        };
      case "Follow Back":
        return {
          text: "Follow Back",
          variant: "default",
          className: "bg-blue-500 hover:bg-blue-600 text-white",
        };
      default:
        return {
          text: "Follow",
          variant: "default",
          className: "bg-blue-500 hover:bg-blue-600 text-white",
        };
    }
  }, [followStatus]);

  return {
    followStatus,
    isLoading,
    handleFollowAction,
    getFollowButtonConfig,
    isFollowing: followStatus === "Following",
  };
};
