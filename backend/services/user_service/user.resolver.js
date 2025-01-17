import User from "../../models/mysql/user.js";

const CACHE_KEYS = {
  USER: (id) => `USER_${id}`,
  USERS_PAGE: (page, limit) => `USERS_PAGE_${page}_LIMIT_${limit}`,
  USER_PROFILE: (id) => `USER_PROFILE_${id}`,
};

export const userResolver = {
  Query: {
    async users(_, { pageQuery, limitQuery }, { cache }) {
      try {
        let page = pageQuery || 1,
          limit = limitQuery || 4;
        const offset = (page - 1) * limit;

        const cacheKey = CACHE_KEYS.USERS_PAGE(page, limit);
        const cachedUsers = await cache.get(cacheKey);

        if (cachedUsers) return cachedUsers;

        const users = await User.findAll({ offset, limit });
        await cache.set(cacheKey, users, 300); // 5 minutes TTL
        return users;
      } catch (error) {
        throw new Error("Error fetching users");
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
  },

  Mutation: {
    async updateProfile(_, { input }, { cache, user }) {
      try {
        const updatedUser = await User.update(input, {
          where: { user_id: user.user_id },
          returning: true,
        });

        // Invalidate related caches
        await Promise.all([
          cache.del(CACHE_KEYS.USER(user.user_id)),
          cache.del(CACHE_KEYS.USER_PROFILE(user.user_id)),
        ]);
        await cache.set(CACHE_KEYS.USER(user.user_id), updatedUser, 300); // 5 minutes TTL
        return updatedUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
