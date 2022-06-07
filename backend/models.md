MODELS

npx sequelize model:generate --name User --attributes fullname:string,email:string,bio:text,profilePic:string,hashedPassword:string,verified:boolean,state:string,country:string,link:text

npx sequelize model:generate --name Tweet --attributes userId:integer,tweet:string,imgUrl:string

npx sequelize model:generate --name Comment --attributes tweetId:integer,userId:integer,comment:string

npx sequelize model:generate --name Image --attributes url:string,tweetId:integer

npx sequelize model:generate --name Retweet --attributes userId:integer,tweetId:integer,tweet:string,imgUrl:string

npx sequelize model:generate --name Like --attributes userId:integer,tweetId:integer

npx sequelize model:generate --name Reply --attributes tweetId:integer,userId:integer,commentId:integer,comment:string

npx sequelize model:generate --name Follow --attributes followerId:integer,followingId:integer


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
npx sequelize seed:generate --name Like
npx sequelize seed:generate --name Retweet
npx sequelize seed:generate --name Follow
npx sequelize seed:generate --name Image
npx sequelize seed:generate --name Reply


LOCATION SEED


Locations migrations:

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: Users}
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Locations');
  }
};



Locations model

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Locations.associate = function(models) {
    // associations can be defined here
    Locations.belongsTo(models.User, {
      foreignKey: 'userId'
    }),
    Locations.hasMany(models.Booking, {
      foreignKey: 'locationId'
    }),
    Locations.hasMany(models.Image, {
      foreignKey: 'locationId'
    })
  };
  return Locations;
};

Bookings model:

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Bookings', {
    locationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Bookings.associate = function(models) {
    // associations can be defined here
    Bookings.belongsTo(models.User, {
      foreignKey: 'userId'
    }),
    Bookings.belongsTo(models.Location, {
      foreignKey: 'locationId'
    })
  };
  return Bookings;
};

Bookings migrations

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      locationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: Locations}
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: Users}
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Bookings');
  }
};


Images migrations

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
      locationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: Locations}
      },
      url: {
        type: Sequelize.STRING
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

images model

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Images', {
    locationId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  Images.associate = function(models) {
    // associations can be defined here
    Images.belongsTo(models.Location, {
      foreignKey: 'locationId'
    })
  };
  return Images;
};


Location Seed
[
    {userId: 1,address: '9320 Talbot Dr.',city:'Chester',state:'PA',country: 'USA',name: 'Full 4 Bed 3 bath home',price: 52.00},
    {userId: 1,address: '21 S. South Ave.',city:'Prattville',state:'AL',country: 'USA',name: 'Full 5 Bed 4 bath home',price: 61.00},
    {userId: 2,address: '92 Mill Pond Street',city:'Waldorf',state:'MD',country: 'USA',name: '1 bed 1 bath in 4x4 Home',price: 15.00}
]

BOOKING SEED

[
    {locationId: 1, userId: 3, startDate: 07/04/2022, endDate: 07/05/2022},
    {locationId: 2, userId: 2, startDate: 06/01/2022, endDate: 07/01/2022},
    {locationId: 3, userId: 1, startDate: 07/04/2022, endDate: 07/05/2022}
]

IMAGE SEED

[
    {locationId: 1, url: ''}
] -->


Review seed:

{userId:4, locationId:63, review:'Wow this place was amazing!', rating:5,  createdAt: '10-10-2000', updatedAt: '10-10-2000'},
     {userId:5, locationId:91, review:'The place was very clean!', rating:4, createdAt: '10-10-2000', updatedAt: '10-10-2000'},
     {userId:4, locationId:91, review:'This place was okay', rating:3,  createdAt: '10-10-2000', updatedAt: '10-10-2000'},
     {userId:4, locationId:92, review:'One of the best places I have stayed at!', rating:5, createdAt: '10-10-2000', updatedAt: '10-10-2000' }
