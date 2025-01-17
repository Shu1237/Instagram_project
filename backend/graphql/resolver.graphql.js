import { authResolver } from "../services/auth_service/auth.resolver.js";
import { userResolver } from "../services/user_service/user.resolver.js";
import { friendResolver } from "../services/friend_service/friend.resolver.js";
import { postResolver } from "../services/post_service/post.resolver.js";
import { roomChatsResolver } from "../services/room_chat_service/room_chat.resolver.js";
import { chatResolver } from "../services/chat_service/chat.resolver.js";
import { likeResolver } from "../services/like_service/like.resolver.js";
import { notificationResolver } from "../services/notification_service/notification.resolver.js";

export const resolvers = [
  authResolver,
  userResolver,
  friendResolver,
  chatResolver,
  roomChatsResolver,
  postResolver,
  likeResolver,
  notificationResolver,

];
