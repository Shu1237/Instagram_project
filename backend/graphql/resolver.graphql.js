import { authResolver } from "../services/auth_service/auth.resolver.js";
import { userResolver } from "../services/user_service/user.resolver.js";

export const resolvers =  [authResolver, userResolver];