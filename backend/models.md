MODELS

npx sequelize model:generate --name User --attributes username:string,fullname:string,email:string,bio:text,profilePic:string,hashedPassword:string,verified:boolean,state:string,country:string,link:text

npx sequelize model:generate --name Tweet --attributes userId:integer,tweet:string,imgUrl:string

npx sequelize model:generate --name Comment --attributes tweetId:integer,userId:integer,comment:string

npx sequelize model:generate --name Image --attributes url:string,tweetId:integer

npx sequelize model:generate --name Retweet --attributes userId:integer,tweetId:integer,tweet:string,imgUrl:string

npx sequelize model:generate --name Like --attributes userId:integer,tweetId:integer

npx sequelize model:generate --name Reply --attributes tweetId:integer,userId:integer,commentId:integer,comment:string

npx sequelize model:generate --name Follow --attributes followerId:integer,followingId:integer


Migrations:
Users:

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
        type: Sequelize.STRING
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

Tweets:
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tweets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      tweet: {
        type: Sequelize.STRING(280),
        allowNull: false
      },
      imgUrl: {
        type: Sequelize.STRING(500)
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
    return queryInterface.dropTable('Tweets');
  }
};

Comments:

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tweetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Tweets'}
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users'}
      },
      comment: {
        type: Sequelize.STRING(180),
        allowNull: false
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
    return queryInterface.dropTable('Comments');
  }
};

Images:
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      tweetId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model: 'Tweets'}
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
    return queryInterface.dropTable('Images');
  }
};

Likes:

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users'}
      },
      tweetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Tweets'}
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
    return queryInterface.dropTable('Likes');
  }
};

Follows:

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Follows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model: 'Users'}
      },
      followingId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model: 'Users'}
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
    return queryInterface.dropTable('Follows');
  }
};


Retweets:

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Retweets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model: 'Users'}
      },
      tweetId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model: 'Tweets'}
      },
      tweet: {
        type: Sequelize.STRING(280),
        allowNull: false
      },
      imgUrl: {
        type: Sequelize.STRING(500)
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
    return queryInterface.dropTable('Retweets');
  }
};

Replies:

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Replies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tweetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Tweets'}
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users'}
      },
      commentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Comments'}
      },
      comment: {
        type: Sequelize.STRING(180),
        allowNull: false
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
    return queryInterface.dropTable('Replies');
  }
};


Models:

User:
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
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function (models) {
    User.hasmany(models.Tweet, {
      foreignKey: 'userId'
    }),
    User.hasmany(models.Comment, {
      foreignKey: 'userId'
    }),
    User.hasmany(models.Like, {
      foreignKey: 'userId'
    }),
    User.hasmany(models.Retweet, {
      foreignKey: 'userId'
    }),
    User.hasmany(models.Follows, {
      foreignKey: 'userId'
    }),
    User.hasmany(models.Reply, {
      foreignKey: 'userId'
    })
    // User.hasMany(models.Location, {
    //   foreignKey: 'userId'
    // })
    // User.hasMany(models.Booking, {
    //   foreignKey: 'userId'
    // })
  };

  return User;
};

Tweet:

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

Retweet:

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

Reply:

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


Like:

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

Image:

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: DataTypes.STRING,
    tweetId: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Tweet, {
      foreignKey: 'tweetId'
    })
  };
  return Image;
};

Follow :

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: DataTypes.INTEGER,
    followingId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return Follow;
};

Comment:
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







Associations:

Users Table
    Users has many tweets.
    Users has many comments.
    Users has many likes.
    Users has many retweets.
    Users has many followers.
    Users has many followings.
    users has many replies.
Tweets Table
    A tweet belongs to a single user.
    A post has many likes.
    A post has many comments.
    A post has many retweets.
Comments Table
    A comment belongs to one user.
    A comment belongs to one post.
    A comment has many replies
Likes Table
    A like belongs to one user.
    A like belongs to one tweet.
Retweet Table
    A retweet belongs to one tweet
    A retweet belongs to one user
Follows Table
    A follower belongs to one user
    A following belongs to one user
Images Table
    An image belongs to a tweet
Replied Table
    A reply belongs to a user
    A reply belongs to a tweet
    A reply belongs to a comment

------------------------------


SEEDS:

npx sequelize seed:generate --name User
npx sequelize seed:generate --name Tweet
npx sequelize seed:generate --name Comment
npx sequelize seed:generate --name Image
npx sequelize seed:generate --name Like
npx sequelize seed:generate --name Retweet
npx sequelize seed:generate --name Follow
npx sequelize seed:generate --name Reply

User Seeds

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     {username: 'Demo', fullname:'Demo User', email: 'demo@demo.com', bio: 'I am the demo user', profilePic:'', hashedPassword: 'twiller', verified: false, state: 'Florida', country: 'USA', link: ''},
     {username: 'abronca', fullname:'Anthony Bronca', email: 'abronca@admin.io', bio: 'I am the admin!', profilePic:'', hashedPassword: 'twiller', verified: true, state: 'Florida', country: 'USA', link: ''},
     {username: 'jgrabow', fullname:'Jade Grabow', email: 'Jade@demo.com', bio: 'I am a seeded user', profilePic:'', hashedPassword: 'twiller', verified: true, state: 'Florida', country: 'USA', link: ''},
     {username: 'Ben', fullname:'Obiwan Kenobi', email: 'notajedi@sw.io', bio: '', profilePic:'', hashedPassword: 'twiller', verified: false, state: 'New York', country: 'USA', link: ''},
     {username: 'Vader', fullname:'Anakin Skywalker', email: 'vader@empire.com', bio: 'killing younglings is a passion', profilePic:'', hashedPassword: 'twiller', verified: false, state: 'California', country: 'USA', link: ''},
     {username: 'Queen Amadila', fullname:'Padmae Amadela', email: 'padmae@demo.com', bio: "Anakin, you're going down a path i can't follow", profilePic:'', hashedPassword: 'twiller', verified: false, state: 'California', country: 'USA', link: ''},
     {username: 'Wattson', fullname:'Natalie Paquette', email: 'wattson@apex.com', bio: 'NESSIESSS!!!! Hehee', profilePic:'', hashedPassword: 'twiller', verified: false, state: 'Paris', country: 'France', link: ''},
     {username: 'Nessie', fullname:'Nessie Apex', email: 'nessie@demo.com', bio: 'cute little plushie', profilePic:'', hashedPassword: 'twiller', verified: true, state: 'Florida', country: 'USA', link: ''},
     {username: 'Brand', fullname:'Brand Company', email: 'Brabd@demo.com', bio: 'Brand Company', profilePic:'', hashedPassword: 'twiller', verified: true, state: 'Florida', country: 'USA', link: ''},
     {username: 'App Academy', fullname:'App Academy', email: 'aa@aa.io', bio: 'making coders!', profilePic:'', hashedPassword: 'twiller', verified: false, state: 'California', country: 'USA', link: ''}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
