import Comment from "../../models/mongodb/comment.model.js";
import User from "../../models/mysql/user.js";
import { GraphQLError } from "graphql";

export const commentResolver = {
    Query: {
        getComments: async (_, { post_id }) => {
            try {
                const comments = await Comment.find({ post_id: post_id, });
                return comments;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                    },
                });
            }
        }
    },

    Comment: {
        user: async (parent) => {
            try {
                return await User.findOne({
                    where: { user_id: parent.user_id },
                    raw: true,
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
        postComment: async (_, { input }) => {
            try {
                const { post_id, user_id, parent_id, content, media_urls } = input;
                const comment = new Comment({
                    post_id,
                    user_id,
                    parent_id,
                    content,
                    media_urls,
                    created_at: new Date(),
                    created_by: user_id,
                })
                await comment.save();
                return comment;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                    },
                });
            }
        },

        updateComment: async (_, { id, input }) => {
            try {
                const comment = await Comment.findByIdAndUpdate(
                    id,
                    {
                        $set: input,
                        updated_at: new Date(),
                        updated_by: input.user_id,
                    },
                    { new: true }
                );
                return comment;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                    },
                });
            }
        },

        deleteComment: async (_, { id }) => {
            try {
                const comment = await Comment.findByIdAndDelete(id);
                return comment;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                    },
                });
            }
        }
    }
}