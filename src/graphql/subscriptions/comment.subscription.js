import { gql } from "@apollo/client"

export const POSTING_COMMENT_SUBSCRIPTION = gql`
      subscription CommentPosted($post_id: ID!, $parent_id: ID) {
        commentPosted (post_id: $post_id, parent_id: $parent_id) {
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