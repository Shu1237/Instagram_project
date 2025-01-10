export const notificationResolver = {
  Subscription: {
    notificationAdded: {
      subscribe: (_, { sender_id, receiver_id }, { pubsub }) => {
        return pubsub.asyncIterableIterator([
          `NOTIFICATION_ADDED.${sender_id}.${receiver_id}`,
        ]);
      },
    },
  },
};
