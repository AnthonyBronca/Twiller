'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    tweetId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, {
      foreignKey: 'userId'
    }),
    Like.belongsTo(models.Tweet, {
      foreignKey: 'tweetId'
    })
  };
  return Like;
};
