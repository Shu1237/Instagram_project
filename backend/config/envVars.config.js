import dotenv from "dotenv";
import process from "process";
dotenv.config();
const ENV_VARS = {
  PORT: process.env.PORT,
  URI_MYSQL: process.env.URI_MYSQL,
  URI_MONGODB: process.env.URI_MONGODB,
  api: "http://localhost:",
};
export default ENV_VARS;
