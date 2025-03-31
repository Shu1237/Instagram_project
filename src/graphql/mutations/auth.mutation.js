import { gql } from "@apollo/client";

export const VERIFY_2FA_CODE_MUTATION = gql`
  mutation Verify2FACode($token: String!) {
    verify2FA(token: $token) {
      message
      verified
    }
  }
`;

export const VERIFY_2FA_LOGIN_MUTATION = gql`
  mutation verify2FALogin($userId: ID!, $token: String!) {
    verify2FALogin(userId: $userId, token: $token)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: loginInput!) {
    login(input: $input) {
      token
      user {
        user_id
        username
        isTwoFactorEnabled
      }
    }
  }
`;
export const SIGNUP_MUTATION = gql`
  mutation Signup($input: signupInput!) {
    signup(input: $input) {
      token
      user {
        user_id
        username
      }
    }
  }
`;
export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      user_id
      username
      full_name
      avatar
    }
  }
`;
export const CHECK_RESET_PASSWORD_TOKEN_MUTATION = gql`
  mutation checkResetPasswordToken($token: String!) {
    checkResetPasswordToken(token: $token)
  }
`;
export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($userId: ID!, $newPassword: String!) {
    resetPassword(userId: $userId, newPassword: $newPassword)
  }
`;

export const GOOGLE_LOGIN_MUTATION = gql`
  mutation GoogleLogin($googleToken: String!) {
    googleLogin(googleToken: $googleToken) {
      token
      user {
        user_id
        username
        full_name
        avatar
      }
    }
  }
`;
