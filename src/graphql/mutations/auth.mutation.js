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
export const SIGNUP_MUTATION = gql`
  mutation Signup($input: signupInput!) {
    signup(input: $input) {
      token
      user {
        user_id
        username
      }
    }
  }
`;
