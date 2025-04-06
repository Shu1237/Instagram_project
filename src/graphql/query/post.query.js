import { gql } from "@apollo/client";

export const GET_POST_QUERY = gql`
  query GetPosts($page: Int!) {
    getPosts(page: $page) {
      id
      user {
        user_id
        full_name
        avatar
      }
      caption
      media_urls
      interaction
      status
      created_at
      updated_at
    }
  }
`;
