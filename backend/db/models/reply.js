'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    tweetId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  Reply.associate = function(models) {
    // associations can be defined here
    Reply.belongsTo(models.User, {
      foreignKey: 'userId'
    }),
    Reply.belongsTo(models.Tweet, {
      foreignKey: 'tweetId'
    }),
    Reply.belongsTo(models.Comment, {
      foreignKey: 'commentId'
    })
  };
  return Reply;
};
