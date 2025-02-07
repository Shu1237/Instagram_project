import RoomChat from "../../models/mongodb/rooms-chat.model.js";
import User from "../../models/mysql/user.js";
import { Op } from "sequelize";

export const roomChatsResolver = {
  Query: {
    roomChat: async (_, { roomChatId }) => {
      try {
        const roomChat = await RoomChat.findById(roomChatId);
        if (!roomChat) throw new Error("Room chat not found");
        return roomChat;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    roomChats: async (_, __, context) => {
      try {
        if (!context.user)
          throw new Error("Not authenticated, Cannot get room chats");
        const myId = context.user.user.user_id;
        const roomChats = await RoomChat.find({
          users: {
            $in: [myId],
          },
        });
        return roomChats;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  RoomChat: {
    users: async (parent) => {
      try {
        const users = await User.findAll({
          where: {
            user_id: {
              [Op.in]: parent.users,
            },
          },
        });
        return users;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
