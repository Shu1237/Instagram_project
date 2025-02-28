import User from "../../models/mysql/user.js";
import { generateToken } from "../../utils/generateToken.util.js";
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
        return {
          token,
          user,
        };
      });
    },
    //2FA logic
    setup2FA: async (_, { userId }) => {
      try {
        const secret = speakeasy.generateSecret({ length: 20 });
        const url = speakeasy.otpauthURL({
          secret: secret.base32,
          label: `Instagram ${userId}`,
          issuer: "Instagram",
        });
        const qrCode = await qrcode.toDataURL(url);
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
        return {
          secret: secret.base32,
          qrCode,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    verify2FA: async (_, { userId, token }) => {
      try {
        const user = await User.findOne({
          where: {
            user_id: userId,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }
        const verified = speakeasy.totp.verify({
          secret: user.twoFactoSecret,
          encoding: "base32",
          token,
        });
        if (!verified) {
          throw new Error("Invalid 2FA token");
        }
        return {
          verified,
          message: "2FA token is valid",
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
