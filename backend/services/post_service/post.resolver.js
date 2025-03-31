import Post from "../../models/mongodb/post.model.js";
import { GraphQLError } from "graphql";
import { redisService } from "../../config/redis.config.js";
import { userLoader } from "../../utils/data_loader/user.data_loader.js";

const CACHE = {
  CACHE_KEY: "posts",
  CACHE_EXPIRATION: 300,
}

export const postResolver = {
  Query: {
    getPosts: async (_, { page }) => {
      try {
        const limit = 5;
        const skip = (page - 1) * limit;
        const cachedPosts = await redisService.get(`${CACHE.CACHE_KEY}_${page}`);
        if (cachedPosts) {
          return JSON.parse(cachedPosts);
        }
        const posts = await Post.find({ deleted: false }).sort({ created_at: -1 }).limit(limit).skip(skip);
        const formattedPosts = posts.map(post => {
          const objTempt = post.toObject();
          objTempt.id = post._id;
          delete objTempt._id;
          return objTempt;
        });
        const cacheSuccess = await redisService.set(`${CACHE.CACHE_KEY}_${page}`, JSON.stringify(formattedPosts), CACHE.CACHE_EXPIRATION);
        if (!cacheSuccess) {
          console.warn("Failed to cache posts");
        }
        return posts;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },
    getAPost: async (_, { id }) => {
      try {
        const post = await Post.findOne({
          _id: id,
          deleted: false,
        });
        if (!post) {
          throw new GraphQLError("Post not found", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        return post;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },
  },
  Post: {
    user: async (parent) => {
      try {
        return await userLoader.load(parent.user_id);
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    }
  },
  Mutation: {
    createPost: async (_, { input }) => {
      try {
        const { user_id, caption, media_urls } = input;

        const post = await Post.create({
          user_id,
          caption,
          media_urls,
          created_by: user_id,
          created_at: new Date(),
        });
        return post;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },
    updatePost: async (_, { id, input }) => {
      try {
        const post = await Post.findOne({ _id: id });
        if (!post) {
          throw new GraphQLError("Post not found", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        const updatedPost = {
          ...post.toObject(),
          ...input,
          updated_at: new Date(),
        };
        await Post.updateOne({ _id: id }, updatedPost);
        Object.assign(post, updatedPost);
        return post;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },
    deletePost: async (_, { id }) => {
      try {
        const post = await Post.findOne({ _id: id });
        if (!post) {
          throw new GraphQLError("Post not found", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        await Post.updateOne({ _id: id }, { $set: { deleted: true } });
        post.deleted = true;
        return post;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    },
  },
};
