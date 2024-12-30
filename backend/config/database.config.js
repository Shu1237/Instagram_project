import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import ENV_VARS from "./envVars.config.js";

const sequelize = new Sequelize(ENV_VARS.URI_MYSQL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySql database connected successfully");
    await mongoose.connect(ENV_VARS.URI_MONGODB);
    console.log("MongoDB database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connect };
