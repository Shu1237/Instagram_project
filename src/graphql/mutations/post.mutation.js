import { gql } from "@apollo/client";

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      user {
        user_id
      }
      caption
      media_urls
      status
    }
  }
`;
export const LIKE_POST_MUTATION = gql`
  mutation likePost($likePostId: ID!, $userId: ID!) {
    likePost(id: $likePostId, userId: $userId)
  }
`;
