import gql from "graphql-tag";

export const postTypeDef = gql`
  type Post {
    id: ID!
    user: User!
    caption: String!
    media_urls: [String]
    interaction: [Int]
    status: String!
    created_at: String
    updated_at: String
  }

  type User {
    user_id: ID!
    full_name: String
    avatar: String
  }

  input CreatePostInput {
    user_id: ID!
    caption: String!
    media_urls: [String]!
    status: String
  }

  input UpdatePostInput {
    caption: String
    media_urls: [String]
    status: String
  }

  type Query {
    testConnection: String
    getPosts(page: Int!): [Post]
    getAPost(id: ID!): Post
  }

  type Mutation {
    createPost(input: CreatePostInput): Post
    updatePost(id: ID!, input: UpdatePostInput): Post
    deletePost(id: ID!): Post
    likePost(id: ID!, userId: ID!): Boolean
    # unlikePost(id: ID!, userId: ID!): Boolean
  }
`;
