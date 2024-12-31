import User from "../../models/mysql/user.js";

export const userResolver = {
  Query: {
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
