'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Comments', [
     {tweetId: 1, userId: 2, comment: 'Nice to meet you!', createdAt: new Date(), updatedAt: new Date()},
     {tweetId: 1, userId: 3, comment: 'Hello!', createdAt: new Date(), updatedAt: new Date()},
     {tweetId: 2, userId: 4, comment: 'You made twiller!', createdAt: new Date(), updatedAt: new Date()},
     {tweetId: 2, userId: 5, comment: 'This sight is cool!', createdAt: new Date(), updatedAt: new Date()},
     {tweetId: 7, userId: 2, comment: 'Disney +!', createdAt: new Date(), updatedAt: new Date()},
     {tweetId: 12, userId: 6, comment: 'Congrats!', createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
