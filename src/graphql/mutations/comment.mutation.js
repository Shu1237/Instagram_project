import { gql } from "@apollo/client";

export const POST_COMMENT_MUTATION = gql`
  mutation PostComment($input: PostCommentInput!) {
    postComment(input: $input) {
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