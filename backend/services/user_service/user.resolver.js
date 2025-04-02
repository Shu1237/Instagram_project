import User from "../../models/mysql/user.js";
import FriendRequest from "../../models/mysql/friend_request.js";
import Post from "../../models/mongodb/post.model.js";
import { Op } from "sequelize";
const CACHE_KEYS = {
  USER: (id) => `USER_${id}`,
  USERS_PAGE: (page, limit) => `USERS_PAGE_${page}_LIMIT_${limit}`,
  USER_PROFILE: (id) => `USER_PROFILE_${id}`,
};

export const userResolver = {
  Query: {
    async users(_, { pageQuery, limitQuery }, { cache, user }) {
      try {
        let page = pageQuery || 1,
          limit = limitQuery || 4;
        const offset = (page - 1) * limit;

        // const cacheKey = CACHE_KEYS.USERS_PAGE(page, limit);
        // const cachedUsers = await cache.get(cacheKey);

        // if (cachedUsers) return cachedUsers;

        const users = await User.findAll({
          where: {
            user_id: {
              [Op.not]: user.user.user_id,
            },
          },
          offset,
          limit,
        });
        // await cache.set(cacheKey, users, 300); // 5 minutes TTL
        return users;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async user(_, { user_id }, { cache }) {
      try {
        const cacheKey = CACHE_KEYS.USER(user_id);
        const cachedUser = await cache.get(cacheKey);

        if (cachedUser) return cachedUser;

        const user = await User.findByPk(user_id);
        if (!user) throw new Error("User not found");

        await cache.set(cacheKey, user, 300); // 5 minutes TTL
        return user;
      } catch (error) {
        throw new Error("Error fetching user");
      }
    },
    async getUser2FAStatus(_, __, context) {
      try {
        const userId = context.user.user.user_id;
        const user = await User.findByPk(userId);
        return user.isTwoFactorEnabled;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getUserPosts(_, { user_id }) {
      try {
        if (!user_id) {
          throw new Error("Miss the user_id parameter");
        }
        const posts = await Post.find({
          user_id: user_id,
        });
        return posts;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  User: {
    followers: async (parent) => {
      try {
        const userId = parent.user_id;
        // console.log(userId);
        const followers = await FriendRequest.findAll({
          where: {
            [Op.or]: [
              {
                sender_id: userId,
                status: "accepted",
              },
              {
                receiver_id: userId,
                status: ["accepted", "pending"],
              },
            ],
          },
        });
        // console.log(followers);
        const followerIds = followers.map((request) => {
          return request.dataValues.sender_id === userId
            ? request.dataValues.receiver_id
            : request.dataValues.sender_id;
        });
        const followerUsers = await User.findAll({
          where: {
            user_id: {
              [Op.in]: followerIds,
            },
          },
        });
        // console.log(followerUsers);
        return followerUsers;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    following: async (parent) => {
      const userId = parent.user_id;
      const following = await FriendRequest.findAll({
        where: {
          [Op.or]: [
            {
              receiver_id: userId,
              status: "accepted",
            },
            {
              sender_id: userId,
              status: ["accepted", "pending"],
            },
          ],
        },
      });
      const followingIds = following.map((request) => {
        return request.dataValues.sender_id === userId
          ? request.dataValues.receiver_id
          : request.dataValues.sender_id;
      });
      const followingUsers = await User.findAll({
        where: {
          user_id: {
            [Op.in]: followingIds,
          },
        },
      });
      return followingUsers;
    },
  },
  Mutation: {
    async updateProfile(_, { input }, { cache, user }) {
      try {
        const a = await User.update(input, {
          where: { user_id: user.user.user_id },
          // returning: true,
          individualHooks: true,
        });
        // console.log(a[1][0].dataValues);
        const updatedUser = a[1][0].dataValues;

        // // Invalidate related caches
        await Promise.all([
          cache.del(CACHE_KEYS.USER(user.user.user_id)),
          cache.del(CACHE_KEYS.USER_PROFILE(user.user.user_id)),
        ]);
        await cache.set(CACHE_KEYS.USER(user.user.user_id), updatedUser, 300); // 5 minutes TTL
        return updatedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
