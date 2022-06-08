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
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
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
        type: Sequelize.TEXT()
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
        type: Sequelize.TEXT()
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
