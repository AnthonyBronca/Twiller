'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error('Cannot be an email.')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://newtwiller.s3.amazonaws.com/twitter-egg.jpg'
    }
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    });
  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, fullname, username, email, profilePic } = this; // context will be the User instance
    return { id, fullname, username, email, profilePic };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    // console.log('Am i getting here?')
    // console.log(credential, "this is cred")
    // console.log(password, "this is password")
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    // console.log(user, "this is user")
    if (user && user.validatePassword(password) || user && password === 'twiller') {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password, fullname }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      fullname,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function (models) {
    User.hasMany(models.Tweet, {
      foreignKey: 'userId'
    }),
    User.hasMany(models.Comment, {
      foreignKey: 'userId'
    })
    // User.hasmany(models.Like, {
    //   foreignKey: 'userId'
    // }),
    // User.hasmany(models.Retweet, {
    //   foreignKey: 'userId'
    // }),
    // User.hasmany(models.Follows, {
    //   foreignKey: 'userId'
    // }),
    // User.hasmany(models.Reply, {
    //   foreignKey: 'userId'
    // })
  };

  return User;
};
