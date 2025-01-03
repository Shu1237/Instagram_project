import Chat from "../../models/mongodb/chat.model";
import RoomChat from "../../models/mongodb/room_chat.model";
import User from "../../models/mysql/user.model";
export const chatResolvers = {
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
    sendChat: async (_, { input }) => {
      try {
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
        if (!roomChat.members.includes(userId)) {
          throw new Error("User is not a member of the room chat");
        }
        const chat = new Chat({
          userId,
          roomChatId,
          content,
          images,
        });
        await chat.save();
        return chat;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
