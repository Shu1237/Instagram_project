import Post from "../../models/mongodb/post.model.js";
import Notification from "../../models/mysql/notifications.js";
import { GraphQLError } from "graphql";
import { redisService } from "../../config/redis.config.js";
import { userLoader } from "../../utils/data_loader/user.data_loader.js";
import _ from "lodash";
import startSyncLikeWorker from "../../utils/syncLikeWorker.util.js";
import mongoose from "mongoose";
const CACHE = {
  CACHE_KEY: "posts",
  CACHE_EXPIRATION: 300,
};

export const postResolver = {
  Query: {
    testConnection: async () => {
      try {
        const state = mongoose.connection.readyState;
        const states = {
          0: "disconnected",
          1: "connected",
          2: "connecting",
          3: "disconnecting",
        };
        return {
          mongodb: states[state] || "unknown",
          state: state,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getPosts: async (_, { page }) => {
      try {
        const limit = 5;
        const skip = (page - 1) * limit;

        // Check MongoDB connection status
        if (mongoose.connection.readyState !== 1) {
          throw new GraphQLError("Database connection not ready", {
            extensions: {
              code: "DATABASE_CONNECTION_ERROR",
            },
          });
        }

        // const cachedPosts = await redisService.get(
        //   `${CACHE.CACHE_KEY}_${page}`
        // );
        // if (cachedPosts) {
        //   return JSON.parse(cachedPosts);
        // }

        const posts = await Post.find({ deleted: false })
          .sort({ created_at: -1 })
          .limit(limit)
          .skip(skip)
          .maxTimeMS(20000); // Set explicit timeout of 20 seconds

        // const formattedPosts = posts.map((post) => {
        //   const objTempt = post.toObject();
        //   objTempt.id = post._id;
        //   delete objTempt._id;
        //   return objTempt;
        // });
        // const cacheSuccess = await redisService.set(
        //   `${CACHE.CACHE_KEY}_${page}`,
        //   JSON.stringify(formattedPosts),
        //   CACHE.CACHE_EXPIRATION
        // );
        // if (!cacheSuccess) {
        //   console.warn("Failed to cache posts");
        // }
        return posts;
      } catch (error) {
        console.error("Error in getPosts:", error);
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
    },
  },
  Mutation: {
    createPost: async (_, { input }, { pubsub }) => {
      try {
        const { user_id, caption, media_urls } = input;

        // Emit upload started status
        await pubsub.publish(`POST_UPLOAD_STATUS.${user_id}`, {
          postUploadStatus: {
            userId: user_id,
            status: "processing",
            message: "Creating your post...",
          },
        });

        const post = await Post.create({
          user_id,
          caption,
          media_urls,
          created_by: user_id,
          created_at: new Date(),
        });

        // Emit upload success status
        await pubsub.publish(`POST_UPLOAD_STATUS.${user_id}`, {
          postUploadStatus: {
            userId: user_id,
            status: "success",
            postId: post._id.toString(),
            message: "Post created successfully!",
          },
        });

        // Create notification for successful post creation
        const notification = await Notification.create({
          type: "post_created",
          sender_id: user_id,
          receiver_id: user_id,
          post_id: post._id.toString(),
          message: "Your post has been published!",
        });

        await pubsub.publish(`NOTIFICATION_ADDED.${user_id}`, {
          notificationAdded: notification,
        });

        return post;
      } catch (error) {
        // Emit upload error status
        if (input && input.user_id) {
          await pubsub.publish(`POST_UPLOAD_STATUS.${input.user_id}`, {
            postUploadStatus: {
              userId: input.user_id,
              status: "error",
              message: "Failed to create post. Please try again.",
            },
          });
        }

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
    likePost: async (_, { id, userId }, context) => {
      try {
        if (!context.user)
          throw new Error("Not authenticated, Cannot like post");
        const post = await Post.findOne({ _id: id });
        if (!post) throw new Error("Post not found");
        if (post.interaction.includes(userId))
          throw new Error("You already liked this post");
        //optimize with redis , save likes into redis using set
        redisService.sadd(`post:${id}:pendingLikes`, userId);
        const newNotification = await Notification.create({
          type: "like",
          sender_id: userId,
          receiver_id: post.user_id,
        });
        await context.pubsub.publish(`NOTIFICATION_ADDED.${post.user_id}`, {
          notificationAdded: newNotification,
        });
        startSyncLikeWorker();

        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
