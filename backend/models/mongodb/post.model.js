import { Interaction } from "chart.js";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    media_urls: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "public",
    },
    interaction: {
      type: Array,
      default: [],
    },
    created_at: {
      type: Date,
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
    deleted: {
      type: Boolean,
      default: false,
    },
  }
);

postSchema.index({ user_id: 1 });
postSchema.index({ created_at: -1 });
postSchema.index({ status: 1 });

const Post = mongoose.model("Post", postSchema, "posts");

export default Post;
