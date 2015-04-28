/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');

var Account = require('../api/account/account.model');
var Car = require('../api/car/car.model');
var User = require('../api/user/user.model');
var Trip = require('../api/trip/trip.model');
var Stay = require('../api/stay/stay.model');

/**
 * time managment
 **/
Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}

var time_start = new Date();
var time_end = time_start.addHours(2);

/**
 * create all things
 **/
Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

/**
 * create all accounts
 **/
var newAccount = new Account({name: 'Sparda'});
newAccount.save();

Account.find({}).remove(function() {
  Account.create({
    name: 'Dresdner'
  }, {
    name: 'Sparkasse'
  }, function() {
      console.log('finished populating accounts');
    }
  );
});

/**
 * create all cars
 **/
var newCar1 = new Car({
  description: 'Mercedes A Klasse',
  license_tag: 'A-Z-1234',
  mileage: 81.331,
  base: 'Augsburg',
});
newCar1.save();

var newCar2 = new Car({
  description: 'Mercedes C Klasse',
  license_tag: 'A-Z-4321',
  mileage: 5000,
    base: 'Augsburg',
});
newCar2.save();

Car.find({}).remove(function() {
  Car.create({
    description: 'BMW i8',
    license_tag: 'A-BC-42',
    mileage: 2000,
    base: 'Augsburg',
  }, {
    description: 'BMW 1er',
    license_tag: 'A-BC-123',
    mileage: 3000,
    base: 'Augsburg',
  }, {
    description: 'BMW 3er',
    license_tag: 'A-BC-321',
    mileage: 4000,
    base: 'Augsburg',
  }, function() {
      console.log('finished populating cars');
    }
  );
});

/**
 * create all users
 **/
var newUser = new User({
  provider: 'local',
  name: 'Test User',
  email: 'test@test.com',
  default_car: newCar1,
  password: 'test'
});
newUser.save();

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    default_car: newCar2,
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

/**
 * START create real life data
 **/

// says
var stay1 = new Stay({
  destination: 'Klinikum Augsburg',
  client: 'Dr. House',
  destination_time: new Date("January 4, 2011 10:00:00"),
});
stay1.save(); 

var stay2 = new Stay({
  destination: 'Uniklinik Regensburg',
  client: 'Dr. House',
  destination_time: new Date("January 5, 2011 10:00:00"),
});
stay2.save(); 

var stay3 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destination_time: new Date("January 7, 2011 10:00:00"),
});
stay3.save(); 

var stay4 = new Stay({
  destination: 'BKH Günzburg',
  client: 'Dr. House',
  destination_time: new Date("January 7, 2011 15:00:00"),
});
stay4.save();

var stay5 = new Stay({
  destination: 'BKH Günzburg',
  client: 'Dr. House',
  destination_time: new Date("January 10, 2011 10:00:00"),
});
stay5.save();

var stay6 = new Stay({
  destination: 'Stuttgart Flughafen',
  client: 'Dr. House',
  destination_time: new Date("January 10, 2011 11:00:00"),
});
stay6.save();

var stay7 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destination_time: new Date("January 10, 2011 12:00:00"),
});
stay7.save();

var stay8 = new Stay({
  destination: 'Stuttgart Flughafen',
  client: 'Dr. House',
  destination_time: new Date("January 10, 2011 17:00:00"),
});
stay8.save();

var stay9 = new Stay({
  destination: 'Hotel Würzburg',
  client: '',
  destination_time: new Date("January 10, 2011 20:00:00"),
});
stay9.save();

var stay10 = new Stay({
  destination: 'Uniklinik Würzburg',
  client: 'Dr. House',
  destination_time: new Date("January 11, 2011 08:00:00"),
});
stay10.save();

var stay11 = new Stay({
  destination: 'Psychiatrische Klinik Würzburg',
  client: 'Dr. House',
  destination_time: new Date("January 11, 2011 12:00:00"),
});
stay11.save();

var stay12 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destination_time: new Date("January 11, 2011 15:00:00"),
});
stay12.save();

var stay13 = new Stay({
  destination: 'Städtisches Klinikum München',
  client: 'Dr. House',
  destination_time: new Date("January 12, 2011 10:00:00"),
});
stay13.save();

var stay14 = new Stay({
  destination: 'Neurologisches KH München',
  client: 'Dr. House',
  destination_time: new Date("January 12, 2011 14:00:00"),
});
stay14.save();

var stay15 = new Stay({
  destination: 'Diakonie-Epilepsiezentrum Kehl Kork',
  client: 'Dr. House',
  destination_time: new Date("January 13, 2011 10:00:00"),
});
stay15.save();

var stay16 = new Stay({
  destination: 'Städtisches KH München-Schwabing',
  client: 'Dr. House',
  destination_time: new Date("January 17, 2011 10:00:00"),
});
stay16.save();

var stay17 = new Stay({
  destination: 'Flughafen Stuttgart',
  client: 'Dr. House',
  destination_time: new Date("January 18, 2011 09:00:00"),
});
stay17.save();

var stay18 = new Stay({
  destination: 'Uniklink Tübingen',
  client: 'Dr. House',
  destination_time: new Date("January 18, 2011 11:00:00"),
});
stay18.save();

var stay19 = new Stay({
  destination: 'Uniklinik Würzburg',
  client: 'Dr. House',
  destination_time: new Date("January 18, 2011 17:00:00"),
});
stay19.save();

var stay20 = new Stay({
  destination: 'Hotel Würzburg',
  client: 'Dr. House',
  destination_time: new Date("January 18, 2011 20:00:00"),
});
stay20.save();

