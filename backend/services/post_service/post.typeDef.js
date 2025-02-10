import { Upload } from "antd";
import gql from "graphql-tag";


export const postTypeDef = gql`
scalar Upload
    type Post {
        id: ID!,
        user_id: ID!,
        caption: String!,
        media_urls: [String],
        status: String!,
        created_at: String,
        updated_at: String,
    }
    input CreatePostInput {
        user_id: ID!,
        caption: String!,
        media_urls: [Upload]!,
        status: String,
    }
    input UpdatePostInput {
        caption: String,
        status: String,
    }
    type Query {
        getPosts: [Post]
        getAPost(id: ID!): Post
    }
    type Mutation {
        createPost(input: CreatePostInput): Post
        updatedPost(id: ID!, input: UpdatePostInput): Post
        deletedPost(id: ID!): Post
    }
`;