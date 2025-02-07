import { gql } from "@apollo/client";

export const GET_ROOMCHATS_QUERY = gql`
  query getAllRoomChat {
    roomChats {
      _id
      roomName
      users {
        user_id
        username
        avatar
      }
      typeRoom
    }
  }
`;
