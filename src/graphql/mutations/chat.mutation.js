import { gql } from "@apollo/client";
export const SET_TYPING_STATUS = gql`
  mutation SetTypingStatus($roomChatId: ID!, $isTyping: Boolean!) {
    setTypingStatus(roomChatId: $roomChatId, isTyping: $isTyping)
  }
`;
