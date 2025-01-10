import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config.js";
import User from "./user.js";
import Notification from "./notifications.js";
const FriendRequest = sequelize.define(
  "friend_request",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "declined"),
      defaultValue: "pending",
      allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

FriendRequest.hasOne(Notification,{
  foreignKey: "friend_request_id",
  as: "notification",
  onDelete: "CASCADE",
});

// Define relationships
// FriendRequest.belongsTo(User, {
//   foreignKey: "sender_id",
//   as: "sender",
//   onDelete: "CASCADE",
// });

// FriendRequest.belongsTo(User, {
//   foreignKey: "receiver_id",
//   as: "receiver",
//   onDelete: "CASCADE",
// });

export default FriendRequest;
