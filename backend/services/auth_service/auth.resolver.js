import User from "../../models/mysql/user.js";
import { generateToken } from "../../utils/generateToken.util.js";
import bcryptjs from "bcryptjs";

import {
  signupMiddleware,
  loginMiddleware,
} from "../../middlewares/auth.middleware.js";
export const authResolver = {
  Query: {
    login: async (_, args) => {
      return await loginMiddleware(args, async (user, token) => {
        return {
          token,
          user,
        };
      });
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
        const token = generateToken(user);
        context.res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        return {
          token,
          user,
        };
      });
    },
  },
};
