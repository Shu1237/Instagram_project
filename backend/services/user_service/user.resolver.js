import User from "../../models/mysql/user.js";

export const userResolver = {
  Query: {
    me(_, __, context) {
      if (!context.user) {
        throw new Error("Not authenticated !");
      }
      return context.user;
    },

    async users() {
      try {
        const allUsers = await User.findAll();
        return allUsers;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching users");
      }
    },
  },
};
