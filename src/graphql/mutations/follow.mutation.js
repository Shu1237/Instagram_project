import { gql } from "@apollo/client";

export const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation sendFriendRequest($receiverId: ID!) {
    sendFriendRequest(receiver_id: $receiverId) {
      id
      sender_id
      receiver_id
      status
      create_at
    }
  }
`;
