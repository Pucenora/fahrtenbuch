/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

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

var timeStart = new Date();
var timeEnd = timeStart.addHours(2);

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
  licenseTag: 'A-Z-1234',
  mileage: 87824,
  base: 'Augsburg',
});
newCar1.save();

var newCar2 = new Car({
  description: 'Mercedes C Klasse',
  licenseTag: 'A-Z-4321',
  mileage: 5000,
    base: 'Augsburg',
});
newCar2.save();

Car.find({}).remove(function() {
  Car.create({
    description: 'BMW i8',
    licenseTag: 'A-BC-42',
    mileage: 2000,
    base: 'Augsburg',
  }, {
    description: 'BMW 1er',
    licenseTag: 'A-BC-123',
    mileage: 3000,
    base: 'Augsburg',
  }, {
    description: 'BMW 3er',
    licenseTag: 'A-BC-321',
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
  defaultCar: newCar1,
  baseName: 'Rathaus Augsburg',
  baseLat: 48.368765,
  baseLong: 10.898706,
  password: 'test'
});
newUser.save();

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    defaultCar: newCar2,
    baseName: 'Rathaus Augsburg',
    baseLat: 48.368765,
    baseLong: 10.898706,
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
  destinationTime: new Date("January 4, 2011 10:00:00"),
});
stay1.save(); 

var stay2 = new Stay({
  destination: 'Uniklinik Regensburg',
  client: 'Dr. House',
  destinationTime: new Date("January 5, 2011 10:00:00"),
});
stay2.save(); 

var stay3 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destinationTime: new Date("January 7, 2011 10:00:00"),
});
stay3.save(); 

var stay4 = new Stay({
  destination: 'BKH Günzburg',
  client: 'Dr. House',
  destinationTime: new Date("January 7, 2011 15:00:00"),
});
stay4.save();

var stay5 = new Stay({
  destination: 'BKH Günzburg',
  client: 'Dr. House',
  destinationTime: new Date("January 10, 2011 10:00:00"),
});
stay5.save();

var stay6 = new Stay({
  destination: 'Stuttgart Flughafen',
  client: 'Dr. House',
  destinationTime: new Date("January 10, 2011 11:00:00"),
});
stay6.save();

var stay7 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destinationTime: new Date("January 10, 2011 12:00:00"),
});
stay7.save();

var stay8 = new Stay({
  destination: 'Stuttgart Flughafen',
  client: 'Dr. House',
  destinationTime: new Date("January 10, 2011 17:00:00"),
});
stay8.save();

var stay9 = new Stay({
  destination: 'Hotel Würzburg',
  client: '',
  destinationTime: new Date("January 10, 2011 20:00:00"),
});
stay9.save();

var stay10 = new Stay({
  destination: 'Uniklinik Würzburg',
  client: 'Dr. House',
  destinationTime: new Date("January 11, 2011 08:00:00"),
});
stay10.save();

var stay11 = new Stay({
  destination: 'Psychiatrische Klinik Würzburg',
  client: 'Dr. House',
  destinationTime: new Date("January 11, 2011 12:00:00"),
});
stay11.save();

var stay12 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destinationTime: new Date("January 11, 2011 15:00:00"),
});
stay12.save();

var stay13 = new Stay({
  destination: 'Städtisches Klinikum München',
  client: 'Dr. House',
  destinationTime: new Date("January 12, 2011 10:00:00"),
});
stay13.save();

var stay14 = new Stay({
  destination: 'Neurologisches KH München',
  client: 'Dr. House',
  destinationTime: new Date("January 12, 2011 14:00:00"),
});
stay14.save();

var stay15 = new Stay({
  destination: 'Diakonie-Epilepsiezentrum Kehl Kork',
  client: 'Dr. House',
  destinationTime: new Date("January 13, 2011 10:00:00"),
});
stay15.save();

var stay16 = new Stay({
  destination: 'Städtisches KH München-Schwabing',
  client: 'Dr. House',
  destinationTime: new Date("January 17, 2011 10:00:00"),
});
stay16.save();

var stay17 = new Stay({
  destination: 'Flughafen Stuttgart',
  client: 'Dr. House',
  destinationTime: new Date("January 18, 2011 09:00:00"),
});
stay17.save();

var stay18 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destinationTime: new Date("January 18, 2011 11:00:00"),
});
stay18.save();

var stay19 = new Stay({
  destination: 'Uniklinik Würzburg',
  client: 'Dr. House',
  destinationTime: new Date("January 18, 2011 17:00:00"),
});
stay19.save();

var stay20 = new Stay({
  destination: 'Hotel Würzburg',
  client: 'Dr. House',
  destinationTime: new Date("January 18, 2011 20:00:00"),
});
stay20.save();

var stay21 = new Stay({
  destination: 'Uniklinik Würzburg',
  client: 'Dr. House',
  destinationTime: new Date("January 19, 2011 09:00:00"),
});
stay21.save();

var stay22 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destinationTime: new Date("January 24, 2011 10:00:00"),
});
stay22.save();

var stay23 = new Stay({
  destination: 'Uniklinik Tübingen',
  client: 'Dr. House',
  destinationTime: new Date("January 25, 2011 09:00:00"),
});
stay23.save();

var stay24 = new Stay({
  destination: 'Restaurant Tübingen',
  client: 'Dr. House',
  destinationTime: new Date("January 25, 2011 13:00:00"),
});
stay24.save();

var stay25 = new Stay({
  destination: 'Hotel Tübingen',
  client: 'Dr. House',
  destinationTime: new Date("January 25, 2011 18:00:00"),
});
stay25.save();

