import { authTypeDef } from "../services/auth_service/auth.typeDef.js";
import { userTypeDef } from "../services/user_service/user.typeDef.js";
import { friendTypeDef } from "../services/friend_service/friend.typeDef.js";
import { roomChatTypeDef } from "../services/room_chat_service/room_chat.typeDef.js";
import { chatTypeDef } from "../services/chat_service/chat.typeDef.js";
export const typeDefs = [
  authTypeDef,
  userTypeDef,
  friendTypeDef,
  chatTypeDef,
  roomChatTypeDef,
];
