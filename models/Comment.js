
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Comment extends Model {}
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: 'comment'
  }
);

module.exports = Comment;

