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

const Post = mongoose.model("Post", postSchema, "posts");

export default Post;
