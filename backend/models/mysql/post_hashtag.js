import { DataTypes } from 'sequelize';

export default function(sequelize) {
  return sequelize.define('post_hashtag', {
    post_hashtag_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.CHAR(24),
      allowNull: false
    },
    hashtag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hashtag',
        key: 'hashtag_id'
      }
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'post_hashtag',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_hashtag_id" },
        ]
      },
      {
        name: "hashtag_id",
        using: "BTREE",
        fields: [
          { name: "hashtag_id" },
        ]
      },
    ]
  });
};
