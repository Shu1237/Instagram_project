import mongoose from "mongoose";

const roomChatSchema = new mongoose.Schema(
  {
    roomName: String,
    typeRoom: {
      type: String,
      enum: ["single", "group"],
      default: "single",
    },
    users: Array,
    avatar: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "",
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

const RoomChat = mongoose.model("RoomChat", roomChatSchema, "rooms-chat");

export default RoomChat;
