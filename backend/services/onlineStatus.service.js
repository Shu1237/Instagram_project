import { redisService } from "../config/redis.config.js";
import User from "../models/mysql/user.js";

class OnlineStatusService {
  constructor() {
    this.ONLINE_USERS_KEY = "online_users";
    this.USER_SESSIONS_PREFIX = "user_sessions:";
    this.STATUS_EXPIRE_TIME = 300; // 5 minutes
  }

  // Set user online
  async setUserOnline(userId, connectionId) {
    try {
      // Add user to online set in Redis
      await redisService.sadd(this.ONLINE_USERS_KEY, userId.toString());

      // Store connection mapping
      await redisService.set(
        `${this.USER_SESSIONS_PREFIX}${userId}`,
        { connectionId, timestamp: Date.now() },
        this.STATUS_EXPIRE_TIME
      );

      // Update database
      await User.update(
        {
          is_online: true,
          last_seen: new Date(),
        },
        { where: { user_id: userId } }
      );

      return true;
    } catch (error) {
      console.error("Error setting user online:", error);
      return false;
    }
  }

  // Set user offline
  async setUserOffline(userId) {
    try {
      // Remove from online set
      await redisService.srem(this.ONLINE_USERS_KEY, userId.toString());

      // Remove session
      await redisService.del(`${this.USER_SESSIONS_PREFIX}${userId}`);

      // Update database
      await User.update(
        {
          is_online: false,
          last_seen: new Date(),
        },
        { where: { user_id: userId } }
      );

      return true;
    } catch (error) {
      console.error("Error setting user offline:", error);
      return false;
    }
  }

  // Get online users
  async getOnlineUsers() {
    try {
      const onlineUserIds = await redisService.smembers(this.ONLINE_USERS_KEY);
      return onlineUserIds || [];
    } catch (error) {
      console.error("Error getting online users:", error);
      return [];
    }
  }

  // Check if user is online
  async isUserOnline(userId) {
    try {
      const isOnline = await redisService.sismember(
        this.ONLINE_USERS_KEY,
        userId.toString()
      );
      return isOnline;
    } catch (error) {
      console.error("Error checking user online status:", error);
      return false;
    }
  } // Get user's last seen
  async getUserLastSeen(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["last_seen", "is_online"],
      });
      return user;
    } catch (error) {
      console.error("Error getting user last seen:", error);
      return null;
    }
  }

  // Cleanup offline users (for periodic cleanup)
  async cleanupOfflineUsers() {
    try {
      const onlineUserIds = await this.getOnlineUsers();
      const now = Date.now();

      for (const userId of onlineUserIds) {
        const session = await redisService.get(
          `${this.USER_SESSIONS_PREFIX}${userId}`
        );

        // If session expired or doesn't exist, mark user as offline
        if (
          !session ||
          now - session.timestamp > this.STATUS_EXPIRE_TIME * 1000
        ) {
          await this.setUserOffline(userId);
        }
      }
    } catch (error) {
      console.error("Error cleaning up offline users:", error);
    }
  }
}

export const onlineStatusService = new OnlineStatusService();
