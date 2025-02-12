import { gql } from "@apollo/client";

export const GET_CHAT_IN_ROOM_QUERY = gql`
  query getChatsInRoom($roomChatId: ID!) {
    chats(roomChatId: $roomChatId) {
      id
      user {
        user_id
        username
        avatar
      }
      createdAt
      content
      images
    }
  }
`;
