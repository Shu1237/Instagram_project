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
