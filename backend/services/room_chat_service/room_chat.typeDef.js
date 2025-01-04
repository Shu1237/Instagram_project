import { gql } from "graphql-tag";
export const roomChatTypeDef = gql`
  type RoomChat {
    _id: ID!
    roomName: String
    typeRoom: String
    users: [User]
    avatar: String
    background: String
    deleted: Boolean
    deletedAt: String
    createdAt: String
    updatedAt: String
    chats: [Chat]
  }
  type Query {
    roomChat(roomChatId: ID!): RoomChat!
    roomChats: [RoomChat]
    roomChatsForUser(userId: ID!): [RoomChat]!
  }
  type Mutation {
    createRoomChat(
      roomName: String!
      typeRoom: String!
      users: [ID]!
    ): RoomChat!
    updateRoomChat(
      roomChatId: ID!
      roomName: String
      typeRoom: String
      users: [ID]
    ): RoomChat!
    deleteRoomChat(roomChatId: ID!): RoomChat!
  }
`;
