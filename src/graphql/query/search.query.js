import { gql } from "@apollo/client";

export const SEARCH_USERS_QUERY_QUERY = gql`
  query searchUser($searchTerm: String!) {
    searchUsers(searchTerm: $searchTerm) {
      user_id
      username
      full_name
      avatar
    }
  }
`;
