import { gql } from "@apollo/client";
export const NEW_NOTIFICATIONS = gql`
  subscription Notification($receiverId: ID!) {
    notificationAdded(receiver_id: $receiverId) {
      id
      sender_id
      receiver_id
      create_at
      sender {
        user_id
        username
        avatar
      }
      type
    }
  }
`;
