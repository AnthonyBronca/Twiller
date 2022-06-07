MODELS
npx sequelize model:generate --name Tweets --attributes userId:integer,address:string,city:string,state:string,country:string,name:string,price:integer

npx sequelize model:generate --name Booking --attributes locationId:integer,userId:integer,startDate:date,endDate:date

npx sequelize model:generate --name Image --attributes locationId:integer,url:string

npx sequelize model:generate --name Review --attributes userId:integer,locationId:integer,review:string,rating:integer



Associations:

Users has many Locations
Users has many Bookings

Bookings belongs to Users
Bookings belongs to Locations

Locations belongs to Users
Locations has many Bookings
Locations has many Images

Images belongs to Locations

------------------------------


SEEDS:

npx sequelize seed:generate --name Location
npx sequelize seed:generate --name Booking
npx sequelize seed:generate --name Image
npx sequelize seed:generate --name Review


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
