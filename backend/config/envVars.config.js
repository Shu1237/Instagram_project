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
  api: "http://localhost:",
};
export default ENV_VARS;
