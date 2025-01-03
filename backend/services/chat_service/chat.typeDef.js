import gql from "graphql-tag";

export const chatTypeDef = gql`
  type Chat {
    id: ID!
    userId: Int!
    roomChatId: ID!
    content: String
    images: [String]
    is_seen: Boolean
    createdAt: String!
    updatedAt: String!
    deleted: Boolean
    deletedAt: Date
  }
  input ChatInput {
    userId: Int!
    roomChatId: ID!
    content: String
    images: [String]
  }
  type Query {
    chats(roomChatId: ID): [Chat]
    chat(id: ID!): Chat
  }

  type Mutation {
    sendChat(input: ChatInput): Chat!
  }
`;
