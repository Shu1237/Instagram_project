import { gql } from "@apollo/client";

export const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation sendFriendRequest($receiverId: ID!) {
    sendFriendRequest(receiver_id: $receiverId) {
      id
    }
  }
`;
export const CANCEL_FRIEND_REQUEST_MUTATION = gql`
  mutation CancelRequest($cancelFriendRequestId: ID!) {
    cancelFriendRequest(id: $cancelFriendRequestId) {
      status
    }
  }
`;
export const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation acceptFriendRequest($acceptFriendRequestId: ID!) {
    acceptFriendRequest(id: $acceptFriendRequestId) {
      id
    }
  }
`;
