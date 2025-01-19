import { gql } from "@apollo/client";

export const NEW_NOTIFICATIONS = gql`
  subscription Notification($senderId: Int!, $receiverId: Int!) {
    notificationAdded(sender_id: $senderId, receiver_id: $receiverId) {
      id
      sender_id
      receiver_id
      type
      friend_request_id
    }
  }
`;
