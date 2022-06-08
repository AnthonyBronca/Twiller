'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Tweets', [
     {userId: 1, tweet: 'My first tweet', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, tweet: 'My first tweet', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 3, tweet: 'My first tweet', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 4, tweet: 'My first tweet', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 5, tweet: 'My first tweet', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 6, tweet: 'My first tweet', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, tweet: 'Does anyone know where to watch the new star wars show?', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, tweet: "I'm building a twitter clone!", imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 3, tweet: 'Sometimes seeders take a while', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 4, tweet: 'I hope this tweet renders!', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, tweet: 'Ever wonder what is at the end of a rainbow?', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 2, tweet: 'OOOO I am verified!', imgUrl: '', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, tweet: 'I can make replies to tweets too!', imgUrl: '', createdAt: new Date(), updatedAt: new Date()}

   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Tweets', null, {});
  }
};
