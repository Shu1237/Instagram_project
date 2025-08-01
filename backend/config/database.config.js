import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import ENV_VARS from "./envVars.config.js";
import process from "process";

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

    // MongoDB connection with timeout and retry configuration
    await mongoose.connect(ENV_VARS.URI_MONGODB, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
    });
    console.log("MongoDB database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit if database connection fails
  }
};

export { sequelize, connect };
