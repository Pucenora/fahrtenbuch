/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Trip = require('../api/trip/trip.model');
var Account = require('../api/account/account.model');
var Car = require('../api/car/car.model');
var time = new Date();

Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}

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

Car.find({}).remove(function() {
  Car.create({
    description: 'BMW i8',
    license_tag: 'A-BC-42',
    mileage: 2000,
  }, {
    description: 'BMW 1er',
    license_tag: 'A-BC-123',
    mileage: 3000,
  }, {
    description: 'BMW 3er',
    license_tag: 'A-BC-321',
    mileage: 4000,
  }, function() {
      console.log('finished populating cars');
    }
  );
});

var newCar1 = new Car({
  description: 'Mercedes A Klasse',
  license_tag: 'A-Z-1234',
  mileage: 81.331,
});
newCar1.save();

var newCar2 = new Car({
  description: 'Mercedes C Klasse',
  license_tag: 'A-Z-4321',
  mileage: 5000,
});
newCar2.save();

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

var newUser = new User({
  provider: 'local',
  name: 'Test User',
  email: 'test@test.com',
  default_car: newCar1,
  password: 'test'
});
newUser.save();

Account.find({}).remove(function() {
  Account.create({
    name: 'Sparda'
  }, {
    name: 'Dresdner'
  }, {
    name: 'Sparkasse'
  }, function() {
      console.log('finished populating accounts');
    }
  );
});

var newAccount = new Account({name: 'Example Account'});
newAccount.save();

Trip.find({}).remove(function() {
  Trip.create({
    user: newUser,
    car: newCar2,
    type: 'private',
    account: newAccount,
    client: 'BMW',
    kilometer_start: 2000,
    kilometer_end: 2100,
    kilometer: 100,
    origin: 'Ulm',
    origin_time: time,
    destination: 'München',
    destination_time: time.addHours(2)
  }, function() {
      console.log('finished populating trips');
    }
  );
});

// Trip.find({}).populate('account').exec(function(err, trips) {
//     console.log(trips);
// });