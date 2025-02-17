import FriendRequest from "../../models/mysql/friend_request.js";
import Notification from "../../models/mysql/notifications.js";
import User from "../../models/mysql/user.js";
import RoomChat from "../../models/mongodb/rooms-chat.model.js";
import { Op } from "sequelize";
export const friendResolver = {
  Query: {
    friendRequests: async (_, __, context) => {
      try {
        if (!context.user)
          throw new Error("Not authenticated, Cannot fetch friend requests");
        const me = context.user.user.user_id;
        const friendRequests = await FriendRequest.findAll({
          where: {
            [Op.or]: [{ sender_id: me }, { receiver_id: me }],
          },
        });
        return friendRequests;
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching friend requests");
      }
    },
  },
  Mutation: {
    sendFriendRequest: async (_, { receiver_id }, context) => {
      try {
        if (!context.user)
          throw new Error("Not authenticated, Cannot send friend request");
        const sender_id = context.user.user.user_id;
        if (sender_id === receiver_id)
          throw new Error("Cannot send friend request to yourself");
        const receiver = await User.findByPk(receiver_id);
        if (!receiver) throw new Error("Receiver not found");
        const existingFriendRequest = await FriendRequest.findOne({
          where: {
            [Op.or]: [
              {
                sender_id: sender_id,
                receiver_id: receiver_id,
              },
              {
                sender_id: receiver_id,
                receiver_id: sender_id,
              },
            ],
          },
        });
        if (existingFriendRequest)
          throw new Error("Friend request already sent");
        const friendRequest = await FriendRequest.create({
          sender_id,
          receiver_id,
        });
        const newNotification = await Notification.create({
          type: "follow",
          sender_id: sender_id,
          receiver_id: receiver_id,
          friend_request_id: friendRequest.id,
        });
        if (context.pubsub) {
          await context.pubsub.publish(`NOTIFICATION_ADDED.${receiver_id}`, {
            notificationAdded: newNotification,
          });
        }

        return friendRequest;
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    },
    acceptFriendRequest: async (_, { id }, context) => {
      try {
        if (!context.user)
          throw new Error("Not authenticated, Cannot accept friend request");
        const friendRequest = await FriendRequest.findOne({
          where: {
            [Op.and]: [
              { sender_id: id },
              { receiver_id: context.user.user.user_id },
            ],
          },
        });
        if (!friendRequest) throw new Error("Friend request not found");
        if (context.user.user.user_id !== friendRequest.receiver_id)
          throw new Error("Cannot accept friend request. You are not receiver");
        friendRequest.status = "accepted";
        const sender = await User.findByPk(friendRequest.sender_id);
        const receiver = await User.findByPk(friendRequest.receiver_id);
        const existedRoomChat = await RoomChat.findOne({
          users: {
            $all: [friendRequest.sender_id, friendRequest.receiver_id],
          },
        });
        if (!existedRoomChat) {
          const newRoomChat = new RoomChat({
            roomName: `${sender.username} - ${receiver.username}`,
            typeRoom: "single",
            users: [friendRequest.sender_id, friendRequest.receiver_id],
          });
          await newRoomChat.save();
        }

        const newNotification = await Notification.create({
          type: "accepted",
          sender_id: friendRequest.receiver_id,
          receiver_id: friendRequest.sender_id,
        });
        // send notifications for the sender about accepted friend requests
        await context.pubsub.publish(
          `NOTIFICATION_ADDED.${friendRequest.sender_id}`,
          {
            notificationAdded: newNotification,
          }
        );

        await friendRequest.save();
        return friendRequest;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    cancelFriendRequest: async (_, { id }, context) => {
      try {
        if (!context.user)
          throw new Error("Not authenticated, Cannot cancel friend request");
        const friendRequest = await FriendRequest.findOne({
          where: {
            [Op.or]: [
              { sender_id: id, receiver_id: context.user.user.user_id },
              { sender_id: context.user.user.user_id, receiver_id: id },
            ],
          },
        });
        if (!friendRequest) throw new Error("Friend request not found");
        const deleteNotification = await Notification.findOne({
          where: {
            friend_request_id: friendRequest.id,
          },
        });
        await deleteNotification.destroy();
        await friendRequest.destroy();
        return {
          status: "Cancel Request Successfully !",
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
