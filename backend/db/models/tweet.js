'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('Tweet', {
    userId: DataTypes.INTEGER,
    tweet: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  Tweet.associate = function(models) {
    // associations can be defined here
    Tweet.belongsTo(models.User, {
      foreignKey: 'userId'
    }),
    Tweet.hasMany(models.Like, {
      foreignKey: 'tweetId'
    }),
    Tweet.hasMany(models.Retweet, {
      foreignKey: 'tweetId'
    }),
    Tweet.hasMany(models.Comment, {
      foreignKey: 'tweetId'
    })
  };
  return Tweet;
};
