import gql from "graphql-tag";

export const chatTypeDef = gql`
  input ChatInput {
    roomChatId: ID!
    content: String
    images: [String]
  }
  type Chat {
    id: ID!
    user: User!
    roomChatId: ID!
    content: String
    images: [String]
    is_seen: Boolean
    createdAt: String
    updatedAt: String
    deleted: Boolean
    deletedAt: String
  }

  type Query {
    chats(roomChatId: ID!): [Chat]
    chat(id: ID!): Chat
  }

  type Mutation {
    sendChat(input: ChatInput!): Chat!
    setTypingStatus(roomChatId: ID!, isTyping: Boolean): Boolean
  }
  type dataTyping {
    isTyping: Boolean
    user: User
  }
  type Subscription {
    messageAdded(roomChatId: ID!): Chat!
    typingStatus(roomChatId: ID!): dataTyping
  }
`;
