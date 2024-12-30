import { DataTypes } from "sequelize";
import _chat_box from "./chat_box";
import _chat_box_participants from "./chat_box_participants";
import _follow from "./follow";
import _hashtag from "./hashtag";
import _like from "./like";
import _post_hashtag from "./post_hashtag";
import _story from "./story";
import _user from "./user";

export default function initModels(sequelize) {
  var chat_box = _chat_box(sequelize, DataTypes);
  var chat_box_participants = _chat_box_participants(sequelize, DataTypes);
  var follow = _follow(sequelize, DataTypes);
  var hashtag = _hashtag(sequelize, DataTypes);
  var like = _like(sequelize, DataTypes);
  var post_hashtag = _post_hashtag(sequelize, DataTypes);
  var story = _story(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  chat_box_participants.belongsTo(chat_box, { as: "chat_box", foreignKey: "chat_box_id"});
  chat_box.hasMany(chat_box_participants, { as: "chat_box_participants", foreignKey: "chat_box_id"});
  post_hashtag.belongsTo(hashtag, { as: "hashtag", foreignKey: "hashtag_id"});
  hashtag.hasMany(post_hashtag, { as: "post_hashtags", foreignKey: "hashtag_id"});
  chat_box_participants.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(chat_box_participants, { as: "chat_box_participants", foreignKey: "user_id"});
  follow.belongsTo(user, { as: "follower", foreignKey: "follower_id"});
  user.hasMany(follow, { as: "follows", foreignKey: "follower_id"});
  follow.belongsTo(user, { as: "followee", foreignKey: "followee_id"});
  user.hasMany(follow, { as: "followee_follows", foreignKey: "followee_id"});
  like.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(like, { as: "likes", foreignKey: "user_id"});
  story.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(story, { as: "stories", foreignKey: "user_id"});

  return {
    chat_box,
    chat_box_participants,
    follow,
    hashtag,
    like,
    post_hashtag,
    story,
    user,
  };
}
export { initModels };
