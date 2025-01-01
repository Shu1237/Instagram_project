import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Authentication {
    me {
      user_id
      username
    }
  }
`;
