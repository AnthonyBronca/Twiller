'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(500),
        allowNull: false,
        unique: true
      },
      bio: {
        type: Sequelize.TEXT(2000)
      },
      profilePic: {
        type: Sequelize.STRING(255)
      },
      hashedPassword: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      verified: {
        type: Sequelize.BOOLEAN
      },
      state: {
        type: Sequelize.STRING(100),
      },
      country: {
        type: Sequelize.STRING(100)
      },
      link: {
        type: Sequelize.TEXT(2000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
