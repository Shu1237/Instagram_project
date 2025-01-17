import Chat from "../../models/mongodb/chat.model.js";
import RoomChat from "../../models/mongodb/rooms-chat.model.js";
import User from "../../models/mysql/user.js";
import { PubSub } from "graphql-subscriptions";

const CHAT_ADDED = "CHAT_ADDED";

export const chatResolver = {
  Subscription: {
    messageAdded: {
      subscribe: (_, { roomChatId }, { pubsub }) => {
        return pubsub.asyncIterableIterator([`${CHAT_ADDED}.${roomChatId}`]);
      },
    },
  },
  Query: {
    chats: async (_, { roomChatId }) => {
      const chats = await Chat.find({
        roomChatId,
        deleted: false,
      }).populate("roomChatId");
      return chats;
    },
    chat: async (_, { id }) => {
      const chat = await Chat.findById(id).populate("roomChatId");
      return chat;
    },
  },
  Mutation: {
    sendChat: async (_, { input }, context) => {
      try {
        if (!context.user) {
          throw new Error("Unauthorized");
        }
        const { userId, roomChatId, content, images } = input;
        const user = await User.findOne({
          where: {
            user_id: userId,
            is_active: 1,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }
        const roomChat = await RoomChat.findById(roomChatId);
        if (!roomChat) {
          throw new Error("Room chat not found");
        }
        if (!roomChat.users.includes(userId)) {
          throw new Error("User is not a member of the room chat");
        }
        const chat = new Chat({
          userId,
          roomChatId,
          content,
          images,
        });
        await chat.save();

        await context.pubsub.publish(`${CHAT_ADDED}.${roomChatId}`, {
          messageAdded: chat,
        });

        return chat;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
