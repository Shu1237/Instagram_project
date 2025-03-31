import gql from "graphql-tag";

export const commentTypeDef = gql`
    type Comment {
        id: ID!
        post_id: ID!
        user: User!
        parent_id: ID
        content: String!
        media_urls: [String]
        created_at: String!
        updated_at: String
    }

    type User {
        user_id: ID!
        full_name: String
        avatar: String
    }

    input PostCommentInput {
        post_id: ID!
        user_id: ID!
        parent_id: ID
        content: String!
        media_urls: [String]
    }

    type Query {
        getComments(post_id: ID!): [Comment]
        # getAComment(id: ID!): Comment
    }

    type Mutation {
        postComment(input: PostCommentInput!): Comment
        updateComment(id: ID!, input: PostCommentInput!): Comment
        deleteComment(id: ID!): Comment
    }

    type Subscription {
        commentPosted(post_id: ID!, parent_id: ID): Comment
    }
`;