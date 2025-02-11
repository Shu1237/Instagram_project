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
