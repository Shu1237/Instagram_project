import gql from "graphql-tag";

export const notificationTypeDef = gql`
  type Notification {
    id: ID!
    type: String!
    sender_id: Int!
    receiver_id: Int!
    friend_request_id: Int
    create_at: String!
  }
  type Subscription {
    notificationAdded(sender_id: Int!, receiver_id: Int!): Notification!
  }
`;
