import { createClient } from "redis";
import ENV_VARS from "./envVars.config.js";

class RedisService {
  constructor() {
    this.client = createClient({
      username: ENV_VARS.REDIS_USERNAME,
      password: ENV_VARS.REDIS_PASSWORD,
      socket: {
        host: ENV_VARS.REDIS_HOST,
        port: ENV_VARS.REDIS_PORT,
      },
      retry_strategy: (options) => {
        if (options.total_retry_time > 1000 * 60 * 60) {
          return new Error("Retry time exhausted");
        }
        return Math.min(options.attempt * 100, 3000);
      },
    });
    this.client.on("error", (err) => {
      console.error(`Error connecting to Redis: ${err}`);
    });
    this.client.on("connect", () => {
      console.log("Connected to Redis");
    });
    this.client.on("reconnecting", () => {
      console.log("Reconnecting to Redis");
    });
  }
  async connect() {
    try {
      await this.client.connect();
    } catch (error) {
      console.log("Error connecting to Redis: ", error);
      throw error;
    }
  }
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.log("Error connecting to Redis: ", error);
      return null;
    }
  }
  async set(key, value, expires = 3600) {
    try {
      const stringValue = JSON.stringify(value);
      await this.client.set(key, stringValue, {
        EX: expires,
      });
      return true;
    } catch (error) {
      console.error("[Redis] Set Error:", error);
      return false;
    }
  }
  async del(key) {
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error("[Redis] Delete Error:", error);
      return false;
    }
  }
  async quit() {
    try {
      await this.client.quit();
      console.info("[Redis] Client Disconnected");
    } catch (error) {
      console.error("[Redis] Quit Error:", error);
      throw error;
    }
  }
}
export const redisService = new RedisService();
