import gql from "graphql-tag";
export const friendTypeDef = gql`
  type FriendRequest {
    id: ID!
    sender_id: ID!
    receiver_id: ID!
    status: String!
    create_at: String!
  }
  type Query {
    friendRequests: [FriendRequest!]!
    friendRequest(id: ID!): FriendRequest!
  }
  type DestroyFriendRequest {
    status: String!
    FriendRequest: FriendRequest
  }
  type Mutation {
    acceptFriendRequest(id: ID!): FriendRequest!
    declineFriendRequest(id: ID!): DestroyFriendRequest
    sendFriendRequest(receiver_id: ID!): FriendRequest!
  }
`;
