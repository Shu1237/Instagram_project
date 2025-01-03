import gql from "graphql-tag";

export const authTypeDef = gql`
  input loginInput {
    username: String!
    password: String!
  }
  input signupInput {
    username: String!
    password: String!
    full_name: String
    email: String!
  }
  type AuthPayLoad {
    token: String!
    user: User!
  }
  type Query {
    me: User!
  }
  type Mutation {
    signup(input: signupInput!): AuthPayLoad!
    login(input: loginInput!): AuthPayLoad!
  }
`;
