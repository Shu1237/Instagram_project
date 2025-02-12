import { gql } from "@apollo/client";
export const TYPING_STATUS_SUBSCRIPTION = gql`
  subscription TypingStatus($roomChatId: ID!) {
    typingStatus(roomChatId: $roomChatId) {
      isTyping
      user {
        user_id
        username
        full_name
        avatar
      }
    }
  }
`;
export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription OnMessageAdded($roomChatId: ID!) {
    messageAdded(roomChatId: $roomChatId) {
      id
      content
      user {
        user_id
        full_name
        avatar
      }
      createdAt
    }
  }
`;
