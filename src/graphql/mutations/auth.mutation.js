import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: loginInput!) {
    login(input: $input) {
      token
      user {
        user_id
        username
      }
    }
  }
`;
