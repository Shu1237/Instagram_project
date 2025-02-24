import User from "../../models/mysql/user.js";
import { Op, Sequelize } from "sequelize";

export const searchResolver = {
  Query: {
    searchUsers: async (_, { searchTerm, limit = 5, offset = 0 }) => {
      try {
        if (!searchTerm.trim()) return [];

        //  FULLTEXT fuzzy search in MySQL
        const users = await User.findAll({
          attributes: ["user_id", "username", "full_name", "avatar"],
          // Use Sequelize.literal() to write raw SQL query
          where: Sequelize.literal(`
            MATCH(username, full_name) AGAINST('${searchTerm}*' IN BOOLEAN MODE)
          `),
          //MATCH(username, full_name) AGAINST('${searchTerm} *' IN BOOLEAN MODE
          limit,
          offset,
        });

        return users;
      } catch (err) {
        console.error("Search error:", err);
        throw new Error("Failed to perform fuzzy search.");
      }
    },
  },
};
