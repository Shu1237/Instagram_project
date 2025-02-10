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
export const GET_ONE_ROOMCHAT_QUERY = gql`
  query getOneRoomChat($roomChatId: ID!) {
    roomChat(roomChatId: $roomChatId) {
      _id
      roomName
      users {
        full_name
        user_id
        username
        avatar
      }
      typeRoom
    }
  }
`;
