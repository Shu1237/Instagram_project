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
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    createBy: {
      type: String,
      required: true,
    },
    updateBy: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema, "posts");

export default Post;
