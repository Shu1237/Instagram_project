import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import ENV_VARS from "./envVars.config.js";
import process from "process";

mongoose.set("strictQuery", true);

const sequelize = new Sequelize(ENV_VARS.URI_MYSQL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const connectMongoDB = async (retryCount = 0, maxRetries = 5) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  try {
    // Enhanced MongoDB connection options for cloud deployment
    const mongoOptions = {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 30000, // 30 seconds
      maxPoolSize: 10,
      minPoolSize: 2, // Reduced for cloud deployment
      maxIdleTimeMS: 30000,
      retryWrites: true,
      retryReads: true,
      // Add these options for better cloud compatibility
      heartbeatFrequencyMS: 10000,
      serverSelectionRetryDelayMS: 5000,
      // Additional options for Render deployment
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
      maxConnecting: 2, // Limit concurrent connections
      family: 4, // Use IPv4, skip trying IPv6
    };

    console.log(`Attempting MongoDB connection (attempt ${retryCount + 1}/${maxRetries + 1})...`);
    console.log("MONGODB_URI:", ENV_VARS.URI_MONGODB ? ENV_VARS.URI_MONGODB.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@') : 'undefined');
    
    await mongoose.connect(ENV_VARS.URI_MONGODB, mongoOptions);
    console.log("MongoDB database connected successfully");
    return true;
  } catch (error) {
    console.error(`MongoDB connection attempt ${retryCount + 1} failed:`, error.message);
    
    // Log specific error types to help with debugging
    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.error('Network connectivity issue - check DNS resolution and network access');
    } else if (error.message.includes('authentication failed')) {
      console.error('Authentication issue - check MongoDB credentials');
    } else if (error.message.includes('IP whitelist') || error.message.includes('not authorized')) {
      console.error('IP whitelist issue - ensure 0.0.0.0/0 is allowed in MongoDB Atlas Network Access');
      console.error('For Render deployment, also check: https://render.com/docs/outbound-ip-addresses');
    } else if (error.message.includes('ServerSelectionTimeoutError')) {
      console.error('Server selection timeout - MongoDB Atlas cluster may be unreachable');
    }
    
    if (retryCount < maxRetries) {
      const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Exponential backoff, max 10s
      console.log(`Retrying MongoDB connection in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return connectMongoDB(retryCount + 1, maxRetries);
    } else {
      console.error("MongoDB connection failed after all retry attempts");
      if (isProduction) {
        // In production, log the error but don't exit immediately
        console.error("WARNING: MongoDB connection failed. Some features may not work properly.");
        return false;
      } else {
        // In development, still exit to catch issues early
        throw error;
      }
    }
  }
};

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySql database connected successfully");

    const mongoConnected = await connectMongoDB();
    if (!mongoConnected) {
      console.warn("Application starting without MongoDB connection");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit if database connection fails
  }
};

// Health check function for monitoring database connectivity
const checkDatabaseHealth = async () => {
  const health = {
    mysql: { connected: false, error: null },
    mongodb: { connected: false, error: null }
  };

  try {
    await sequelize.authenticate();
    health.mysql.connected = true;
  } catch (error) {
    health.mysql.error = error.message;
  }

  try {
    if (mongoose.connection.readyState === 1) {
      health.mongodb.connected = true;
    } else {
      health.mongodb.error = "MongoDB not connected";
    }
  } catch (error) {
    health.mongodb.error = error.message;
  }

  return health;
};

export { sequelize, connect, checkDatabaseHealth };
