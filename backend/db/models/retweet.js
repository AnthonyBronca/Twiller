'use strict';
module.exports = (sequelize, DataTypes) => {
  const Retweet = sequelize.define('Retweet', {
    userId: DataTypes.INTEGER,
    tweetId: DataTypes.INTEGER,
    tweet: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  Retweet.associate = function(models) {
    // associations can be defined here
    Retweet.belongsTo(models.Tweet, {
      foreignKey: 'tweetId'
    }),
    Retweet.belongsTo(models.User, {
      foreignKey: 'userId'
    })

  };
  return Retweet;
};
