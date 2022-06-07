'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    tweetId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      foreignKey: 'userId'
    }),
    Comment.belongsTo(models.Tweet, {
      foreignKey: 'tweetId'
    }),
    Comment.hasMany(models.Reply, {
      foreignKey: 'commentId'
    })
  };
  return Comment;
};
