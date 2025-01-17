import gql from 'graphql-tag';

export const likeTypeDef = gql`
    scalar Date
    type Like {
        like_id: ID!
        post_id: ID!
        user_id: ID!
        created_at: Date
        updated_at: Date
    }
    type Query {
        getLikes: [Like]
    }
    type Mutation {
        likePost(post_id: ID!, user_id: ID!): Like
        deleteLike(id: ID!): Like
    }
`;
