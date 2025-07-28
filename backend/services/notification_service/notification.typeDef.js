import gql from "graphql-tag";

export const notificationTypeDef = gql`
  type Notification {
    id: ID!
    type: String!
    sender_id: ID!
    receiver_id: ID!
    friend_request_id: Int
    post_id: String
    message: String
    sender: User!
    create_at: String!
  }

  type UploadProgress {
    userId: ID!
    progress: Int!
    status: String!
    fileName: String
    totalFiles: Int
    currentFile: Int
  }

  type PostUploadStatus {
    userId: ID!
    status: String!
    postId: String
    message: String
  }

  type Query {
    myNotifications: [Notification]
  }

  type Mutation {
    publishUploadProgress(
      userId: ID!
      progress: Int!
      status: String!
      fileName: String
      totalFiles: Int
      currentFile: Int
    ): Boolean

    publishPostUploadStatus(
      userId: ID!
      status: String!
      postId: String
      message: String
    ): Boolean
  }

  type Subscription {
    notificationAdded(receiver_id: ID!): Notification!
    uploadProgress(userId: ID!): UploadProgress!
    postUploadStatus(userId: ID!): PostUploadStatus!
  }
`;
