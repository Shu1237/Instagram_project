import { gql } from "graphql-tag";
export const userTypeDef = gql`
  type User {
    user_id: ID!
    username: String
    full_name: String
    password: String
    avatar: String
    email: String
    followers: [User]
    following: [User]
    bio: String
    phone: String
    is_active: Boolean
    created_by: String
    created_at: String
    updated_at: String
    posts: [Post]
    isTwoFactorEnabled: Boolean
    is_online: Boolean
    last_seen: String
    # stories: [Story!]!
  }
  input UpdateUserInput {
    full_name: String
    email: String
    avatar: String
  }
  type Query {
    user(user_id: ID!): User!
    users(pageQuery: Int, limitQuery: Int): [User!]!
    getUser2FAStatus: Boolean
    getUserPosts(user_id: ID!): [Post]
    getOnlineUsers: [User!]!
    getUserOnlineStatus(user_id: ID!): UserOnlineStatus!
  }

  type UserOnlineStatus {
    user_id: ID!
    is_online: Boolean!
    last_seen: String
  }

  type Subscription {
    userStatusChanged: UserStatusUpdate!
  }

  type UserStatusUpdate {
    user_id: ID!
    is_online: Boolean!
    last_seen: String
  }

  type Mutation {
    updateProfile(input: UpdateUserInput): User!
  }
`;
