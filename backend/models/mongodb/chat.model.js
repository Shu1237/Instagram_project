import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    roomChatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomChat",
    },
    content: String,
    images: Array,
    is_seen: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("Chat", chatSchema, "chats");
export default Chat;
