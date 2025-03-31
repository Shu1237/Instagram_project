import Joi from "joi";
import User from "../models/mysql/user.js";
import { Op } from "sequelize";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.util.js";
export const validateSignup = (input) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(30).required(),
    email: Joi.string().email().required(),
    full_name: Joi.string().min(6).max(100).optional(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(input);
};

export const validateLogin = (input) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(input);
};

export const signupMiddleware = async (args, next) => {
  const { error } = validateSignup(args.input);
  if (error) throw new Error(error.details[0].message);
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username: args.input.username }, { email: args.input.email }],
    },
  });
  if (existingUser) {
    throw new Error("User already exists !");
  }
  return next();
};

export const loginMiddleware = async (args, next) => {
  const { error } = validateLogin(args.input);
  if (error) throw new Error(error.details[0].message);
  const user = await User.findOne({
    where: {
      username: args.input.username,
      //   [Op.and]: [
      //     { username: args.input.username },
      //     { email: args.input.email },
      //   ],
    },
  });
  const userInfo = {
    user_id: user?.user_id,
    username: user?.username,
    full_name: user?.full_name,
    avatar: user?.avatar,
    email: user?.email,
    created_at: user?.created_at,
  };
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcryptjs.compare(
    args.input.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const token = generateToken(userInfo);
  return next(user, token);
};
