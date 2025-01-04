import { authResolver } from "../services/auth_service/auth.resolver.js";
import { userResolver } from "../services/user_service/user.resolver.js";
import { friendResolver } from "../services/friend_service/friend.resolver.js";
import { postResolver } from "../services/post_service/post.resolver.js";
export const resolvers = [authResolver, userResolver, friendResolver, postResolver];
