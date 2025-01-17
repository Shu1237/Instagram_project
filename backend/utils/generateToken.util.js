import jwt from "jsonwebtoken";
import ENV_VARS from "../config/envVars.config.js";

export const generateToken = (user, res) => {
  const token = jwt.sign({ user }, ENV_VARS.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  return token;
};
