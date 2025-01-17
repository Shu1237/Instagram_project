import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config.js";

const Like = sequelize.define(
  "like",
  {
    like_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.CHAR(24),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "like",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "like_id" }],
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [{ name: "user_id" }],
      },
    ],
  }
);
export default Like;
