import { gql } from "graphql-tag";
export const userTypeDef = gql`
  type User {
    user_id: ID!
    username: String
    full_name: String
    password: String
    avatar: String
    email: String
    followers: [User!]!
    following: [User!]!
    bio: String
    phone: String
    is_active: Boolean
    created_by: String
    created_at: String
    updated_at: String
    # posts: [Post!]!
    # stories: [Story!]!
  }
  type Query {
    user(user_id: ID!): User!
    users: [User!]!
    me: User!
  }
`;
