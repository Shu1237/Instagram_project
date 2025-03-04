import { gql } from "@apollo/client";

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile($input: UpdateUserInput) {
    updateProfile(input: $input) {
      full_name
      email
      avatar
    }
  }
`;
