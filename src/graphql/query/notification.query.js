import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS_QUERY = gql`
  query myNotifications {
    myNotifications {
      id
      create_at
      type
      sender {
        user_id
        username
        full_name
        avatar
      }
    }
  }
`;
