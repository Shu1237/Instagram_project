import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Authentication {
    me {
      user_id
      username
      full_name
      avatar
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
    }
  }
`;
