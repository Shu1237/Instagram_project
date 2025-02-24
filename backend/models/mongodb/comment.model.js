import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    user_id: {
      type: Number,
      required: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
    media_urls: {
      type: [String],
      default: [],
    },
    created_at: {
      type: Date,
      default: new Date(),
    },
    created_by: {
      type: String,
      required: true,
    },
    updated_at: {
      type: Date,
    },
    updated_by: {
      type: String,
      default: null,
    },
  },
);

commentSchema.index({ post_id: 1 });
commentSchema.index({ user_id: 1 });
commentSchema.index({ parent_id: 1 });
commentSchema.index({ created_at: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
