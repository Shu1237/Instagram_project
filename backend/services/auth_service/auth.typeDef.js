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
    token: String
    user: User!
  }
  type Query {
    me: User!
    setup2FA: TwoFASetupPayload!
  }

  type Mutation {
    signup(input: signupInput!): AuthPayLoad!
    login(input: loginInput!): AuthPayLoad!
    verify2FALogin(userId: ID!, token: String!): String!
    verify2FA(token: String!): TwoFAVerifyPayload!
    cancel2FA: User
    forgotPassword(email: String!): User!
    checkResetPasswordToken(token: String!): Boolean!
    resetPassword(userId: ID!, newPassword: String!): Boolean!
  }
`;
