import Post from "../../models/mongodb/post.model.js";
import User from "../../models/mysql/user.js";
import { GraphQLError } from "graphql";

export const postResolver = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find({ deleted: false });
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
        return await User.findOne({
          where: { user_id: parent.user_id },
          raw: true
        });
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
        const post = new Post({
          user_id,
          caption,
          media_urls,
          created_by: user_id,
          created_at: new Date(),
        });
        await post.save();
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
