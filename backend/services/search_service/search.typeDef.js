import { gql } from "graphql-tag";

export const searchTypeDef = gql`
  type Query {
    searchUsers(searchTerm: String!): [User]
    searchRooms(searchTerm: String!): [RoomChat]
  }
`;
