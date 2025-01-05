import User from "../../models/mysql/user.js";
import { performance } from "perf_hooks";

const CACHE_KEYS = {
  ALL_USERS: "users:all",
  USER_BY_ID: (id) => `user:${id}`,
};

export const userResolver = {
  Query: {
    async users(_, __, { cache }) {
      const start = performance.now();
      try {
        // Try get from cache
        const cacheStart = performance.now();
        const cachedUsers = await cache.get(CACHE_KEYS.ALL_USERS);
        console.log(
          `Cache lookup duration: ${performance.now() - cacheStart}ms`
        );

        if (cachedUsers) {
          console.log(
            `Cache HIT - Total duration: ${performance.now() - start}ms`
          );
          return cachedUsers;
        }

        // If not in cache, get from DB
        const dbStart = performance.now();
        const allUsers = await User.findAll();
        console.log(
          `Database query duration: ${performance.now() - dbStart}ms`
        );

        // Store in cache
        const cacheSetStart = performance.now();
        await cache.set(CACHE_KEYS.ALL_USERS, allUsers);
        console.log(
          `Cache set duration: ${performance.now() - cacheSetStart}ms`
        );

        console.log(
          `Cache MISS - Total duration: ${performance.now() - start}ms`
        );
        return allUsers;
      } catch (error) {
        console.error(`Error duration: ${performance.now() - start}ms`, error);
        throw new Error("Error fetching users");
      }
    },
  },
};
