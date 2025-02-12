import DataLoader from "dataloader";

import User from "../../models/mysql/user.js";

const batchUser = async (userIds) => {
  const users = await User.findAll({
    where: {
      user_id: userIds,
    },
  });
  const userMap = users.reduce((acc, user) => {
    acc[user.user_id] = user;
    return acc;
  }, {});
  return userIds.map((userId) => userMap[userId]);
};
export const userLoader = new DataLoader(batchUser);
