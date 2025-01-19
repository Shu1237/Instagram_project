export const notificationResolver = {
  Subscription: {
    notificationAdded: {
      subscribe: (_, { receiver_id }, { pubsub }) => {
        return pubsub.asyncIterableIterator([
          `NOTIFICATION_ADDED.${receiver_id}`,
        ]);
      },
    },
  },
};
