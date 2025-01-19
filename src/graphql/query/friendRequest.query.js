import { gql } from "@apollo/client";

export const FRIEND_REQUEST_QUERY = gql`
  query getFriendRequest {
    friendRequests {
      id
      receiver_id
      sender_id
      create_at
    }
  }
`;
