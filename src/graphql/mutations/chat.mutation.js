import { gql } from "@apollo/client";
export const SET_TYPING_STATUS = gql`
  mutation SetTypingStatus($roomChatId: ID!, $isTyping: Boolean!) {
    setTypingStatus(roomChatId: $roomChatId, isTyping: $isTyping)
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendChat($input: ChatInput!) {
    sendChat(input: $input) {
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