var stay26 = new Stay({
  destination: 'Städtisches Klinikum München-Schwabing',
  client: 'Dr. House',
  destinationTime: new Date("January 26, 2011 10:00:00"),
});
stay26.save();

var stay27 = new Stay({
  destination: 'Klinkikum Bogenhausen',
  client: 'Dr. House',
  destinationTime: new Date("January 27, 2011 09:00:00"),
});
stay27.save();

var stay28 = new Stay({
  destination: 'DKH Günzburg',
  client: 'Dr. House',
  destinationTime: new Date("January 27, 2011 12:00:00"),
});
stay28.save();

var stay29 = new Stay({
  destination: 'Uniklinikum Regensburg',
  client: 'Dr. House',
  destinationTime: new Date("January 28, 2011 10:00:00"),
});
stay29.save();

Stay.find({}).remove(function() {
  Stay.create({
    destination: 'Uniklinik Tübingen',
    client: 'Dr. House, Prof. Proton',
    destinationTime: timeStart,
  }, {
    destination: 'BKH Günzburg',
    client: 'Dr. House',
    destinationTime: timeStart,
  }, {
    destination: 'Stuttgarter Flughafen',
    client: 'Mustermann',
    destinationTime: timeStart,
  }, function() {
      console.log('finished populating stays');
    }
  );
});

// trips
Trip.find({}).remove(function() {
  Trip.create({
    user: newUser,
    label: 'Klinikum Augsburg',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 81331,
    kilometerEnd: 81347,
    originTime: new Date("January 04, 2011 08:00:00"),
    destinationTime: new Date("January 04, 2011 20:00:00"),
    stays: [stay1],
    timestamp: new Date("January 04, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'Uniklinik Regensburg',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 81347,
    kilometerEnd: 81705,
    originTime: new Date("January 05, 2011 08:00:00"),
    destinationTime: new Date("January 05, 2011 20:00:00"),
    stays: [stay2],
    timestamp: new Date("January 05, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'Tübingen und Günzburg',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 81705,
    kilometerEnd: 82085,
    originTime: new Date("January 07, 2011 08:00:00"),
    destinationTime: new Date("January 07, 2011 20:00:00"),
    stays: [stay3, stay4],
    timestamp: new Date("January 07, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'Günzburg, Tübingen und Würzburg',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 82085,
    kilometerEnd: 82891,
    originTime: new Date("January 10, 2011 08:00:00"),
    destinationTime: new Date("January 11, 2011 20:00:00"),
    stays: [stay5, stay6, stay7, stay8, stay9, stay10, stay11, stay12],
    timestamp: new Date("January 11, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'München',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 82891,
    kilometerEnd: 83061,
    originTime: new Date("January 12, 2011 08:00:00"),
    destinationTime: new Date("January 12, 2011 20:00:00"),
    stays: [stay13, stay14],
    timestamp: new Date("January 12, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'Kehl Kork',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 83061,
    kilometerEnd: 83627,
    originTime: new Date("January 13, 2011 08:00:00"),
    destinationTime: new Date("January 13, 2011 20:00:00"),
    stays: [stay15],
    timestamp: new Date("January 13, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'München-Schwabing',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 83627,
    kilometerEnd: 83786,
    originTime: new Date("January 17, 2011 08:00:00"),
    destinationTime: new Date("January 17, 2011 20:00:00"),
    stays: [stay16],
    timestamp: new Date("January 17, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'Tübingen und Würzburg',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 83786,
    kilometerEnd: 84429,
    originTime: new Date("January 18, 2011 08:00:00"),
    destinationTime: new Date("January 19, 2011 20:00:00"),
    stays: [stay17, stay18, stay19, stay20, stay21],
    timestamp: new Date("January 19, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'privat',
    car: newCar2,
    type: 'noncorporate',
    kilometerStart: 84429,
    kilometerEnd: 85954,
    originTime: new Date("January 20, 2011 08:00:00"),
    destinationTime: new Date("January 23, 2011 20:00:00"),
    timestamp: new Date("January 23, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'Uniklinik Tübingen',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 85954,
    kilometerEnd: 86313,
    originTime: new Date("January 24, 2011 08:00:00"),
    destinationTime: new Date("January 24, 2011 20:00:00"),
    stays: [stay22],
    timestamp: new Date("January 24, 2011 20:00:00"),
  }, {
    user: newUser,
    label: 'Tübingen und München-Schwabing',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 86313,
    kilometerEnd: 86836,
    originTime: new Date("January 25, 2011 08:00:00"),
    destinationTime: new Date("January 26, 2011 20:00:00"),
    stays: [stay23, stay24, stay25, stay26],
    timestamp: new Date("January 26, 2011 20:00:00"),
  }, {  
    user: newUser,
    label: 'Bogenhausen und Günzburg',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 86836,
    kilometerEnd: 87108,
    originTime: new Date("January 27, 2011 08:00:00"),
    destinationTime: new Date("January 27, 2011 20:00:00"),
    stays: [stay27, stay28],
    timestamp: new Date("January 27, 2011 20:00:00"),
  }, {  
    user: newUser,
    label: 'Uniklinikum Regensburg',
    car: newCar2,
    type: 'corporate',
    account: newAccount,
    kilometerStart: 87108,
    kilometerEnd: 87466,
    originTime: new Date("January 28, 2011 08:00:00"),
    destinationTime: new Date("January 27, 2011 20:00:00"),
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