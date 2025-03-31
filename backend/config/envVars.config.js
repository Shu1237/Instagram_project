import dotenv from "dotenv";
import process from "process";
dotenv.config();
const ENV_VARS = {
  PORT: process.env.PORT,
  URI_MYSQL: process.env.URI_MYSQL,
  URI_MONGODB: process.env.URI_MONGODB,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  URI_GRAPHQL: process.env.URI_GRAPHQL,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  SYSTEM_EMAIL: process.env.SYSTEM_EMAIL,
  SYSTEM_PASS: process.env.SYSTEM_PASS,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  api: "http://localhost:",
};
export default ENV_VARS;
