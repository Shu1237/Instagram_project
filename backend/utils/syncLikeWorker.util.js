import { redisService } from "../config/redis.config.js";
import Post from "../models/mongodb/post.model.js";

async function syncLikeWorker() {
  try {
    const keysX = await redisService.keys("post:*:pendingLikes");

    for (const key of keysX) {
      const postId = key.split(":")[1];
      const userIds = await redisService.smembers(key);
      console.log(userIds);
      if (userIds.length > 0) {
        await Post.updateOne(
          { _id: postId },
          { $addToSet: { interaction: { $each: userIds } } }
        );

        await redisService.del(key);
        console.log(`Synced ${userIds.length} likes for post ${postId}`);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

const startSyncLikeWorker = () => {
  setInterval(() => {
    syncLikeWorker();
  }, 10000);
};

export default startSyncLikeWorker;
