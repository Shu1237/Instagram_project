import User from "../../models/mysql/user.js";
import ForgotPassword from "../../models/mongodb/forgot_password.model.js";
import { generateToken } from "../../utils/generateToken.util.js";
import { sendMail } from "../../utils/sendMail.util.js";
import { generateRandomString } from "../../utils/generateRandomString.util.js";
import bcryptjs from "bcryptjs";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import {
  signupMiddleware,
  loginMiddleware,
} from "../../middlewares/auth.middleware.js";
export const authResolver = {
  Query: {
    me(_, __, context) {
      if (!context.user) throw new Error("Not authenticated !" + context);
      return context.user.user;
    },
    setup2FA: async (_, __, context) => {
      try {
        const userId = context.user.user.user_id;
        const secret = speakeasy.generateSecret({ length: 20 });

        // Generate OTPAuth URL
        const url = speakeasy.otpauthURL({
          secret: secret.base32,
          label: `Instagram ${userId}`,
          issuer: "Instagram",
          encoding: "base32",
        });

        // Generate QR Code
        const qrCode = await qrcode.toDataURL(url);

        // Save the secret to the database
        await User.update(
          {
            twoFactorSecret: secret.base32,
          },
          {
            where: {
              user_id: userId,
            },
          }
        );

        // console.log("Generated Secret:", secret.base32);
        // console.log("OTPAuth URL:", url);

        return {
          secret: secret.base32,
          qrCode,
        };
      } catch (error) {
        console.error("Error in setup2FA:", error.message);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    signup: async (_, args, context) => {
      return await signupMiddleware(args, async () => {
        const { username, email, full_name, password } = args.input;
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
          full_name,
          is_active: true,
        });
        const userInfo = {
          user_id: user.user_id,
          username: user.username,
          full_name: user.full_name,
          avatar: user.avatar,
        };
        const token = generateToken(userInfo);
        return {
          token,
          user,
        };
      });
    },
    login: async (_, args) => {
      return await loginMiddleware(args, async (user, token) => {
        // check 2fa of user
        if (user.twoFactorSecret) {
          return {
            user,
          };
        }
        return {
          token,
          user,
        };
      });
    },
    //2FA logic

    verify2FA: async (_, { token }, context) => {
      try {
        const userId = context.user.user.user_id;

        // Find the user
        const user = await User.findOne({
          where: {
            user_id: userId,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }

        // Verify the token
        const checking = {
          secret: user.dataValues.twoFactorSecret,
          encoding: "base32",
          token: token,
          window: 2, // Allow a small margin of error
        };

        // console.log("Secret from DB:", checking.secret);
        // console.log("Token to Verify:", checking.token);

        const verified = speakeasy.totp.verify(checking);

        // console.log("Verification Result:", verified);

        if (!verified) {
          throw new Error("Invalid 2FA token");
        }
        // Update user's 2FA status
        await User.update(
          {
            isTwoFactorEnabled: true,
          },
          {
            where: {
              user_id: userId,
            },
          }
        );

        return {
          verified,
          message: "2FA token is valid",
        };
      } catch (error) {
        console.error("Error in verify2FA:", error.message);
        throw new Error(error.message);
      }
    },
    cancel2FA: async (_, __, context) => {
      try {
        const userId = context.user.user.user_id;
        // Find the user
        const user = await User.findOne({
          where: {
            user_id: userId,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }
        // Update user's 2FA status
        await User.update(
          {
            isTwoFactorEnabled: false,
            twoFactorSecret: null,
          },
          {
            where: {
              user_id: userId,
            },
          }
        );

        return user;
      } catch (error) {
        console.error("Error in cancel2FA:", error.message);
        throw new Error(error.message);
      }
    },
    verify2FALogin: async (_, { userId, token }) => {
      try {
        // Find the user
        const user = await User.findOne({
          where: {
            user_id: userId,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }

        // Verify the token
        const checking = {
          secret: user.dataValues.twoFactorSecret,
          encoding: "base32",
          token: token,
          window: 2, // Allow a small margin of error
        };

        const verified = speakeasy.totp.verify(checking);

        if (!verified) {
          throw new Error("Invalid 2FA token");
        }
        const userInfo = {
          user_id: user?.user_id,
          username: user?.username,
          full_name: user?.full_name,
          avatar: user?.avatar,
          email: user?.email,
          created_at: user?.created_at,
        };
        const tokenjwt = generateToken(userInfo);

        return tokenjwt;
      } catch (error) {
        console.error("Error in verify2FA:", error.message);
        throw new Error(error.message);
      }
    },
    //forgot password
    forgotPassword: async (_, { email }) => {
      try {
        //check existed user
        const existedUser = await User.findOne({
          where: {
            email: email,
          },
        });
        if (!existedUser) throw new Error("Email not found");
        // send otp to their email address
        const existedEmailInForgotPassword = await ForgotPassword.findOne({
          email: email,
        });
        if (!existedEmailInForgotPassword) {
          const dataInfo = {
            email: email,
            otp: generateRandomString(6),
            expireAt: Date.now() + 3 * 60 * 1000, //3 mins expire
          };
          const newForgot = new ForgotPassword(dataInfo);
          await newForgot.save();
          const subject = "Xác thực mã OTP";
          const text = `Mã xác thực của bạn là <b>${dataInfo.otp}</b>. Mã OTP có hiệu lực trong vòng 3 phút, vui lòng không cung cấp mã OTP cho bất kỳ ai.`;
          sendMail(dataInfo.email, subject, text);
        }
        return existedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    // verifying the sent otp in their email
    checkResetPasswordToken: async (_, { token }) => {
      try {
        const existedToken = await ForgotPassword.findOne({
          otp: token,
        });
        if (!existedToken) throw new Error("Token not found");
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // reset password
    resetPassword: async (_, { userId, newPassword }) => {
      try {
        const user = await User.findOne({
          where: {
            user_id: userId,
          },
        });
        if (!user) throw new Error("User not found");
        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        await User.update(
          {
            password: hashedPassword,
          },
          {
            where: {
              user_id: userId,
            },
          }
        );
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
