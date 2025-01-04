import { authTypeDef } from "../services/auth_service/auth.typeDef.js";
import { userTypeDef } from "../services/user_service/user.typeDef.js";
import { friendTypeDef } from "../services/friend_service/friend.typeDef.js";
import { postTypeDef } from "../services/post_service/post.typeDef.js";
export const typeDefs = [authTypeDef, userTypeDef, friendTypeDef, postTypeDef];
