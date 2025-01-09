import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config.js";
import FriendRequest from "./friend_request.js";
const User = sequelize.define(
  "user",
  {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "username",
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue:
        "https://tse1.mm.bing.net/th?id=OIP.RO4YLJyap-FUvMNX1oMXqgHaHa&w=768&h=768&rs=1&pid=ImgDetMain",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email",
    },
    bio: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);
//relationships

User.hasMany(FriendRequest, {
  as: "sender",
  foreignKey: "sender_id",
});

User.hasMany(FriendRequest, {
  as: "receiver",
  foreignKey: "receiver_id",
});

export default User;
