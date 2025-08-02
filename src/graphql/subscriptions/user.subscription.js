import { gql } from "@apollo/client";

export const USER_STATUS_CHANGED_SUBSCRIPTION = gql`
  subscription userStatusChanged {
    userStatusChanged {
      user_id
      is_online
      last_seen
    }
  }
`;
