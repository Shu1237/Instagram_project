import { gql } from "@apollo/client";

export const SET_UP_2FA = gql`
  query SetUp2FA {
    setup2FA {
      secret
      qrCode
    }
  }
`;
export const GET_USER_2FA_STATUS = gql`
  query GetUser2FAStatus {
    getUser2FAStatus
  }
`;

export const ME_QUERY = gql`
  query Authentication {
    me {
      user_id
      username
      full_name
      avatar
      email
      created_at
    }
  }
`;
export const GET_USERS_QUERY = gql`
  query getAllUsers($pageQuery: Int, $limitQuery: Int) {
    users(pageQuery: $pageQuery, limitQuery: $limitQuery) {
      user_id
      username
      avatar
    }
  }
`;
export const GET_PROFILE = gql`
  query getUser($userId: ID!) {
    user(user_id: $userId) {
      user_id
      username
      full_name
      avatar
      posts {
        id
      }
      followers {
        user_id
      }
      following {
        user_id
      }
    }
  }
`;
export const GET_USER_POST_PROFILE = gql`
  query getPosts($userId: ID!) {
    getUserPosts(user_id: $userId) {
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