var stay21 = new Stay({
  destination: 'Uniklinik Würzburg',
  client: 'Dr. House',
  destination_time: new Date("January 19, 2011 09:00:00"),
});
stay21.save();

var stay22 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destination_time: new Date("January 24, 2011 10:00:00"),
});
stay22.save();

var stay23 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destination_time: new Date("January 25, 2011 09:00:00"),
});
stay23.save();

var stay24 = new Stay({
  destination: 'Restaurant Tübingen',
  client: 'Dr. House',
  destination_time: new Date("January 25, 2011 13:00:00"),
});
stay24.save();

var stay25 = new Stay({
  destination: 'Hotel Tübingen',
  client: 'Dr. House',
  destination_time: new Date("January 25, 2011 18:00:00"),
});
stay25.save();

var stay26 = new Stay({
  destination: 'Städtisches Klinikum München-Schwabing',
  client: 'Dr. House',
  destination_time: new Date("January 26, 2011 10:00:00"),
});
stay26.save();

var stay27 = new Stay({
  destination: 'Klinkikum Bogenhausen',
  client: 'Dr. House',
  destination_time: new Date("January 27, 2011 09:00:00"),
});
stay27.save();

var stay28 = new Stay({
  destination: 'DKH Günzburg',
  client: 'Dr. House',
  destination_time: new Date("January 27, 2011 12:00:00"),
});
stay28.save();

var stay29 = new Stay({
  destination: 'Uniklinikum Regensburg',
  client: 'Dr. House',
  destination_time: new Date("January 28, 2011 10:00:00"),
});
stay29.save();

Stay.find({}).remove(function() {
  Stay.create({
    destination: 'Uniklinik Tübingen',
    client: 'Dr. House, Prof. Proton',
    destination_time: time_start,
  }, {
    destination: 'BKH Günzburg',
    client: 'Dr. House',
    destination_time: time_start,
  }, {
    destination: 'Stuttgarter Flughafen',
    client: 'Mustermann',
    destination_time: time_start,
  }, function() {
      console.log('finished populating stays');
    }
  );
});

// trips
Trip.find({}).remove(function() {
  Trip.create({
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 81331,
    kilometer_end: 81347,
    origin_time: new Date("January 04, 2011 08:00:00"),
    destination_time: new Date("January 04, 2011 20:00:00"),
    stays: [stay1],
    timestamp: new Date("January 04, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 81347,
    kilometer_end: 81705,
    origin_time: new Date("January 05, 2011 08:00:00"),
    destination_time: new Date("January 05, 2011 20:00:00"),
    stays: [stay2],
    timestamp: new Date("January 05, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 81705,
    kilometer_end: 82085,
    origin_time: new Date("January 07, 2011 08:00:00"),
    destination_time: new Date("January 07, 2011 20:00:00"),
    stays: [stay3, stay4],
    timestamp: new Date("January 07, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 82085,
    kilometer_end: 82891,
    origin_time: new Date("January 10, 2011 08:00:00"),
    destination_time: new Date("January 11, 2011 20:00:00"),
    stays: [stay5, stay6, stay7, stay8, stay9, stay10, stay11, stay12],
    timestamp: new Date("January 11, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 82891,
    kilometer_end: 83061,
    origin_time: new Date("January 12, 2011 08:00:00"),
    destination_time: new Date("January 12, 2011 20:00:00"),
    stays: [stay13, stay14],
    timestamp: new Date("January 12, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 83061,
    kilometer_end: 83627,
    origin_time: new Date("January 13, 2011 08:00:00"),
    destination_time: new Date("January 13, 2011 20:00:00"),
    stays: [stay15],
    timestamp: new Date("January 13, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 83627,
    kilometer_end: 83786,
    origin_time: new Date("January 17, 2011 08:00:00"),
    destination_time: new Date("January 17, 2011 20:00:00"),
    stays: [stay16],
    timestamp: new Date("January 17, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 83786,
    kilometer_end: 84429,
    origin_time: new Date("January 18, 2011 08:00:00"),
    destination_time: new Date("January 19, 2011 20:00:00"),
    stays: [stay17, stay18, stay18, stay20, stay21],
    timestamp: new Date("January 19, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'noncorporate',
    kilometer_start: 84429,
    kilometer_end: 85954,
    origin_time: new Date("January 20, 2011 08:00:00"),
    destination_time: new Date("January 23, 2011 20:00:00"),
    timestamp: new Date("January 23, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 85954,
    kilometer_end: 86313,
    origin_time: new Date("January 24, 2011 08:00:00"),
    destination_time: new Date("January 24, 2011 20:00:00"),
    stays: [stay22],
    timestamp: new Date("January 24, 2011 20:00:00"),
  }, {
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 86313,
    kilometer_end: 86836,
    origin_time: new Date("January 25, 2011 08:00:00"),
    destination_time: new Date("January 26, 2011 20:00:00"),
    stays: [stay23, stay24, stay25, stay26],
    timestamp: new Date("January 26, 2011 20:00:00"),
  }, {  
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 86836,
    kilometer_end: 87108,
    origin_time: new Date("January 27, 2011 08:00:00"),
    destination_time: new Date("January 27, 2011 20:00:00"),
    stays: [stay27, stay28],
    timestamp: new Date("January 27, 2011 20:00:00"),
  }, {  
    user: newUser,
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometer_start: 87108,
    kilometer_end: 87466,
    origin_time: new Date("January 28, 2011 08:00:00"),
    destination_time: new Date("January 27, 2011 20:00:00"),
    stays: [stay29],
    timestamp: new Date("January 28, 2011 20:00:00"),
  }, function() {
      console.log('finished populating trips');
    }
  );

  /**
  * END create real life data
  **/

});