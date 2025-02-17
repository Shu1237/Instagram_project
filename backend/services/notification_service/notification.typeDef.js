import gql from "graphql-tag";

export const notificationTypeDef = gql`
  type Notification {
    id: ID!
    type: String!
    sender_id: ID!
    receiver_id: ID!
    friend_request_id: Int
    sender: User!
    create_at: String!
  }
  type Query {
    myNotifications: [Notification]
  }
  type Subscription {
    notificationAdded(receiver_id: ID!): Notification!
  }
`;
