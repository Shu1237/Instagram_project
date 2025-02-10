import { gql } from "@apollo/client";
export const NEW_NOTIFICATIONS = gql`
  subscription Notification($receiverId: Int!) {
    notificationAdded(receiver_id: $receiverId) {
      id
      sender_id
      receiver_id
      type
      friend_request_id
    }
  }
`;
