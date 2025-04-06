import { GraphQLError } from "graphql";
import Like from "../../models/mysql/like.js";
import { Buffer } from "node:buffer";

export const likeResolver = {
  Query: {
    getLikes: async () => {
      try {
        const likes = await Like.findAll({
          where: { is_active: 1 },
          raw: true,
        });
        if (!likes) {
          throw new GraphQLError("Likes not found", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        return likes;
      } catch (error) {
        throw new GraphQLError("Failed to fetch likes", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            details: error.message,
          },
        });
      }
    },
  },
  //     Mutation: {
  //         likePost: async (_, args) => {
  //             const { post_id, user_id } = args;
  //             try {
  //                 const [like, createdLike] = await Like.findOrCreate({
  //                     where: { post_id, user_id },
  //                     defaults: {
  //                         post_id,
  //                         user_id,
  //                         created_by: user_id,
  //                         created_at: new Date(),
  //                     },
  //                     raw: true,
  //                 });
  //                 // this line is used to convert "is_active" from buffer to int
  //                 if (like && like.is_active instanceof Buffer) {
  //                     like.is_active = like.is_active.readInt8();
  //                 }
  //                 //------------------------------------------------------------
  //                 if (like && like.is_active === 0) {
  //                     await Like.update({ is_active: 1, updated_at: new Date() }, { where: { post_id, user_id } });
  //                 } else if (like && like.is_active === 1) {
  //                     await Like.update({ is_active: 0, updated_at: new Date() }, { where: { post_id, user_id } });
  //                 }
  //                 return like || createdLike;
  //             } catch (error) {
  //                 throw new GraphQLError("Failed to like post", {
  //                     extensions: {
  //                         code: "INTERNAL_SERVER_ERROR",
  //                         details: error.message,
  //                     },
  //                 });
  //             }
  //         },
  //     },
};
