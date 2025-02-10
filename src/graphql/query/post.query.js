import { gql } from '@apollo/client';

export const GET_POST_QUERY = gql`
    query GetPosts {
        getPosts {
        id
        user {
            user_id
            full_name
            avatar
        }
        caption
        media_urls
        status
        created_at
        updated_at
        }
    }
`;