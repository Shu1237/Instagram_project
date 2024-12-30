import { DataTypes } from "sequelize";

export default function (sequelize) {
  return sequelize.define(
    "follow",
    {
      follow_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "user_id",
        },
      },
      followee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "user_id",
        },
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
      tableName: "follow",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "follow_id" }],
        },
        {
          name: "unique_follow",
          unique: true,
          using: "BTREE",
          fields: [{ name: "follower_id" }, { name: "followee_id" }],
        },
        {
          name: "followee_id",
          using: "BTREE",
          fields: [{ name: "followee_id" }],
        },
      ],
    }
  );
}
