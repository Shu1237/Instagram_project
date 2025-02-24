import { gql } from '@apollo/client';

export const GET_COMMENTS_QUERY = gql`
  query GetComments($post_id: ID!) {
    getComments(post_id: $post_id) {
      id
      post_id
      user {
        user_id
        full_name
        avatar
      }
      parent_id
      content
      media_urls
      created_at
      updated_at
    }
  }
`;