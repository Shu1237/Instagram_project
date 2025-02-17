import User from "../../models/mysql/user.js";
import Notification from "../../models/mysql/notifications.js";
export const notificationResolver = {
  Query: {
    myNotifications: async (_, __, { user }) => {
      try {
        const notifications = await Notification.findAll({
          where: {
            receiver_id: user.user.user_id,
          },
        });
        return notifications;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    notificationAdded: {
      subscribe: (_, { receiver_id }, { pubsub }) => {
        return pubsub.asyncIterableIterator([
          `NOTIFICATION_ADDED.${receiver_id}`,
        ]);
      },
    },
  },
  Notification: {
    sender: async (parent) => {
      try {
        // console.log(parent);
        const sender = await User.findByPk(parent.dataValues.sender_id);
        return sender;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
