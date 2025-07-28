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
          order: [["create_at", "DESC"]],
        });
        return notifications;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    publishUploadProgress: async (
      _,
      { userId, progress, status, fileName, totalFiles, currentFile },
      { pubsub }
    ) => {
      try {
        const progressData = {
          userId,
          progress,
          status,
          fileName,
          totalFiles,
          currentFile,
        };

        await pubsub.publish(`UPLOAD_PROGRESS.${userId}`, {
          uploadProgress: progressData,
        });

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    publishPostUploadStatus: async (
      _,
      { userId, status, postId, message },
      { pubsub }
    ) => {
      try {
        const statusData = {
          userId,
          status,
          postId,
          message,
        };

        await pubsub.publish(`POST_UPLOAD_STATUS.${userId}`, {
          postUploadStatus: statusData,
        });

        return true;
      } catch (error) {
        throw new Error(error.message);
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

    uploadProgress: {
      subscribe: (_, { userId }, { pubsub }) => {
        return pubsub.asyncIterableIterator([`UPLOAD_PROGRESS.${userId}`]);
      },
    },

    postUploadStatus: {
      subscribe: (_, { userId }, { pubsub }) => {
        return pubsub.asyncIterableIterator([`POST_UPLOAD_STATUS.${userId}`]);
      },
    },
  },

  Notification: {
    sender: async (parent) => {
      try {
        const sender = await User.findByPk(parent.dataValues.sender_id);
        return sender;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
