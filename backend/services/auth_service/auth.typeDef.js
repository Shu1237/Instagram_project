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
  type TwoFASetupPayload {
    secret: String!
    qrCode: String!
  }
  type TwoFAVerifyPayload {
    verified: Boolean!
    message: String!
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
    setup2FA(userId: ID!): TwoFASetupPayload!
    verify2FA(userId: ID!, token: String!): TwoFAVerifyPayload!
  }
`;
