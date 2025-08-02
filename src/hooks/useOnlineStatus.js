import { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_USER_ONLINE_STATUS,
  GET_ONLINE_USERS,
} from "../graphql/query/user.query";
import { USER_STATUS_CHANGED_SUBSCRIPTION } from "../graphql/subscriptions/user.subscription";

export const useOnlineStatus = (userId) => {
  const [onlineStatus, setOnlineStatus] = useState({
    isOnline: false,
    lastSeen: null,
  });

  const { data, loading, error } = useQuery(GET_USER_ONLINE_STATUS, {
    variables: { userId },
    skip: !userId,
    fetchPolicy: "cache-and-network",
  });

  const { data: subscriptionData } = useSubscription(
    USER_STATUS_CHANGED_SUBSCRIPTION,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        if (subscriptionData?.data?.userStatusChanged?.user_id === userId) {
          const statusUpdate = subscriptionData.data.userStatusChanged;
          setOnlineStatus({
            isOnline: statusUpdate.is_online,
            lastSeen: statusUpdate.last_seen,
          });
        }
      },
    }
  );

  useEffect(() => {
    if (data?.getUserOnlineStatus) {
      setOnlineStatus({
        isOnline: data.getUserOnlineStatus.is_online,
        lastSeen: data.getUserOnlineStatus.last_seen,
      });
    }
  }, [data]);

  return {
    isOnline: onlineStatus.isOnline,
    lastSeen: onlineStatus.lastSeen,
    loading,
    error,
  };
};

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { data, loading, error, refetch } = useQuery(GET_ONLINE_USERS, {
    fetchPolicy: "cache-and-network",
    pollInterval: 30000, // Poll every 30 seconds
  });

  const { data: subscriptionData } = useSubscription(
    USER_STATUS_CHANGED_SUBSCRIPTION,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        if (subscriptionData?.data?.userStatusChanged) {
          const statusUpdate = subscriptionData.data.userStatusChanged;
          setOnlineUsers((prevUsers) => {
            const updatedUsers = prevUsers.filter(
              (user) => user.user_id !== statusUpdate.user_id
            );
            if (statusUpdate.is_online) {
              // Add user to online list if they came online
              const existingUser = data?.getOnlineUsers?.find(
                (u) => u.user_id === statusUpdate.user_id
              );
              if (existingUser) {
                updatedUsers.push({
                  ...existingUser,
                  is_online: true,
                  last_seen: statusUpdate.last_seen,
                });
              }
            }
            return updatedUsers;
          });
        }
      },
    }
  );

  useEffect(() => {
    if (data?.getOnlineUsers) {
      setOnlineUsers(data.getOnlineUsers);
    }
  }, [data]);

  return {
    onlineUsers,
    loading,
    error,
    refetch,
  };
};
